/**
 * Robust Semantic Versioning (semver) parser and comparator
 * Implements semver 2.0.0 specification with extended range support
 */

function parseSemver(version) {
    const v = `${version}`.trim();

    // Strip leading "v"
    const normalized = v.startsWith('v') || v.startsWith('V') ? v.slice(1) : v;

    // Split build metadata (ignored for precedence but preserved)
    const [coreAndPre, buildMetadata] = normalized.split('+', 2);

    // Split prerelease
    const [core, prereleaseRaw] = coreAndPre.split('-', 2);

    const parts = core.split('.');
    if (parts.length !== 3) {
        throw new Error(`Invalid semver "${version}". Expected "MAJOR.MINOR.PATCH".`);
    }

    const major = Number(parts[0]);
    const minor = Number(parts[1]);
    const patch = Number(parts[2]);

    // Validate integers and non-negative
    if (!Number.isInteger(major) || !Number.isInteger(minor) || !Number.isInteger(patch)) {
        throw new Error(`Invalid semver "${version}". MAJOR/MINOR/PATCH must be integers.`);
    }

    if (major < 0 || minor < 0 || patch < 0) {
        throw new Error(`Invalid semver "${version}". MAJOR/MINOR/PATCH must be non-negative.`);
    }

    // Check for safe integer range
    if (major > Number.MAX_SAFE_INTEGER || minor > Number.MAX_SAFE_INTEGER || patch > Number.MAX_SAFE_INTEGER) {
        throw new Error(`Invalid semver "${version}". Version numbers exceed safe integer range.`);
    }

    // Parse and validate prerelease identifiers
    const prerelease = prereleaseRaw ? prereleaseRaw.split('.') : [];
    if (prereleaseRaw !== undefined && prereleaseRaw.trim() === '') {
        throw new Error(`Invalid semver "${version}". Empty prerelease identifier.`);
    }

    // Validate prerelease identifiers (alphanumeric + hyphens, non-empty)
    for (const id of prerelease) {
        if (id === '') {
            throw new Error(`Invalid semver "${version}". Empty prerelease identifier.`);
        }
        if (!/^[0-9A-Za-z-]+$/.test(id)) {
            throw new Error(`Invalid semver "${version}". Prerelease identifier "${id}" contains invalid characters.`);
        }
        // Numeric identifiers must not have leading zeros (unless it's just "0")
        if (/^0[0-9]+$/.test(id)) {
            throw new Error(`Invalid semver "${version}". Numeric prerelease identifier "${id}" has leading zeros.`);
        }
    }

    // Validate build metadata (alphanumeric + hyphens, non-empty parts)
    const build = buildMetadata ? buildMetadata.split('.') : [];
    if (buildMetadata && build.length === 0) {
        throw new Error(`Invalid semver "${version}". Empty build metadata.`);
    }

    for (const id of build) {
        if (id === '') {
            throw new Error(`Invalid semver "${version}". Empty build metadata identifier.`);
        }
        if (!/^[0-9A-Za-z-]+$/.test(id)) {
            throw new Error(`Invalid semver "${version}". Build metadata "${id}" contains invalid characters.`);
        }
    }

    return {
        major,
        minor,
        patch,
        prerelease,
        build,
        raw: version
    };
}

function isNumericIdentifier(id) {
    return /^(0|[1-9][0-9]*)$/.test(id);
}

function compareIdentifiers(a, b) {
    const aNum = isNumericIdentifier(a);
    const bNum = isNumericIdentifier(b);

    if (aNum && bNum) {
        const an = Number(a);
        const bn = Number(b);
        if (an !== bn) return an < bn ? -1 : 1;
        return 0;
    }

    if (aNum && !bNum) return -1;  // numeric < non-numeric
    if (!aNum && bNum) return 1;

    if (a === b) return 0;
    return a < b ? -1 : 1;  // lexicographic
}

function compareSemver(a, b) {
    const va = typeof a === 'string' ? parseSemver(a) : a;
    const vb = typeof b === 'string' ? parseSemver(b) : b;

    if (va.major !== vb.major) return va.major < vb.major ? -1 : 1;
    if (va.minor !== vb.minor) return va.minor < vb.minor ? -1 : 1;
    if (va.patch !== vb.patch) return va.patch < vb.patch ? -1 : 1;

    const aPre = va.prerelease;
    const bPre = vb.prerelease;

    // A version with no prerelease has higher precedence than one with prerelease
    if (aPre.length === 0 && bPre.length === 0) return 0;
    if (aPre.length === 0 && bPre.length > 0) return 1;
    if (aPre.length > 0 && bPre.length === 0) return -1;

    const len = Math.max(aPre.length, bPre.length);
    for (let i = 0; i < len; i += 1) {
        const ai = aPre[i];
        const bi = bPre[i];

        if (ai === undefined) return -1;  // shorter prerelease has lower precedence
        if (bi === undefined) return 1;

        const c = compareIdentifiers(ai, bi);
        if (c !== 0) return c;
    }

    return 0;
}

function parseRange(range) {
    const r = `${range}`.trim();

    // Support different range formats
    // >= X <= Y (must check first - has both operators)
    const rangeMatch = r.match(/>=\s*([^\s]+)\s+<=\s*([^\s]+)/);
    if (rangeMatch) {
        const min = parseSemver(rangeMatch[1]);
        const max = parseSemver(rangeMatch[2]);

        // Validate min <= max
        if (compareSemver(min, max) > 0) {
            throw new Error(`Invalid range "${range}". Minimum version is greater than maximum version.`);
        }

        return { min, max, type: 'range' };
    }

    // >= X
    const gteMatch = r.match(/^>=\s*([^\s]+)$/);
    if (gteMatch) {
        const min = parseSemver(gteMatch[1]);
        return { min, max: null, type: 'gte' };
    }

    // > X
    const gtMatch = r.match(/^>\s*([^\s]+)$/);
    if (gtMatch) {
        const base = parseSemver(gtMatch[1]);
        // Increment patch for exclusive lower bound
        const min = { ...base, patch: base.patch + 1, prerelease: [] };
        return { min, max: null, type: 'gt' };
    }

    // <= X
    const lteMatch = r.match(/^<=\s*([^\s]+)$/);
    if (lteMatch) {
        const max = parseSemver(lteMatch[1]);
        return { min: null, max, type: 'lte' };
    }

    // < X
    const ltMatch = r.match(/^<\s*([^\s]+)$/);
    if (ltMatch) {
        const base = parseSemver(ltMatch[1]);
        // Decrement patch for exclusive upper bound (simplified)
        const max = { ...base, patch: Math.max(0, base.patch - 1), prerelease: [] };
        return { min: null, max, type: 'lt' };
    }

    // ^X.Y.Z (caret range - compatible with)
    const caretMatch = r.match(/^\^([^\s]+)$/);
    if (caretMatch) {
        const base = parseSemver(caretMatch[1]);
        const min = base;

        // ^0.0.Z -> [0.0.Z, 0.0.Z+1)
        // ^0.Y.Z -> [0.Y.Z, 0.Y+1.0)
        // ^X.Y.Z -> [X.Y.Z, X+1.0.0)
        let max;
        if (base.major === 0 && base.minor === 0) {
            max = { ...base, patch: base.patch + 1, prerelease: [] };
        } else if (base.major === 0) {
            max = { ...base, minor: base.minor + 1, patch: 0, prerelease: [] };
        } else {
            max = { major: base.major + 1, minor: 0, patch: 0, prerelease: [], build: [] };
        }

        return { min, max, type: 'caret', exclusive: true };
    }

    // ~X.Y.Z (tilde range - approximately equivalent)
    const tildeMatch = r.match(/^~([^\s]+)$/);
    if (tildeMatch) {
        const base = parseSemver(tildeMatch[1]);
        const min = base;
        // ~X.Y.Z -> [X.Y.Z, X.Y+1.0)
        const max = { ...base, minor: base.minor + 1, patch: 0, prerelease: [] };

        return { min, max, type: 'tilde', exclusive: true };
    }

    // Exact version (check last to avoid matching operators)
    const exactMatch = r.match(/^=?\s*([0-9].*)$/);
    if (exactMatch) {
        const version = parseSemver(exactMatch[1]);
        return { min: version, max: version, type: 'exact' };
    }

    throw new Error(`Invalid range "${range}". Supported formats: ">=X.Y.Z <=A.B.C", "^X.Y.Z", "~X.Y.Z", "=X.Y.Z", ">=X.Y.Z", "<=X.Y.Z".`);
}

function satisfies(version, range) {
    const v = parseSemver(version);
    const r = parseRange(range);

    // Handle different range types
    if (r.type === 'exact') {
        return compareSemver(v, r.min) === 0;
    }

    if (r.type === 'gte' || r.type === 'gt') {
        return compareSemver(v, r.min) >= 0;
    }

    if (r.type === 'lte' || r.type === 'lt') {
        return compareSemver(v, r.max) <= 0;
    }

    // Range or caret/tilde
    const minCheck = r.min ? compareSemver(v, r.min) >= 0 : true;
    const maxCheck = r.max ? (r.exclusive ? compareSemver(v, r.max) < 0 : compareSemver(v, r.max) <= 0) : true;

    return minCheck && maxCheck;
}

function sort(versions, descending = false) {
    const parsed = versions.map(v => ({
        raw: v,
        parsed: parseSemver(v)
    }));

    parsed.sort((a, b) => compareSemver(a.parsed, b.parsed));

    if (descending) {
        parsed.reverse();
    }

    return parsed.map(v => v.raw);
}

function maxSatisfying(versions, range) {
    const satisfying = versions.filter(v => {
        try {
            return satisfies(v, range);
        } catch (err) {
            // Ignore invalid versions
            return false;
        }
    });

    if (satisfying.length === 0) return null;

    const sorted = sort(satisfying, true);
    return sorted[0];
}

module.exports = {
    parseSemver,
    compareSemver,
    parseRange,
    satisfies,
    sort,
    maxSatisfying
};
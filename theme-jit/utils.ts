import fs from 'fs';
import path from 'path';

/**
 * @param value the value to fix.
 * @returns fixed value
 */
export const fixKV = (value: string) => {
    let appliedText = value;
    if (value[0] !== '.') {
        appliedText = appliedText.replace('.', '\\.');
    }
    appliedText = appliedText
        .replace(':', '\\:')
        .replace('/', '\\/');

    return appliedText;
}

// recursively read all files in a folder
/**
 * Gets all files in a directory.
 * @param folderPath - The folder path.
 * @param includeRegexStrList - The list of include regex strings.
 * @param excludeRegexStrList - The list of exclude regex strings.
 * @returns The list of files in the directory.
 * @example
 * ```ts
 * const folderPath = 'src';
 * const includeRegexStrList = ['\\.ts$'];
 * const excludeRegexStrList = ['\\.test\\.ts$'];
 * const files = getAllFiles(folderPath, includeRegexStrList, excludeRegexStrList);
 * console.log(files);
 * ```
 */
export const getAllFiles = (folderPath: string, includeRegexStrList: string[], excludeRegexStrList: string[]): string[] => {
    const result: string[] = [];
    const includeRegexList = includeRegexStrList.map((regex) => new RegExp(fixKV(regex)));
    const excludeRegexList = excludeRegexStrList.map((regex) => new RegExp(fixKV(regex)));

    const readDirectory = (directory: string) => {
        const files = fs.readdirSync(directory);
        files.forEach((file) => {
            const fullPath = path.join(directory, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                readDirectory(fullPath);
            } else if (shouldIncludeFile(fullPath, includeRegexList, excludeRegexList)) {
                result.push(fullPath);
            }
        });
    };

    const shouldIncludeFile = (filePath: string, includeRegexList: RegExp[], excludeRegexList: RegExp[]): boolean => {
        const matchesInclude = includeRegexList.some((regex) => regex.test(filePath));
        const matchesExclude = excludeRegexList.some((regex) => regex.test(filePath));
        return matchesInclude && !matchesExclude;
    };

    readDirectory(folderPath);
    return result;
};

/**
 * Reads the lines of a file.
 * @param filename - The file path.
 * @returns The array of lines in the file.
 */
export const readLines = (filename: string): string[] => {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    return fileContent.split(/\r?\n/);
};

/**
 * Lists all files in a directory.
 * @param dir - The directory.
 * @param fileList - The list of files.
 * @returns The list of files in the directory.
 */
export const listFiles = (dir: string, fileList: string[] = []): string[] => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            listFiles(filePath, fileList);
        } else {
            fileList.push(filePath);
        }
    });

    return fileList;
};
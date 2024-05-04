import { constructKeys } from "./types";

export const SPACES = {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    13: 52,
    14: 56,
    15: 60,
} as const;


export const DIMENSIONS = {
    0: '0%',
    10: '10%',
    20: '20%',
    25: '25%',
    30: '30%',
    40: '40%',
    50: '50%',
    60: '60%',
    70: '70%',
    75: '75%',
    80: '80%',
    90: '90%',
    100: '100%',
} as const;


export const SPACES_REGEX_KEYS = constructKeys(Object.keys(SPACES));
export const DIMENSIONS_REGEX_KEYS = constructKeys(Object.keys(DIMENSIONS));





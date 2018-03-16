// Type guard that can be used to strip null and/or undefined from a type.
export function isPresent<T>(t: T|null|undefined): t is T {
    return t !== null && t !== undefined;
}

// Used to strip null and/or undefined from a type.
export function assertPresent<T>(t: T|null|undefined): T {
    if (!isPresent(t)) {
        throw new Error('Expected value to be defined');
    }
    return t;
}

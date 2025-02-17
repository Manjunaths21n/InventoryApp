export function getShortId(length = 8): string {
    return crypto.randomUUID().replace(/-/g, '').substring(0, length);
}

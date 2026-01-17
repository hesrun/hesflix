/**
 * Format date from ISO format (YYYY-MM-DD) to readable format (DD Month, YYYY)
 * @param dateString - Date in ISO format (e.g., "1954-09-13")
 * @param locale - Language locale (default: 'en-US')
 * @returns Formatted date string (e.g., "13 September, 1954")
 */
export function formatDate(
    dateString: string,
    locale: string = 'en-US'
): string {
    if (!dateString) return '';

    try {
        const date = new Date(dateString + 'T00:00:00Z');

        return new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    } catch {
        return dateString;
    }
}

/**
 * Format date to short format (DD MMM YYYY)
 * @param dateString - Date in ISO format
 * @returns Short formatted date (e.g., "13 Sep 1954")
 */
export function formatDateShort(dateString: string): string {
    if (!dateString) return '';

    try {
        const date = new Date(dateString + 'T00:00:00Z');

        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(date);
    } catch {
        return dateString;
    }
}

/**
 * Calculate age from birth date
 * @param birthDate - Birth date in ISO format
 * @returns Age in years
 */
export function calculateAge(birthDate: string): number {
    if (!birthDate) return 0;

    try {
        const birth = new Date(birthDate + 'T00:00:00Z');
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }

        return age;
    } catch {
        return 0;
    }
}

export default function decodeHtmlEntities(text: string): string {
    const entities: Record<string, string> = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#39;': "'",
        '&nbsp;': ' ',
    };

    return text.replace(
        /&[a-zA-Z0-9#]+;/g,
        (match) => entities[match] || match
    );
}

export default function slugToLabel(slug: string) {
    return slug
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .replace(/Sharp|sharp/g, '#');
}
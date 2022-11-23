export default function createSlug(title: string) {
    let slug: string = title
        .toLowerCase()
        .replace(/ /g, '-');

    if (slug.split('').filter(e => e === '#').length > 1) {
        slug = slug.substring(0, 3).replace(/[^a-z]/g, '') + slug.substring(3).replace(/#/g, 'sharp');
    } else {
        slug = slug.replace(/#/g, 'sharp');
    }

    slug = slug.replace(/[^\w-+]+/g, '');

    if (slug.startsWith('-')) {
        slug = slug.substring(1);
    }

    return slug;
}
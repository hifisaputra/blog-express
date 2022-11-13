export const strToSlug = (name: string): string => {
    return name.toLowerCase().replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}
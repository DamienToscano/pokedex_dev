import tailwindConfig from '~/tailwind.config';

export const getTypeColor = (type: string) => {
    const color = tailwindConfig.theme.extend.colors[type]
    return color
}
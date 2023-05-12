import type { Config } from 'tailwindcss'
export default <Partial<Config>>{
    theme: {
        extend: {
            colors: {
                'bug': '#A7BD1C',
                'grass': '#58AF94',
                'fire': '#ea7571',
                'fighting': '#DC6661',
                'flying': '#95c8f9',
                'ice': '#95c8f9',
                'water': '#75AEF0',
                'dragon': '#3A61DB',
                'electric': '#F7CD5C',
                'poison': '#8f6ba2',
                'ghost': '#765488',
                'ground': '#b98981',
                'rock': '#a9756f',
                'fairy': '#f68fb9',
                'psychic': '#DF608B',
                'normal': '#BFBFBF',
                'steel': '#949494',
                'dark': '#5A5366',
            },
        },
    },
    safelist: [
        {
            pattern: /bug|grass|fire|fighting|flying|ice|water|dragon|electric|poison|ghost|ground|rock|fairy|psychic|normal|steel|dark/,
        }
    ],
}
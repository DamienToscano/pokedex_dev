export class PokemonSpecy {
    description: string;
    habitat: string;
    is_legendary: boolean;
    shape: string;
    type: string;
    growth_rate: string;
    capture_rate: number;
    base_happiness: number;
    color: string;
    egg_groups: Array<string>;
    gender_rate_male: number;
    gender_rate_female: number;
    gendered: boolean;

    constructor(description: string, habitat: string, is_legendary: boolean, shape: string, type: string, growth_rate: string, capture_rate: number, base_happiness: number, color: string, egg_groups: Array<string>, gender_rate_male: number, gender_rate_female: number, gendered: boolean) {
        this.description = description;
        this.habitat = habitat;
        this.is_legendary = is_legendary;
        this.shape = shape;
        this.type = type;
        this.growth_rate = growth_rate;
        this.capture_rate = capture_rate;
        this.base_happiness = base_happiness;
        this.color = color;
        this.egg_groups = egg_groups;
        this.gender_rate_male =  gender_rate_male;
        this.gender_rate_female =  gender_rate_female;
        this.gendered = gendered;
    }

    static fromJson(json: any): PokemonSpecy {
        return new PokemonSpecy(
            json.flavor_text_entries.filter((entry: any) => {
                return entry.language.name === 'en' && entry.version.name === 'red'
            })[0].flavor_text,
            json.habitat.name,
            json.is_legendary,
            json.shape.name,
            json.genera.filter((genus: any) => {
                return genus.language.name === 'en'
            })[0].genus,
            json.growth_rate.name,
            json.capture_rate,
            json.base_happiness,
            json.color.name,
            json.egg_groups.map((egg_group: any) => {
                return egg_group.name
            }),
            100 - (json.gender_rate / 8 * 100),
            json.gender_rate / 8 * 100,
            json.gender_rate !== -1,
        )
    }
}

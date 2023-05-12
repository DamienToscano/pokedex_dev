export class Ability {
    id: number;
    name: string;
    description: string; // flavor text
    effect: string; // effect entries

    constructor(id: number, name: string, description: string, effect: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.effect = effect;
    }

    static fromJson(json: any): Ability {
        return new Ability(
            json.id,
            json.name,
            json.flavor_text_entries.filter((entry: any) => {
                return entry.language.name === 'en'
            })[0].flavor_text,
            json.effect_entries.length > 0 ? json.effect_entries.filter((effect: any) => {
                return effect.language.name === 'en'
            })[0].short_effect : 'No description available',
        )
    }
}
export class Item {
    id: number;
    name: string;
    cost: number;
    sprite: string;
    description: string;
    category: string;

    constructor(id: number, name: string, cost: number, sprite: string, description: string, category: string) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.sprite = sprite;
        this.description = description;
        this.category = category;
    }

    static fromJson(json: any): Item {
        return new Item(
            json.id,
            json.name,
            json.cost,
            json.sprites.default,
            json.flavor_text_entries.filter((entry: any) => {
                return entry.language.name === 'en'
            })[0].text,
            json.category.name,
        )
    }
}
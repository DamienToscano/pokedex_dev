export class Move {
    id: number;
    name: string;
    power: number;
    pp: number;
    priority: number;
    accuracy: number;
    damage_class: string;
    description: string;
    target: string;
    type: string;

    constructor(id: number, name: string, power: number, pp: number, priority: number, accuracy: number, damage_class: string, description: string, target: string, type: string) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.pp = pp;
        this.priority = priority;
        this.accuracy = accuracy;
        this.damage_class = damage_class;
        this.description = description;
        this.target = target;
        this.type = type;
    }

    static fromJson(json: any): Move {
        return new Move(
            json.id,
            json.name,
            json.power,
            json.pp,
            json.priority,
            json.accuracy,
            json.damage_class.name,
            json.flavor_text_entries.filter((entry: any) => {
                return entry.language.name === 'en'
            })[0].flavor_text,
            json.target.name,
            json.type.name,
        )
    }
}

import { PokemonTypeType, PokemonStatType, PokemonMoveType, PokemonAbilityType } from "@/types/pokemons";

export class Pokemon {
    id: number;
    name: string;
    types: Array<PokemonTypeType>;
    picture: string;
    height: number;
    weight: number;
    stats: Array<PokemonStatType>;
    base_experience: number;
    moves: Array<PokemonMoveType>;
    abilities: Array<PokemonAbilityType>;

    constructor(id: number, name: string, types: Array<PokemonTypeType>, picture: string, height: number, weight: number, stats: Array<PokemonStatType>, base_experience: number, moves: Array<PokemonMoveType>, abilities: Array<PokemonAbilityType>) {
        this.id = id;
        this.name = name;
        this.types = types;
        this.picture = picture;
        this.height = height;
        this.weight = weight;
        this.stats = stats;
        this.base_experience = base_experience;
        this.moves = moves;
        this.abilities = abilities;
    }

    static fromJson(json: any): Pokemon {
        return new Pokemon(
            json.id,
            json.name,
            json.types.map((type: any) => {
                return {
                    name: type.type.name
                }
            }),
            // Can change the picture between all the sprites available
            json.sprites.other['official-artwork'].front_default,
            json.height,
            json.weight,
            json.stats.map((stat: any) => {
                return {
                    name: stat.stat.name,
                    value: stat.base_stat
                }
            }),
            json.base_experience,
            // Get the moves
            // Only from red-blue version
            // Only level-up moves
            // Sort by level
            json.moves.filter((move: any) => {
                return move.version_group_details[0].move_learn_method.name === 'level-up' && move.version_group_details[0].version_group.name === 'red-blue'
            }).map((move: any) => {
                return {
                    id: move.move.url.split('/')[6],
                    url: move.move.url,
                    name: move.move.name,
                    level: move.version_group_details[0].level_learned_at
                }
            }).sort((a: any, b: any) => {
                return a.level - b.level
            }),
            json.abilities.map((ability: any) => {
                return {
                    url: ability.ability.url,
                    name: ability.ability.name
                }
            }),
        );
    }
}
import { PokemonEncounterType } from "~/types/pokemons";

export class PokemonEncounter {
    pokemon_id: number;
    encounters: PokemonEncounterType[];
    
    constructor(pokemon_id: number, encounters: Array<any>) {
        this.pokemon_id = pokemon_id;
        this.encounters = encounters;
    }

    static fromJson(json: any, id: number): PokemonEncounter {
        return new PokemonEncounter(
            id,
            json.filter((encounter: any) => {
                return encounter.version_details.filter((version_detail: any) => {
                    return version_detail.version.name === 'red'
                }).length > 0
            }).map((encounter: any) => {
                return {
                    id: encounter.location_area.url.split('/')[6],
                    name: encounter.location_area.name,
                }
            })
        )
    }
}
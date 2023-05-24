import { defineStore } from 'pinia'
import { Pokemon } from '@/data/models/pokemon'
import { PokemonSpecy } from '@/data/models/pokemon-specy'
import { PokemonEvolutionType, PokemonEvolutionBaseType } from '@/types/pokemons'
import { Move } from '@/data/models/move'
import { Ability } from '@/data/models/ability'
import { Item } from '~/data/models/item'
import { ItemsNameList } from '~/data/sources/items/names'
import { PokemonEncounter } from '@/data/models/pokemon-encounter'
import { AbilitiesList } from '@/data/sources/abilities/list'
import { MovesList } from '@/data/sources/moves/list'
import { PokemonsSpecies } from '@/data/sources/pokemons/species'
import { PokemonsEncounters } from '@/data/sources/pokemons/encounters'
import { PokemonsEvolutions } from '@/data/sources/pokemons/evolutions'
import { PokemonsList } from '@/data/sources/pokemons/list'
import { ItemsList } from '@/data/sources/items/list'


export const usePokemonStore = defineStore('pokemonStore', {
    state: () => ({
        mode: <string>'local',
        pokemons: <Pokemon[]>[],
        pokemons_species: <PokemonSpecy[]>[],
        pokemons_encounters: <PokemonEncounter[]>[],
        pokemons_evolutions: <PokemonEvolutionType[][]>[],
        moves: <Move[]>[],
        abilities: <Ability[]>[],
        items: <Item[]>[],
        loading: <boolean>false,
        isLoaded: <boolean>false,
        limit: <number>151,
        evolution_chain_limit: <number>78,
        types: <Array<string>>[
            'grass',
            'poison',
            'fire',
            'flying',
            'water',
            'bug',
            'normal',
            'electric',
            'ground',
            'fairy',
            'fighting',
            'psychic',
            'rock',
            'steel',
            'ice',
            'ghost',
            'dragon',
        ],
    }),
    getters: {
        getPokemonsByType: (state) => (type: string) => {
            return state.pokemons.filter((pokemon) => {
                return pokemon.types.some((t) => t.name === type)
            })
        },
        getPokemonById: (state) => (id: number) => {
            return state.pokemons[id - 1]
        },
        getPokemonSpecyById: (state) => (id: number) => {
            return state.pokemons_species[id - 1]
        },
        getPokemonEncountersById: (state) => (id: number) => {
            return state.pokemons_encounters[id - 1].encounters
        },
        getPokemonEvolutionById: (state) => (id: number) => {
            return state.pokemons_evolutions.filter((evolution) => {
                return evolution.some((e) => e.id == id)
            })[0]
        },
        getPokemonMoveById: (state) => (id: number) => {
            return state.moves.filter((move) => {
                return move.id == id
            })[0]
        },
        getRandomPokemon: (state) => () => {
            return state.pokemons[Math.floor(Math.random() * state.pokemons.length)]
        }
    },
    actions: {
        handleFetch() {
            if (this.mode === 'api') {
                this.fetchData()
            } else {
                this.fetchLocalData()
            }
        },
        async fetchData() {
            if (this.pokemons.length > 0) {
                return
            }

            this.loading = true

            /* ******** */
            /* API MODE */
            /* ******** */

            // Make an array with index from 1 to 151
            const pokemon_ids = Array.from(Array(151).keys()).map((i) => i + 1)

            this.pokemons = await Promise.all(pokemon_ids.map(async (id: number) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                return Pokemon.fromJson(await response.json())
            }))

            // Check the moves method we want to get
            const move_urls = <Array<string>>[]
            const ability_urls = <Array<string>>[]

            this.pokemons.forEach((pokemon) => {
                pokemon.moves.forEach((move) => {
                    if (!move_urls.includes(move.url)) {
                        move_urls.push(move.url)
                    }
                })

                pokemon.abilities.forEach((ability) => {
                    if (!ability_urls.includes(ability.url)) {
                        ability_urls.push(ability.url)
                    }
                })
            })

            // Store moves
            this.moves = await Promise.all(move_urls.map(async (url: string) => {
                const response = await fetch(url)
                return Move.fromJson(await response.json())
            }))

            // Store abilities
            this.abilities = await Promise.all(ability_urls.map(async (url: string) => {
                const response = await fetch(url)
                return Ability.fromJson(await response.json())
            }))

            // Store pokemon species
            this.pokemons_species = await Promise.all(pokemon_ids.map(async (id: number) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
                return PokemonSpecy.fromJson(await response.json())
            }))

            // Store pokemon encounters
            this.pokemons_encounters = await Promise.all(pokemon_ids.map(async (id: number) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
                return PokemonEncounter.fromJson(await response.json(), id)
            }))

            // Store pokemon evolutions
            const evolution_chain_ids = Array.from(Array(this.evolution_chain_limit).keys()).map((i) => i + 1)

            let pokemons_evolutions_details = await Promise.all(evolution_chain_ids.map(async (id: number) => {
                const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
                return response.json()
            }))

            this.formatPokemonEvolutions(pokemons_evolutions_details)

            // Get Items
            this.items = await Promise.all(ItemsNameList.map(async (item: string) => {
                const response = await fetch(`https://pokeapi.co/api/v2/item/${item}`)
                return Item.fromJson(await response.json())
            }))



            this.loading = false
            this.isLoaded = true
        },
        fetchLocalData() {
            if (this.pokemons.length > 0) {
                return
            }

            this.loading = true

            this.pokemons = PokemonsList as unknown as Array<Pokemon>
            this.moves = MovesList as unknown as Array<Move>
            this.abilities = AbilitiesList as unknown as Array<Ability>
            this.pokemons_species = PokemonsSpecies as unknown as Array<PokemonSpecy>
            this.pokemons_encounters = PokemonsEncounters as unknown as Array<PokemonEncounter>
            this.pokemons_evolutions = PokemonsEvolutions as unknown as Array<Array<PokemonEvolutionType>>
            this.items = ItemsList as unknown as Array<Item>

            this.loading = false
            this.isLoaded = true
        },
        formatPokemonEvolutions(json: any) {
            json.forEach((pokemon_evolution: any) => {

                let pokemon_evolution_chain = <Array<PokemonEvolutionType>>[]

                this.formatPokemonEvolutionChain(pokemon_evolution.chain, pokemon_evolution_chain)
                this.pokemons_evolutions.push(pokemon_evolution_chain)
            })
        },
        formatPokemonEvolutionChain(evolution_chain: any, pokemon_evolution_chain: Array<PokemonEvolutionType>) {

            let base_pokemon: PokemonEvolutionBaseType | null = null

            if (evolution_chain.species.url.split('/')[6] <= this.limit) {
                if (evolution_chain.evolution_details.length == 0) {
                    pokemon_evolution_chain.push({
                        id: evolution_chain.species.url.split('/')[6],
                        name: evolution_chain.species.name,
                        level: null,
                        trigger: null,
                        item: null,
                        picture: this.pokemons[evolution_chain.species.url.split('/')[6] - 1].picture,
                        base_pokemon: null,
                    })
                }

                base_pokemon = <PokemonEvolutionBaseType>{
                    id: evolution_chain.species.url.split('/')[6],
                    name: evolution_chain.species.name,
                    picture: this.pokemons[evolution_chain.species.url.split('/')[6] - 1].picture,
                }
            }

            evolution_chain.evolves_to.forEach((evolution: any) => {

                // Only add it if the id is lower than the limit
                if (evolution.species.url.split('/')[6] <= this.limit) {
                    pokemon_evolution_chain.push({
                        id: evolution.species.url.split('/')[6],
                        name: evolution.species.name,
                        level: evolution.evolution_details[0].min_level,
                        trigger: evolution.evolution_details[0].trigger.name,
                        item: evolution.evolution_details[0].item ? evolution.evolution_details[0].item.name : null,
                        picture: this.pokemons[evolution.species.url.split('/')[6] - 1].picture,
                        base_pokemon: base_pokemon,
                    })
                }

                if (evolution_chain.evolves_to.length > 0) {
                    this.formatPokemonEvolutionChain(evolution, pokemon_evolution_chain)
                }
            })
        },
    },
})
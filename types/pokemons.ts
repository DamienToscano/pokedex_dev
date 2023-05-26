export type PokemonTypeType = {
    name: string
}

export type PokemonStatType = {
    name: string,
    value: number
}

export type PokemonMoveType = {
    id: number | string,
    url: string,
    name: string,
    level: number
}

export type PokemonMoveDetailType = {
    id: number,
    url: string,
    level: number,
    name: string,
    power: number,
    pp: number,
    priority: number,
    accuracy: number,
    damage_class: string,
    description: string,
    target: string,
    type: string,
}

export type PokemonAbilityType = {
    url: string,
    name: string,
}

export type PokemonEvolutionType = {
    id: number,
    name: string,
    level: number | null,
    trigger: string | null,
    item: string | null,
    picture: string | undefined,
    base_pokemon: PokemonEvolutionBaseType | null,
}

export type PokemonEvolutionBaseType = {
    id: number,
    name: string,
    picture: string | undefined,
}

export type PokemonPageNavigationType = {
    name: string,
    icon: any,
}

export type PokemonEncounterType = {
    id: number,
    name: string,
}

export type Tardis = {
    id : string,
    dimensions : Dimension[],
    camouflage : string,
    regenerationNumber : number,
    currentYear : number
}

export type Dimension = {
    id : string,
    name : string,
    planets : Planet[]
}

export type Planet = {
    id : string,
    name : string,
    people : Person[]
}

export type Person = {
    id : string,
    name : string,
}
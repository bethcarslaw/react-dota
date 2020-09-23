export interface Rank {
    name: string
    divisions: Division[]
}

export interface Division {
    name: string
    total: number
    od_bin: number
}

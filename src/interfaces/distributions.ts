export interface MmrDistributions {
    ranks: OpenDotaSQL<OpenDotaBin>
    mmr: OpenDotaSQL<OpenDotaBin>
    country_mmr: OpenDotaSQL<CountryMmr>
}

export interface OpenDotaBin {
    bin: number
    bin_name: number
    counter: number
    cumulative_sum: number
}

export interface OpenDotaSQL<T> {
    command: string
    rowCount: number
    rows: Array<T>
    fields: SQLField
    rowsAsArray: boolean
    sum?: {
        count: number
    }
}

export interface SQLField {
    name: string
    tableID: number
    columnID: number
    dataTypeID: number
    dataTypeSize: number
    dataTypeModifier: number
    format: string
}

export interface CountryMmr {
    loccountrycode: string
    count: number
    avg: string
    common: string
}

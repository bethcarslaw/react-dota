export interface Hero {
    id: number
    name: string
    localized_name: string
    primary_attr: string
    attack_type: string
    roles: string[]
    legs: number
}

export interface HeroStats extends Hero {
    img: string
    icon: string
    pro_win: number
    pro_pick: number
    hero_id: number
    pro_ban: number
    '1_pick': number
    '1_win': number
    '2_pick': number
    '2_win': number
    '3_pick': number
    '3_win': number
    '4_pick': number
    '4_win': number
    '5_pick': number
    '5_win': number
    '6_pick': number
    '6_win': number
    '7_pick': number
    '7_win': number
    '8_pick': number
    '8_win': number
    null_pick: number
    null_win: number
    base_health: number
    base_health_regen: number | null
    base_mana: number
    base_mana_regen: number
    base_armour: number
    base_mr: number
    base_attack_min: number
    base_attack_max: number
    base_str: number
    base_agi: number
    base_int: number
    str_gain: number
    agi_gain: number
    int_gain: number
    attack_range: number
    projectile_speed: number
    attack_rate: number
    move_speed: number
    turn_rate: number
    cm_enabled: boolean
}

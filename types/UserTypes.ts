export interface OsuUser {
    user_id: string
    username: string
    join_date: string
    count300: string
    count100: string
    count50: string
    playcount: string
    ranked_score: string
    total_score: string
    pp_rank: string
    level: string
    pp_raw: string
    accuracy: string
    count_rank_ss: string
    count_rank_ssh: string
    count_rank_s: string
    count_rank_sh: string
    count_rank_a: string
    country: string
    total_seconds_played: string
    pp_country_rank: string
    events: OsuEvent[]
}

export interface OsuEvent {
    display_html: string
    beatmap_id: string
    beatmapset_id: string
    date: string
    epicfactor: string
}

export interface OsuSignatureParams {
    uname: string
    colour?: string
    flagstroke?: boolean
    xpbar?: boolean
    xpbarhex?: boolean
    pp?: number
    mode?: number
    countryrank?: boolean
    removeavmargin?: boolean
    flagshadow?: boolean
    opaqueavatar?: boolean
    darktriangles?: boolean
    darkheader?: boolean
    avatarrounding?: number
    rankedscore?: boolean
}

export interface OsuUserParams {
    k?: string
    u?: number
    m?: number
    limit?: number
    type?: "string" | "id"
}

export interface OsuUserBest {
    beatmap_id: string
    score_id: string
    score: string
    maxcombo: string
    count50: string
    count100: string
    count300: string
    countmiss: string
    countkatu: string
    countgeki: string
    perfect: string
    enabled_mods: string
    user_id: string
    date: string
    rank: string
    pp: string
    replay_available: string
}

export interface OsuUserRecent {
    beatmap_id: string
    score: string
    maxcombo: string
    count50: string
    count100: string
    count300: string
    countmiss: string
    countkatu: string
    countgeki: string
    perfect: string
    enabled_mods: string
    user_id: string
    date: string
    rank: string
}

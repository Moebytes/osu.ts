export interface OsuScoreParams {
    k?: string
    b?: number
    u?: number
    m?: number
    mods?: number
    type?: "string" | "id"
    limit?: number
}

export interface OsuScore {
    score_id: string
    score: string
    username: string
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
    pp: string | null
    replay_available: string
}

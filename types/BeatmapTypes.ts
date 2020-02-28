export interface OsuBeatmapParams {
    k?: string
    since?: string
    s?: string
    b?: string
    u?: string
    type?: "string" | "id"
    m?: number
    a?: number
    h?: string
    limit?: number
    mods?: number
}

export interface OsuBeatmap {
    beatmapset_id: string
    beatmap_id: string
    approved: string
    total_length: string
    hit_length: string
    version: string
    file_md5: string
    diff_size: string
    diff_overall: string
    diff_approach: string
    diff_drain: string
    mode: string
    count_normal: string
    count_slider: string
    count_spinner: string
    submit_date: string
    approved_date: string | null
    last_update: string
    artist: string
    title: string
    creator: string
    creator_id: string
    bpm: string
    source: string
    tags: string
    genre_id: string
    language_id: string
    favourite_count: string
    rating: string
    download_unavailable: string
    audio_unavailable: string
    playcount: string
    passcount: string
    max_combo: string | null
    diff_aim: string | null
    diff_speed: string | null
    difficultyrating: string | null
}

export interface OsuReplayParams {
    k?: string
    m?: number
    b?: string
    u?: string
    type?: "string" | "id"
    mods?: string
}

export interface OsuReplay {
    content: string
    encoding: string
}

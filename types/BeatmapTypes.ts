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

export interface OsuBeatmapSet {
    id: number
    title: string
    artist: string
    play_count: number
    favourite_count: number
    has_favourited: boolean
    submitted_date: string
    last_updated: string
    ranked_date: string
    creator: string
    user_id: number
    bpm: number
    source: string
    covers: {
        cover: string
        card: string
        list: string
        slimcover: string
        "cover@2x": string
        "card@2x": string
        "list@2x": string
        "slimcover@2x": string
    }
    preview_url: string
    tags: string
    video: boolean
    storyboard: boolean
    ranked: number
    status: string
    is_scoreable: boolean
    discussion_enabled: boolean
    discussion_locked: boolean
    can_be_hyped: boolean
    availability: {
        download_disabled: boolean
        more_information: string | null
    }
    hype: {
        current: number
        required: number
    }
    nominations: {
        current: number
        required: number
    }
    legacy_thread_url: string
    beatmaps: OsuBeatmapAlt[]
}

export interface OsuBeatmapAlt {
    id: number
    beatmapset_id: number
    mode: string
    mode_int: number
    convert: string | null
    difficulty_rating: number
    version: string
    total_length: number
    hit_length: number
    bpm: number
    cs: number
    drain: number
    accuracy: number
    ar: number
    playcount: number
    passcount: number
    count_circles: number
    count_sliders: number
    count_spinners: number
    count_total: number
    is_scoreable: boolean
    last_updated: string
    ranked: number
    status: string
    url: string
    deleted_at: string | null
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

import * as fs from "fs"
import * as path from "path"
import api from "../API"
import {OsuBeatmap, OsuBeatmapSet, OsuReplay, OsuReplayParams} from "../types"
import {Users, Util} from "./index"

export class Beatmaps {
    private readonly users = new Users(this.api)
    private readonly util = new Util(this.api)
    constructor(private readonly api: api) {}

    /**
     * Gets an entire beatmap set or a single beatmap as an array.
     */
    public get = async (beatmapResolvable: string | number) => {
        const {s, b} = this.util.parseID(beatmapResolvable)
        let response: OsuBeatmap[]
        if (b) {
            response = await this.api.get(`/api/get_beatmaps`, {b})
        } else {
            response = await this.api.get(`/api/get_beatmaps`, {s})
        }
        return response
    }

    /**
     * Searches for beatmaps.
     */
    public search = async (query: string) => {
        const response = await this.api.search(query)
        return response as Promise<OsuBeatmapSet[]>
    }

    /**
     * Returns the beatmaps cover
     */
    public cover = (beatmapID: string | OsuBeatmap) => {
        let id = beatmapID
        if (beatmapID.hasOwnProperty("title")) {
            id = (beatmapID as OsuBeatmap).beatmapset_id
        }
        return `https://assets.ppy.sh/beatmaps/${id}/covers/cover@2x.jpg`
    }

    /**
     * Returns the beatmaps thumbnail
     */
    public thumbnail = (beatmapID: string | OsuBeatmap) => {
        let id = beatmapID
        if (beatmapID.hasOwnProperty("title")) {
            id = (beatmapID as OsuBeatmap).beatmapset_id
        }
        return `https://b.ppy.sh/thumb/${id}l.jpg`
    }

    /**
     * Downloads a replay of a beatmap by a user. This endpoint has a high rate limit.
     */
    public replay = async (userResolvable: string | number, beatmapResolvable: string | number, dest?: string, params?: OsuReplayParams) => {
        if (!params) params = {}
        const beatmap = await this.get(beatmapResolvable).then((b) => b[0])
        const user = await this.users.get(userResolvable)
        params.b = beatmap.beatmap_id
        params.u = user.user_id
        if (!params.m) params.m = 0
        const response = await this.api.get(`/api/get_replay`, params)
        if (response.hasOwnProperty("error")) {
            return Promise.reject(response.error)
        }
        const buffer = Buffer.from(response.content, "base64")
        if (!dest) dest = "./"
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, {recursive: true})
        fs.writeFileSync(path.join(dest, `${user.username} - ${beatmap.title}.osr`), buffer)
        return response as Promise<OsuReplay>
    }
}

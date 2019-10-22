import * as fs from "fs"
import * as path from "path"
import api from "../API"
import {OsuBeatmap, OsuBeatmapParams, OsuReplay, OsuReplayParams} from "../types"
import {Users, Util} from "./index"

export class Beatmaps {
    private readonly users = new Users(this.api)
    private readonly util = new Util(this.api)
    constructor(private readonly api: api) {}

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

    public search = async (params?: OsuBeatmapParams) => {
        const response = await this.api.get(`/api/get_beatmaps`, params)
        return response as Promise<OsuBeatmap[]>
    }

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

import api from "../API"
import {OsuBeatmap, OsuBeatmapParams} from "../types"
import {Util} from "./Util"

export class Beatmaps {
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
}

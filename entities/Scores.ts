import api from "../API"
import {OsuScore, OsuScoreParams, OsuUserBest, OsuUserParams, OsuUserRecent} from "../types"
import {Beatmaps, Users} from "./index"

export class Scores {
    private readonly users = new Users(this.api)
    private readonly beatmaps = new Beatmaps(this.api)
    constructor(private readonly api: api) {}

    /**
     * Gets all the scores on a beatmap.
     */
    public beatmap = async (beatmapResolvable: string | number, params?: OsuScoreParams) => {
        if (!params) params = {}
        const beatmap = await this.beatmaps.get(beatmapResolvable).then((b) => b[0])
        params.b = Number(beatmap.beatmap_id)
        const response = await this.api.get(`/api/get_scores`, params)
        return response as Promise<OsuScore[]>
    }

    /**
     * Gets the best scores of a user.
     */
    public best = async (userResolvable: string | number, params?: OsuUserParams) => {
        if (!params) params = {}
        const user = await this.users.get(userResolvable)
        params.u = Number(user.user_id)
        params.type = "id"
        const response = await this.api.get(`/api/get_user_best`, params)
        return response as Promise<OsuUserBest[]>
    }

    /**
     * Gets the recent scores of a user.
     */
    public recent = async (userResolvable: string | number, params?: OsuUserParams) => {
        if (!params) params = {}
        const user = await this.users.get(userResolvable)
        params.u = Number(user.user_id)
        params.type = "id"
        const response = await this.api.get(`/api/get_user_recent`, params)
        return response as Promise<OsuUserRecent[]>
    }
}

import axios from "axios"

const apiURL = "https://osu.ppy.sh/"
const searchURL = "https://osu.ppy.sh/beatmapsets/search?q="

export default class API {
    constructor(public readonly apiKey: string) {}

    /**
     * Gets an endpoint from the osu! API.
     */
    public get = async (endpoint: string, params?: any) => {
        if (!params) params = {}
        params.k = this.apiKey
        if (endpoint.startsWith("/")) endpoint = endpoint.slice(1)
        endpoint = apiURL + endpoint
        const response = await axios.get(endpoint, {params, headers: {authorization: `Bearer ${this.apiKey}`}}).then((r) => r.data)
        return response
    }

    /**
     * Searches for beatmaps.
     */
    public search = async (query: string) => {
        const response = await axios.get(searchURL).then((r)=>r.data)
        return response.beatmapsets
    }
}

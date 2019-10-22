import api from "../API"

export class Multiplayer {
    constructor(private readonly api: api) {}

    public match = async (matchID: number) => {
        const response = await this.api.get(`/api/get_match`, {mp: matchID})
        return response
    }
}

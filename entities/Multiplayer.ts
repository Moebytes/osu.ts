import api from "../API"

export class Multiplayer {
    constructor(private readonly api: api) {}

    /**
     * You can get a match ID by creating a mp match with BanchoBot.
     */
    public match = async (matchID: number) => {
        const response = await this.api.get(`/api/get_match`, {mp: matchID})
        return response
    }
}

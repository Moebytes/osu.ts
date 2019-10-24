import axios from "axios"
import * as fs from "fs"
import * as path from "path"
import api from "../API"
import {OsuSignatureParams, OsuUser} from "../types"

const sigURL = "http://45.77.153.42/sig.php"

export class Users {
    constructor(private readonly api: api) {}

    /**
     * Gets a user by username or ID/URL.
     */
    public get = async (userResolvable: string | number) => {
        let response: OsuUser[]
        if (String(userResolvable).match(/\d{5,}/)) {
            const u = Number(String(userResolvable).match(/\d+/))
            response = await this.api.get(`/api/get_user`, {u, type: "id"})
        } else {
            response = await this.api.get(`/api/get_user`, {u: userResolvable, type: "string"})
        }
        if (!response[0]) return Promise.reject("This user is invalid.")
        return response[0]
    }

    /**
     * Generates a signature using osu!next signature generator. You can optionally also download it to a location.
     */
    public sig = async (params: OsuSignatureParams, dest?: string) => {
        if (!params.colour) params.colour = "#ff1a58"
        if (!params.xpbar) params.xpbar = true
        if (!params.xpbarhex) params.xpbarhex = true
        if (!params.flagstroke) params.flagstroke = true
        if (!params.pp) params.pp = 1
        if (!params.countryrank) params.countryrank = true
        if (params.colour.startsWith("#")) params.colour = params.colour.slice(1)
        params.colour = "hex" + params.colour
        const response = await axios.get(sigURL, {responseType: "arraybuffer", params})
        if (dest) {
            if (!fs.existsSync(dest)) fs.mkdirSync(dest, {recursive: true})
            fs.writeFileSync(path.join(dest, `${params.uname}.png`), response.data)
        }
        return response.request.res.responseUrl
    }

    /**
     * Gets the banner of a user by scraping the html site. You can also optionally download it.
     */
    public banner = async (userResolvable: string | number, dest?: string) => {
        const user = await this.get(userResolvable)
        const html = await axios.get(`https://osu.ppy.sh/users/${user.user_id}`).then((r) => r.data)
        const bannerRegex = /(?<="cover_url":")(.*?)(?=",)/gm
        const rawBanner = html.match(bannerRegex)
        if (rawBanner) {
            const banner = String(rawBanner).replace(/\\+/g, "")
            if (dest) {
                const response = await axios.get(banner, {responseType: "arraybuffer"})
                if (!fs.existsSync(dest)) fs.mkdirSync(dest, {recursive: true})
                fs.writeFileSync(path.join(dest, `${user.username}.jpeg`), response.data)
            }
            return banner
        } else {
            return Promise.reject("A banner image was not found.")
        }
    }
}

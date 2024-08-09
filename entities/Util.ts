import api from "../API"

export class Util {
    constructor(private readonly api: api) {}

    /**
     * Parses the beatmap set and beatmap id out of a url.
     */
    public parseID = (resolvable: string | number) => {
        if (String(resolvable).match(/\d{6,}/)) {
            const s = String(String(resolvable).match(/\d{1,}/))
            const newStr = String(resolvable).replace(/\d{1,}/, "")
            const b = newStr.match(/\d{1,}/) ? String(newStr.match(/\d{1,}/)) : null
            return {s, b}
        } else {
            return null
        }
    }

    /**
     * Parses out the mods.
     */
    public parseMods(modBits: number) {
        if (modBits === 0) {
            return ("No Mod")
        }
        const modsNames = ["PF", "SO", "FL", "NC", "HT", "RX", "DT", "SD", "HR", "HD", "EZ", "NF"]
        const modsValues = [16416, 4096, 1024, 576, 256, 128, 64, 32, 16, 8, 2, 1]
        const mods = []
        for (let i = 0; i < modsNames.length; i++) {
            if (modBits >= modsValues[i]) {
                modBits -= modsValues[i]
                mods.push(modsNames[i])
            }
        }
        return mods.reverse()
    }
}


import api from "../API"

export class Util {
    constructor(private readonly api: api) {}

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
}

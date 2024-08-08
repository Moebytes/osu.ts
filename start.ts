import Osu from "./Osu"

require("dotenv").config()
const osu = new Osu(process.env.OSU_API_KEY);

(async () => {
    const result = await osu.api.search("gabriel dropout")
    console.log(result[0].nominations)
})()

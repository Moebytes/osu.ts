import Osu from "./Osu"

require("dotenv").config()
const osu = new Osu(process.env.OSU_API_KEY);

(async () => {
    // const result = await osu.beatmaps.get("https://osu.ppy.sh/beatmapsets/904629#osu/1901598")
    // const result = await osu.users.get("https://osu.ppy.sh/users/12584590")
    // const result = await osu.users.generateSignature({uname: "tenpii"}, "./sig")
    const result = await osu.users.fetchBanner("tenpii")
    console.log(result)
})()

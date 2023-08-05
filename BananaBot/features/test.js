import { findAhPrice, myAhApi } from "../utils/auctionFunctions";
import axios from "../../axios";
import { LOGO } from "../utils/constants";

register("command", ()=>{
  s = [
    "Talisman Enrichment Sw", // 250000
    "Experience 1 Blazing Resistance 1 Glowstone Gauntlet",// 43000
    "Personal Compactor 4" // 799000
  ]
  axios.get(myAhApi).then((response)=>{
    auctionInfo = response.data
    ChatLib.chat(`${LOGO}Searching!`)
    console.log(JSON.stringify(findAhPrice(s, auctionInfo), false, 2));
    ChatLib.chat(`${LOGO}Finished grabbing auction data.`)
  }).catch((error)=>{
    console.error(JSON.stringify(error, false, 2))
  })
}).setName("dd")

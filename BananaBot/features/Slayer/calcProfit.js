import { formatDouble,readJson } from "../../utils/functions";
import settings from "../../settings";
import { findName } from "../../utils/bazaarFunctions";
import { YELLOW, AQUA, RED, GREEN } from "../../utils/constants";
import { dropsBlaze, ahBlaze, bzBlaze, dropsEman, ahEman, bzEman, dropsRev, ahRev, bzRev, ahSven, bzSven, dropsSven, ahTara, bzTara, dropsTara } from "./slayerData";
import axios from "../../../axios";
import { findAhPrice, myAhApi } from "../../utils/auctionFunctions";

function calcSlayer(ah, bz, drops, slayer, slayerItem){
    priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer
    kph = parseInt(settings.slayerKPH);
    cost = parseFloat(settings.slayerCost)*1000;
    moneyPerDrop = {};
    if(slayer == "Blaze"){
        moneyPerDrop["Wisp's Potion"] = 100000 * drops["WISP'S_ICE-FLAVORED_WATER_I_SPLASH_POTION"];
    }
    ChatLib.chat(`${RED}Prices:`)
    axios.get(myAhApi).then((response)=>{
        ahPrice = findAhPrice(ah, response.data)
        //gets auction data of items
        Object.keys(ahPrice).forEach((item)=>{
            if(ahPrice[item]){
                ChatLib.chat(`${YELLOW}${item}: ${GREEN}${formatDouble(ahPrice[item])}`)
                moneyPerDrop[item] = ahPrice[item] * drops[item]
            }else{
                ChatLib.chat(`${YELLOW}Found no active auctions for ${item}. If there are multiple items that do not seem correct do /uah.`)
            }
        })
        //gets bazaar data of items
        Object.keys(bz).forEach((item)=>{
            ChatLib.chat(`${YELLOW}${findName(item)}: ${GREEN}${formatDouble(priceSellOffer[item])}`)
            moneyPerDrop[item] = priceSellOffer[item] * drops[item]
        })
        total = 0;
        //get total coins
        Object.keys(moneyPerDrop).forEach((item) =>{
            total += moneyPerDrop[item]
        })
        //chat messages
        ChatLib.chat(`\n${RED}Drop Rates:`)
        Object.keys(drops).forEach((item) =>{
            if(item != slayerItem){
                ChatLib.chat(`${AQUA}${item.toLowerCase().replace(/_/g," ")} ${YELLOW}drops every ${GREEN}${formatDouble(1/drops[item])} ${YELLOW}bosses`)
            }
        })
        ChatLib.chat(`\n${RED}${slayer} Slayer:`)
        ChatLib.chat(`${YELLOW}With ${AQUA}${settings.mf} ${YELLOW}Magic Find, ${GREEN}${kph} ${YELLOW}kills per hour, and ${RED}${cost} ${YELLOW}slayer cost:`)
        ChatLib.chat(`${YELLOW}Total Coins per boss kill: ${GREEN}${formatDouble(total-cost)}`)
        ChatLib.chat(`${YELLOW}Total Coins Per Hour: ${GREEN}${formatDouble(total*kph - kph*cost)}\n`)
    })
}

register("command", () => {
    calcSlayer(ahBlaze, bzBlaze, dropsBlaze, "Blaze", "DERELICT_ASHE")
}).setName("blaze")

register("command", () => {
    calcSlayer(ahEman, bzEman, dropsEman, "Enderman", "NULL_SPHERE")
}).setName("eman")

register("command", () => {
    calcSlayer(ahRev, bzRev, dropsRev, "Revenant", "REVENANT_FLESH")
}).setName("rev")

register("command", () => {
    calcSlayer(ahSven, bzSven, dropsSven, "Sven", "WOLF_TOOTH")
}).setName("sven")

register("command", () => {
    calcSlayer(ahTara, bzTara, dropsTara, "Tarantula", "TARANTULA_WEB")
}).setName("tara")
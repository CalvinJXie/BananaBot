import axios from "../../../axios";
import { tax, findAhPrice, myAhApi } from "../../utils/auctionFunctions";
import { findID, findName, myBzApi } from "../../utils/bazaarFunctions";
import { YELLOW, GREEN, RED, GOLD, LOGO, WHITE, AQUA, GRAY } from "../../utils/constants";
import { formatDouble, readJson } from "../../utils/functions";

function recipeCost(item){
    list = itemRecipes[item].material
    let cost = 0;
    Object.keys(list).forEach((item)=>{
        cost += priceBuyOrder[item] * list[item];
        ChatLib.chat(`${GREEN}${list[item]}${GRAY}x ${YELLOW}${findName(item)} price: ${GREEN}${formatDouble(priceBuyOrder[item] * list[item])}`)
    })
    ChatLib.chat(`\n${GOLD}${findName(item)} ${YELLOW}craft cost: ${GREEN}${formatDouble(cost)}`)
}

register("command", (...args) => {
    priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder
    axios.get(myBzApi).then((response)=>{
        itemRecipes = response.data.bzRecipes
        if(args[0] && args[1]){
            search = findID(`${args[0]} ${args[1]}`)
        }else if(args[0]){
            search = findID(args[0])
        }else{
            search = undefined;
            ChatLib.chat(`${LOGO}${YELLOW}/ic <item> ${WHITE}to display bazaar craft flips.`)
        }

        if(itemRecipes[search] != undefined){
            recipeCost(search);
        }else{
            ChatLib.chat(`${RED}Could not find a recipe. ${RED}This may be due to a misspelling or insufficient search information.`)
        }
    })
}).setName("itemcost").setAliases("ic")

register("command", ()=>{
    //warning flare 16 eSul, 16 molten powder
    //alert flare 32 eSul, 64 molten powder, 16 vertex
    //sos flare 32 eSul, 128, molten powder, 16 vertex, engineering plans, apex
    priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder
    ahItems = {
        "Sos Flare": 0,
        "Wilson": 0
    }
    axios.get(myAhApi).then((response)=>{
        cost = 0;
        ahItems = findAhPrice(ahItems,response.data)
        priceSul = priceBuyOrder["ENCHANTED_SULPHUR"]*80
        pricePowder = priceBuyOrder["MOLTEN_POWDER"]*208
        priceVertex = priceBuyOrder["INFERNO_VERTEX"]*32
        cost += ahItems["Wilson"] + pricePowder + priceSul + priceVertex
        ChatLib.chat(`${GOLD}Sos Flare lbin: ${GREEN}${formatDouble(ahItems["Sos Flare"])}`)
        ChatLib.chat(`${GREEN}80${GRAY}x ${GOLD}Enchanted Sulphur: ${RED}${formatDouble(priceSul)}`)
        ChatLib.chat(`${GREEN}208${GRAY}x ${GOLD}Molten Powder: ${RED}${formatDouble(pricePowder)}`)
        ChatLib.chat(`${GREEN}32${GRAY}x ${GOLD}Vertex: ${RED}${formatDouble(priceVertex)}`)
        ChatLib.chat(`${GOLD}Total without apex: ${RED}${formatDouble(cost)}`)
        ChatLib.chat(`${GOLD}Apex Cost: ${GREEN}${formatDouble(ahItems["Sos Flare"] - cost)}`)
        ChatLib.chat(`${GOLD}Tax: ${GREEN}${formatDouble(ahItems["Sos Flare"] - cost - tax(ahItems["Sos Flare"], 14*24)[3])}`)
    })
    
}).setName("apex");
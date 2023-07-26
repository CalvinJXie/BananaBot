import settings from "../../settings";
import { totalMinionSpeed, formatDouble, totalMinions, readJson } from "../../utils/functions";
import { findID, findName } from "../../utils/bazaarFunctions";
import { AQUA, YELLOW, GREEN, RED, GOLD} from '../../utils/constants'

function calcTotalMinionAction() {
    minionActions = totalMinionSpeed()
    hyperInstaBuy = sellOffer["HYPER_CATALYST"]
    hyperBuyOrder = buyOrder["HYPER_CATALYST"]
    ChatLib.chat(`${YELLOW}Total minion actions: ${GREEN}${formatDouble(minionActions*2)}`)
    ChatLib.chat(`${YELLOW}Total minion actions that obtain resources: ${GREEN}${formatDouble(minionActions)}`)
    ChatLib.chat(`${YELLOW}Total minion loot with ${RED}Hyper Catalysts: ${GREEN}${formatDouble(4*minionActions)}`)
    ChatLib.chat(`\n${YELLOW}Hyper Catalyst buy order cost: ${GREEN}${formatDouble(hyperBuyOrder)}`)
    ChatLib.chat(`${YELLOW}${totalMinions()*4} Hyper Catalysts costs: ${RED}${formatDouble(hyperBuyOrder*totalMinions()*4)}`)
    ChatLib.chat(`\n${YELLOW}Hyper Catalyst insta buy cost: ${GREEN}${formatDouble(hyperInstaBuy)}`)
    ChatLib.chat(`${YELLOW}${totalMinions()*4} Hyper Catalysts costs: ${RED}${formatDouble(hyperInstaBuy*totalMinions()*4)}`)
    item = findID(settings.minionItem)
    itemSellOffer = sellOffer[item]
    itemInstaSell = buyOrder[item]
    if(settings.sellOffer){
        ChatLib.chat(`\n${AQUA}Sell Offer:`)
        ChatLib.chat(`${GOLD}${findName(item)} ${YELLOW}price: ${GREEN}${formatDouble(itemSellOffer)}`);
        ChatLib.chat(`${GOLD}Money per day: ${GREEN}${formatDouble(itemSellOffer*minionActions)}`);  
        ChatLib.chat(`${GOLD}Hyper Catalysts: ${GREEN}${formatDouble(4*minionActions*itemSellOffer)}`);
        ChatLib.chat(`${GOLD}Net coins earned ${YELLOW}(buy order hyper catalysts): ${GREEN}${formatDouble(4*minionActions*itemSellOffer - hyperBuyOrder*totalMinions()*4)}`)
    }else if(settings.InstaSell){
        ChatLib.chat(`\n${AQUA}Insta Sell:`)
        ChatLib.chat(`${GOLD}${findName(item)} ${YELLOW}price: ${GREEN}${formatDouble(itemInstaSell)}`);
        ChatLib.chat(`${GOLD}Money per day: ${GREEN}${formatDouble(itemInstaSell*minionActions)}`);  
        ChatLib.chat(`${GOLD}Hyper Catalysts: ${GREEN}${formatDouble(4*minionActions*itemInstaSell)}`);
        ChatLib.chat(`${GOLD}Net coins earned ${YELLOW}(buy order hyper catalysts): ${GREEN}${formatDouble(4*minionActions*itemInstaSell - hyperBuyOrder*totalMinions()*4)}`)
    }else{
        ChatLib.chat(`${YELLOW}Please turn on insta sell or sell offer inside /bb under minion data, calculate loot subcategory`)
    }
}

register("command", () => {
    buyOrder = readJson("data", "bazaarPrice.json").price.buyOrder
    sellOffer = readJson("data", "bazaarPrice.json").price.sellOffer
    calcTotalMinionAction()  
}).setName("minion");
import settings from "../../settings";
import { findID } from "../../utils/bazaarFunctions";
import { AQUA, YELLOW, RED, GREEN } from "../../utils/constants";
import { formatDouble, readJson } from "../../utils/functions";

const baseSpeed = 600;//seconds
const baseOrganic = 4000;
const baseFuel = 2000;

compostSpeed = baseSpeed/(1+parseInt(settings.compostSpeed)*20/100);
compostMulti = 1+(parseInt(settings.compostMulti)*3/100);
compostReduce = parseInt(settings.compostReduce)/100;
newOrganic = baseOrganic*(1-compostReduce);
newFuel =  baseFuel*(1-compostReduce);

costCompost = 0;
costFueling = {
    "BOX_OF_SEEDS": newOrganic/25600,
    "OIL_BARREL": newFuel/10000,
    "VOLTA": newFuel/10000
}

function calcComposter(){
    priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
    priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;
    lossCompost = (priceBuyOrder["BOX_OF_SEEDS"]*costFueling["BOX_OF_SEEDS"]);
    costCompost = priceSellOffer["COMPOST"]
    if(priceBuyOrder["OIL_BARREL"]>priceBuyOrder["VOLTA"]){
        lossCompost += (priceBuyOrder["VOLTA"]*costFueling["VOLTA"])
        ChatLib.chat(`${YELLOW}Composter using ${AQUA}Volta: ${RED}${formatDouble(priceBuyOrder["VOLTA"])}\n`)
        ChatLib.chat(`${RED}Loss Volta: ${YELLOW}${formatDouble(priceBuyOrder["VOLTA"]*costFueling["VOLTA"])}`)
    } else{
        lossCompost += (priceBuyOrder["OIL_BARREL"]*costFueling["OIL_BARREL"])
        ChatLib.chat(`${YELLOW}Composter using ${AQUA}Oil Barrel: ${RED}${formatDouble(priceBuyOrder["OIL_BARREL"])}\n`)
        ChatLib.chat(`${RED}Loss Oil Barrel: ${YELLOW}${formatDouble(priceBuyOrder["OIL_BARREL"]*costFueling["OIL_BARREL"])}`)
    }
    net = costCompost*compostMulti-lossCompost

    ChatLib.chat(`${RED}Loss Seeds: ${YELLOW}${formatDouble((priceBuyOrder["BOX_OF_SEEDS"]*costFueling["BOX_OF_SEEDS"]))}
${RED}Net Loss: ${YELLOW}${formatDouble(lossCompost)}

${GREEN}Gain: ${YELLOW}${formatDouble(costCompost*compostMulti)}
${GREEN}Net: ${YELLOW}${formatDouble(net)}

${AQUA}Compost/hr: ${GREEN}${formatDouble(3600/compostSpeed)}
${AQUA}Coins/hr: ${GREEN}${formatDouble(net*(3600/compostSpeed))}

${AQUA}Compost/day: ${GREEN}${formatDouble(24*3600/compostSpeed)}
${AQUA}Coins/day: ${GREEN}${formatDouble(net*(24*3600/compostSpeed))}
`)
}
register("command", ()=>calcComposter()).setName("composter")
register("command", ()=>{
    dailyTotal = 0;
    priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
    priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;
    dailyTotal = (priceSellOffer[findID("Art of Peace")]*4 + priceSellOffer[findID("Divine")]*4)- 300000000
    dailyTotal += priceSellOffer["COMPOST"]*compostMulti-((priceBuyOrder["BOX_OF_SEEDS"]*costFueling["BOX_OF_SEEDS"]) + (priceBuyOrder["OIL_BARREL"]*costFueling["OIL_BARREL"]))
    ChatLib.chat(formatDouble(dailyTotal));
}).setName("dailycoin").setAliases("dc")
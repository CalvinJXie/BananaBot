import { GREEN, WHITE, YELLOW } from "../../utils/constants";
import { MagicFindRate, formatDouble } from "../../utils/functions"
import { readJson } from "../../utils/functions";

register("command", (args)=>{
    priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer
    ghost = {
        "Ghostly boots":77777*MagicFindRate(0.01*1.75/100),
        "Volta": priceSellOffer["VOLTA"]*MagicFindRate(0.2*1.75/100),
        "Sorrow": priceSellOffer["SORROW"]*MagicFindRate(0.12*1.75/100),
        "Plasma": priceSellOffer["PLASMA"]*MagicFindRate(0.12*1.75/100),
        "Coins": 1000000*(0.01*1.75/100)
    }
    total = 0;
    Object.keys(ghost).forEach((item)=>{
        total += ghost[item];
    })
    ChatLib.chat(`${YELLOW}Ghosts make ${GREEN}${formatDouble(total)} ${YELLOW}per kill`)
    if(args){
        ChatLib.chat(`${YELLOW}Ghosts make ${GREEN}${formatDouble(total*args)} ${YELLOW}per hour`)
    }else{
        ChatLib.chat(`${YELLOW}/ghost <kills in an hour> ${WHITE}to show hourly rates. Ex: /ghost 5000`)
    }
}).setName("ghost")
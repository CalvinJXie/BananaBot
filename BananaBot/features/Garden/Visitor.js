import settings from "../../settings";
import { findID, findName } from "../../utils/bazaarFunctions";
import Lore from "../../../Lore";
import { formatDouble, registerWhen, readJson } from "../../utils/functions";

const barrier = `§8§m                                                        `;//barrier to separate my lore
hover = false;//tracks if hovered once

//this function takes in item lore and item/quantities and then appends the Lore to the item.
function displayLore(l, tool, ctc, item1, quant1, item2, quant2){
    if(!item2 || item2 === ''){//item2 not provided
        if(ctc<=parseInt(settings.ctcRatio)*1000){
            ctcString = `§8Copper Ratio: §a${formatDouble(ctc)} §6coins`
        }else{
            ctcString = `§8Copper Ratio: §c${formatDouble(ctc)} §6coins`
        }
        totalItemCost = `§9${findName(item1)}: §c-${formatDouble(price[item1]*quant1)}`
        Lore.append(tool, barrier, true)
        if(l[l.length-1].indexOf("Copper Ratio:") == -1){
            Lore.append(tool, totalItemCost, true)
            Lore.append(tool, ctcString, true)
        }
    }else{//if item2 is provided
        if(ctc <= parseInt(settings.ctcRatio)*1000){//sets strings for copper ratio
            ctcString = `§8Copper Ratio: §a${formatDouble(ctc)} §6coins`;
        }else{
            ctcString = `§8Copper Ratio: §c${formatDouble(ctc)} §6coins`;
        }
        loreItem1 = `§9${findName(item1)}: §c-${formatDouble(price[item1]*quant1)}`;//sets strings for item costs
        loreItem2 = `§9${findName(item2)}: §c-${formatDouble(price[item2]*quant2)}`;
        Lore.append(tool, barrier, true);//adds a barrier to bottom makes look nicer
        if(l[l.length-1].indexOf("Copper Ratio:") == -1){//append lore only once
            Lore.append(tool, loreItem1, true);
            Lore.append(tool, loreItem2, true);
            Lore.append(tool, ctcString, true);
        }
    }
    hover = false;
}
registerWhen(register('itemToolTip', (l, tool)=>{
    if(typeof l[0] == 'undefined') return;
    if(l[0].indexOf("Accept Offer") == -1)return;
    if(!l[l.length-1].includes("Copper Ratio:")){
        hover = true;
    }
    if(!hover) return;
    price = readJson("data", "bazaarPrice.json").price.sellOffer
    offer1 = l[2];
    offer2 = l[3];
    copperOffer = l[7];
    jack = offer1.indexOf("Jack o");
    goldCar = offer1.substring(7, offer1.indexOf('x')-3);
    if(offer1.indexOf('x') == -1 && offer2.indexOf('') == 0){//check if only 1 item offered
        copper = parseInt(copperOffer.substring(copperOffer.indexOf('+')+3, copperOffer.indexOf("Copper")-1));
        item1 = findID(offer1.substring(7, offer1.length));
        coinToCopper = price[item1]/copper;
        displayLore(l, tool, coinToCopper, item1, quant1);
    }else if(jack != -1 || goldCar == "Golden Carrot"){
        if(goldCar == "Golden Carrot"){
            ctcString = `§8Copper Ratio: §a600`
        }else if(jack != -1){
            ctcString = `§8Copper Ratio: §a6,200`
        }
        if(l[l.length-1].indexOf("Copper Ratio:") == -1){
            Lore.append(tool, barrier, true)
            Lore.append(tool, ctcString, true)
        }
    }else{
        item1 = findID(offer1.substring(7, offer1.indexOf('x')-3));//gets item1 offered
        quant1 = offer1.substring(offer1.indexOf('x')+1, offer1.length);//gets quantity
        if(offer2.indexOf('x') != -1){//multiple items
            item2 = findID(offer2.substring(7, offer2.indexOf('x')-3));//item 2
            quant2 = offer2.substring(offer2.indexOf('x')+1, offer2.length);//item2 quantity
            copperOffer = l[8];//gets copper lore
            copper = parseInt(copperOffer.substring(copperOffer.indexOf('+')+3, copperOffer.indexOf("Copper")))//gets copper out of lore
            coinToCopper = (price[item1]*quant1 + price[item2]*quant2)/copper;//converts coin to copper item1+item2 cost / copper
            displayLore(l, tool, coinToCopper, item1, quant1, item2, quant2);
        }else{//only 1 item offered
            copper = parseInt(copperOffer.substring(copperOffer.indexOf('+')+3, copperOffer.indexOf("Copper")));
            coinToCopper = (price[item1]*quant1)/copper;
            displayLore(l, tool, coinToCopper, item1, quant1);
        }
    }
}), ()=>settings.gardenVP)
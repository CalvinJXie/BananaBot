import { registerWhen, readJson, formatDouble, arabicToRoman, setRegisters } from "../../utils/functions"
import settings from "../../settings";
import { findID } from "../../utils/bazaarFunctions";
import { AQUA, GOLD, GREEN, RED } from "../../utils/constants";
import { data } from "../../utils/variables";
import axios from "../../../axios";
import { findAhPrice, myAhApi } from "../../utils/auctionFunctions";

var priceBuyOrder;
var priceSellOffer;
var costMycKey;
var costSandKey;
displayString = ""
finishedKuudra = false;

function updateVars(){
    displayString = ""
    priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
    priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;
    costMycKey = {
        "Kuudra Key": 155200 + priceBuyOrder["ENCHANTED_MYCELIUM"]*2,
        "Hot Kuudra Key": 310400 + priceBuyOrder["ENCHANTED_MYCELIUM"]*6,
        "Burning Kuudra Key": 582000 + priceBuyOrder["ENCHANTED_MYCELIUM"]*20,
        "Fiery Kuudra Key": 1164000 + priceBuyOrder["ENCHANTED_MYCELIUM"]*60,
        "Infernal Kuudra Key": 2328000 + priceBuyOrder["ENCHANTED_MYCELIUM"]*120,
    }
    costSandKey = {
        "Kuudra Key": 155200 + priceBuyOrder["ENCHANTED_RED_SAND"]*2,
        "Hot Kuudra Key": 310400 + priceBuyOrder["ENCHANTED_RED_SAND"]*6,
        "Burning Kuudra Key": 582000 + priceBuyOrder["ENCHANTED_RED_SAND"]*20,
        "Fiery Kuudra Key": 1164000 + priceBuyOrder["ENCHANTED_RED_SAND"]*60,
        "Infernal Kuudra Key": 2328000 + priceBuyOrder["ENCHANTED_RED_SAND"]*120,
    }
}

function capWord(str){
    const words = str.split('_');
    const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    result = capitalizedWords.join(' ');

    return result;
}

register("command", ()=>{
    finishedKuudra = !finishedKuudra;
}).setName("pp")

//kuudra ends
registerWhen(register("chat",()=>{
    finishedKuudra = true;
    updateVars();
    setRegisters();
}).setCriteria("${before}Tokens Earned:${tokens}"),()=>settings.kuudraProfit)

//leave instance
registerWhen(register("worldload", () =>{
    finishedKuudra = false;
}), ()=>settings.kuudraProfit);

registerWhen(register("step", () =>{
    inv = Player.getContainer();
    if(displayString != "") return;
    if(inv == undefined) return;
    if(inv.getName().indexOf("Paid Chest") == -1) return;//Paid Chest
    primarySlot = inv.getStackInSlot(11).getNBT().toObject();
    secondarySlot = inv.getStackInSlot(12).getNBT().toObject();
    essenceSlot = inv.getStackInSlot(14).getNBT().toObject();
    teethSlot = inv.getStackInSlot(15).getNBT().toObject();
    costSlot = inv.getStackInSlot(31).getNBT().toObject();
    chestPrices = {
        "primary": [],
        "secondary": 0
    }
    attrTier = 0
    primaryPrice = 0;
    //getting primary price
    primaryName = primarySlot.tag.display.Name.removeFormatting();
    if(!primaryName.includes("Staff")){
        primaryAttributes = primarySlot.tag.ExtraAttributes.attributes;
        attrKeys = Object.keys(primaryAttributes);
        tier1 = primaryAttributes[attrKeys[0]]
        tier2 = primaryAttributes[attrKeys[1]]
        chestPrices["primary"].push(`${capWord(attrKeys[0])} ${tier1} ${capWord(attrKeys[1])} ${tier2} ${primaryName}`)
        chestPrices["primary"].push(`${capWord(attrKeys[1])} ${tier2} ${capWord(attrKeys[0])} ${tier1} ${primaryName}`)
        chestPrices["primary"].push(`${capWord(attrKeys[0])} ${tier1} ${primaryName}`)
        chestPrices["primary"].push(`${capWord(attrKeys[1])} ${tier2} ${primaryName}`)
    }else{
        chestPrices["primary"].push(primaryName)
    }

    //getting secondary price
    secondaryName = secondarySlot.tag.display.Name.removeFormatting();
    secondaryPrice = 0;
    if(secondaryName == "Wheel of Fate"){
        chestPrices["secondary"] = secondaryName;
    }else if(secondaryName == "Attribute Shard"){
        secondaryAttribute = secondarySlot.tag.ExtraAttributes.attributes;
        attr = Object.keys(secondaryAttribute)[0];
        attrTier = Math.pow(2,secondaryAttribute[attr]-1);
        shardName = `${capWord(attr)} 1 ${secondaryName}`
        chestPrices["secondary"] = shardName
    }else if(secondaryName == "Enchanted Book"){
        secondaryEnchant = secondarySlot.tag.ExtraAttributes.enchantments;
        enchantName = Object.keys(secondaryEnchant)[0];
        enchantName = `${capWord(enchantName)} ${arabicToRoman(secondaryEnchant[enchantName])}`
        chestPrices["secondary"] = priceSellOffer[findID(enchantName)];
    }
    //Essence price
    essencePrice = 0;
    essenceName = essenceSlot.tag.display.Name.removeFormatting();
    if(essenceName.includes("Crimson Essence")){
        essenceAmount = essenceName.substring(essenceName.indexOf("x")+1, essenceName.length)
        essenceName = essenceName.substring(0, essenceName.indexOf("x")-1)
        if(settings.maxKuudraPet){
            essencePrice = priceSellOffer[findID(essenceName)] * (essenceAmount*1.2);
        }else{
            essencePrice = priceSellOffer[findID(essenceName)] * essenceAmount;
        }
    }
    
    //Teeth price
    teethPrice = 0;
    teethPrice = (priceSellOffer["ENCHANTMENT_TABASCO_3"] - priceSellOffer["CHILI_PEPPER"]*64)/6;

    //Key Cost
    keyPrice = 0;
    keyType = costSlot.tag.display.Lore[4].removeFormatting();
    if(settings.kuudraCalcMyc){
        keyPrice = costMycKey[keyType]
    }else{
        keyPrice = costSandKey[keyType]
    }
   
    if(keyType == "Infernal Kuudra Key"){
        teethPrice *= 3;
    }else if(keyType == "Fiery Kuudra Key" || keyType == "Burning Kuudra Key"){
        teethPrice *= 2;
    }
    axios.get(myAhApi).then((response)=>{
        chestPrices["primary"] = findAhPrice(chestPrices["primary"], response.data)
        if(typeof chestPrices["secondary"] != "number"){
            secondaryPrice = findAhPrice(chestPrices["secondary"], response.data)
            if(secondaryPrice == null){
                secondaryPrice = 0;
            }else{
                secondaryPrice *= attrTier;
            }
        }else{
            secondaryPrice = chestPrices["secondary"]
        }
        primaryPrice = 0;
        Object.keys(chestPrices["primary"]).forEach((item)=>{
            if(chestPrices["primary"][item] > primaryPrice){
                primaryPrice = chestPrices["primary"][item];
            }
        })
        total = primaryPrice + secondaryPrice + essencePrice - keyPrice;
        displayString = `${GOLD}Primary: ${GREEN}${formatDouble(primaryPrice)}
${GOLD}Secondary: ${GREEN}${formatDouble(secondaryPrice)}
${GOLD}Essence: ${GREEN}${formatDouble(essencePrice)}
${GOLD}Key Cost: ${RED}${formatDouble(keyPrice)}
${AQUA}Total: ${GREEN}${formatDouble(total)}`
        if(settings.kuudraTeeth){
            displayString += `\n${GOLD}Teeth: ${GREEN}${formatDouble(teethPrice)}
${AQUA}Teeth Total: ${GREEN}${formatDouble(total + teethPrice)}`
        }
    }).catch((error)=>{
        console.error(JSON.stringify(error,false,2));
    })
}).setDelay(1), ()=>finishedKuudra);

registerWhen(register("postGuiRender", (x, y, guiType)=>{
    if(!guiType.toString().includes("GuiChest")) return;
    if(displayString == "") return;
    inv = Player.getContainer();
    if(inv == undefined) return;
    if(inv.getName().indexOf("Paid Chest") == -1) return;
    Renderer.drawString(displayString, data.locations.KPL[0], data.locations.KPL[1])
}),()=>finishedKuudra && settings.kuudraProfit);

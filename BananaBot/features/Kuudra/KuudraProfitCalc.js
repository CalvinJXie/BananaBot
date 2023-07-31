import { registerWhen, readJson, formatDouble, arabicToRoman } from "../../utils/functions"
import settings from "../../settings";
import { findID } from "../../utils/bazaarFunctions";
import { AQUA, GOLD, GREEN } from "../../utils/constants";
import { data } from "../../utils/variables";


lbin = readJson("data", "auctionPrice.json");
lbinMap = new Map(Object.entries(lbin));
priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;

displayString = ""
finishedKuudra = false;

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
    lbin = readJson("data", "auctionPrice.json");
    lbinMap = new Map(Object.entries(lbin));
    priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
}).setCriteria("${before}Tokens Earned:${tokens}"),()=>settings.kuudraProfit)

//leave instance
registerWhen(register("worldload", () =>{
    finishedKuudra = false;
}), ()=>settings.kuudraProfit);

registerWhen(register("step", () =>{
    inv = Player.getContainer();
    if(inv == undefined) return;
    if(inv.getName().indexOf("Large Chest") == -1) return;//Paid Chest
    primarySlot = inv.getStackInSlot(11).getNBT().toObject();
    secondarySlot = inv.getStackInSlot(12).getNBT().toObject();
    essenceSlot = inv.getStackInSlot(14).getNBT().toObject();
    teethSlot = inv.getStackInSlot(15).getNBT().toObject();

    //getting primary price
    primaryPrice = 0;
    primaryName = primarySlot.tag.display.Name.removeFormatting();
    primaryAttributes = primarySlot.tag.ExtraAttributes.attributes;
    attrKeys = Object.keys(primaryAttributes);

    if(lbinMap.has(`${capWord(attrKeys[0])} ${capWord(attrKeys[1])} ${primaryName}`)){
        primaryPrice = lbinMap.get(`${capWord(attrKeys[0])} ${capWord(attrKeys[1])} ${primaryName}`)
    }else if(lbinMap.has(`${capWord(attrKeys[1])} ${capWord(attrKeys[0])} ${primaryName}`)){
        primaryPrice = lbinMap.get(`${capWord(attrKeys[1])} ${capWord(attrKeys[0])} ${primaryName}`)
    }else{
        Object.keys(primaryAttributes).forEach((attr)=>{
            tier = Math.pow(2, primaryAttributes[attr]-1)
            attr = `${capWord(attr)} ${primaryName}`
            if(lbinMap.has(attr) && (primaryPrice == 0 || primaryPrice <= lbinMap.get(attr)*tier)){
                primaryPrice = lbinMap.get(attr)*tier;
            }
        })
    }

    //getting secondary price
    secondaryPrice = 0;
    secondaryName = secondarySlot.tag.display.Name.removeFormatting();
    
    if(secondaryName == "Wheel of Fate" && lbinMap.has(secondaryName)){
        secondaryPrice = lbinMap.get(secondaryName);
    }else if(secondaryName == "Attribute Shard"){
        secondaryAttribute = secondarySlot.tag.ExtraAttributes.attributes;
        attr = Object.keys(secondaryAttribute)[0];
        if(lbinMap.has(`${capWord(attr)} ${secondaryName}`)){
            secondaryPrice = lbinMap.get(`${capWord(attr)} ${secondaryName}`) * Math.pow(2,secondaryAttribute[attr]-1);
        }else if(lbinMap.has(`${capWord(attr)} Molten Cloak`)){
            secondaryPrice = lbinMap.get(`${capWord(attr)} Molten Cloak`) * Math.pow(2,secondaryAttribute[attr]-1);
        }
    }else if(secondaryName == "Enchanted Book"){
        secondaryEnchant = secondarySlot.tag.ExtraAttributes.enchantments;
        enchantName = Object.keys(secondaryEnchant)[0];
        enchantName = `${capWord(enchantName)} ${arabicToRoman(secondaryEnchant[enchantName])}`
        secondaryPrice = priceSellOffer[findID(enchantName)];
    }

    //Essence price
    essencePrice = 0;
    essenceName = essenceSlot.tag.display.Name.removeFormatting();
    if(essenceName == "Crimson Essence"){
        essenceAmount = essenceName.substring(essenceName.indexOf("x")+1, essenceName.length)
        essenceName = essenceName.substring(0, essenceName.indexOf("x")-1)
        essencePrice = priceSellOffer[findID(essenceName)] * essenceAmount;
    }
    
    //Teeth price
    teethPrice = (priceSellOffer["ENCHANTMENT_TABASCO_3"] - priceSellOffer["CHILI_PEPPER"]*64)/6;

    total = primaryPrice + secondaryPrice + essencePrice;
    displayString = `${GOLD}Primary: ${GREEN}${primaryPrice}
${GOLD}Secondary: ${GREEN}${secondaryPrice}
${GOLD}Essence: ${GREEN}${essencePrice}
${AQUA}Total: ${GREEN}${total}
${GOLD}Teeth: ${GREEN}${teethPrice}
${AQUA}Teeth Total: ${GREEN}${total + teethPrice}
    `
}).setDelay(1), ()=>finishedKuudra);

registerWhen(register("postGuiRender", (x, y, guiType)=>{
    if(guiType.toString().includes("GuiChat")) return;
    if(displayString == "") return;
    Renderer.drawString(displayString, data.locations.KPL[0], data.locations.KPL[1])
}),()=>finishedKuudra);



//bz - essence, ferocious, hardend, strong, vampire, inferno, ft
//ah - all armor, wof, shards
//hardcode- enrager, tentacle dye

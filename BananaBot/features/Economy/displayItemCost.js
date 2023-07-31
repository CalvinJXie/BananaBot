import { formatDouble, readJson, registerWhen, arabicToRoman } from "../../utils/functions";
import settings from "../../settings";
import { findID } from "../../utils/bazaarFunctions";
import Lore from "../../../Lore";

hover = false;
const barrier = `§8§m                                                        `
itemName = ""

tier = "";
type = "";

stackingEnchants = {
    "compact": 1,
    "cultivating": 1,
    "expertise": 1,
    "hecatomb": 1,
    "champion": 1
}

registerWhen(
    register("itemToolTip", (l, itemLore) => {
        if (!l || l.length <= 3) return;
        const lastElement = l[l.length - 1].removeFormatting();
        const sellerIndex = l.findIndex((lore) => lore.includes("Seller"));
        if (!lastElement || lastElement.removeFormatting().length <= 6 || (sellerIndex === -1 && lastElement.includes("Click")) || lastElement.includes("click"))return;
        if(!lastElement.includes("Total:")){
            hover = true;
        }
        if (!hover) return;
        const nbt = itemLore.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
        const heldEnchants = nbt.getCompoundTag("enchantments").toObject();
        const heldGems = nbt.getCompoundTag("gems").toObject();
        noEnchants = false;
        noGems = false;
        if(Object.keys(heldGems).length == 0) noGems = true;
        if(Object.keys(heldEnchants).length == 0) noEnchants = true;
        if(noGems && noEnchants) return;
        const priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;
        hover = false;
        priceEnchants = 0;
        priceGems = 0;
        if(!noGems){
            Object.keys(heldGems).forEach((gem)=>{
                if((gem.includes("COMBAT") || gem.includes("MINING") || gem.includes("UNIVERSAL") || gem.includes("DEFENSIVE")) && !gem.includes("gem") && !gem.includes("unlocked")){
                    if(heldGems[gem]["quality"]){
                        tier = heldGems[gem]["quality"];
                    }else{
                        tier = heldGems[gem];
                    }
                    type = heldGems[gem+"_gem"];
                    priceGems += priceBuyOrder[findID(`${tier} ${type}`)]
                }else if(!gem.includes("gem") && !gem.includes("unlocked")){
                    if(heldGems[gem]["quality"]){
                        tier = heldGems[gem]["quality"];
                    }else{
                        tier = heldGems[gem];
                    }
                    type = gem.substring(0, gem.indexOf("_"))
                    priceGems += priceBuyOrder[findID(`${tier} ${type}`)]
                }
            })
        }
        if(!noEnchants){
            Object.keys(heldEnchants).forEach((enchant)=>{
                if(stackingEnchants[enchant] != undefined){
                    enchantID = findID(enchant.replace("ultimate_", "") +` ${arabicToRoman(stackingEnchants[enchant])}`)
                }else{
                    enchantID = findID(enchant.replace("ultimate_", "") + ` ${arabicToRoman(heldEnchants[enchant])}`)
                } 
                if(priceBuyOrder[enchantID] != undefined){
                    priceEnchants += priceBuyOrder[enchantID]
                }else{
                    console.error(`Could not find price for ${enchant}`);
                }
            })
        }
        const displayGemCost = `§aGemstones: §c${formatDouble(priceGems)}`;
        const displayEnchantCost = `§aEnchants: §c${formatDouble(priceEnchants)}`;
        const displayTotal = `§aTotal: §c${formatDouble(priceGems + priceEnchants)}`
        Lore.append(itemLore, barrier, true);
        if (lastElement.indexOf("Total:") === -1 && !lastElement.includes("Copper")) {
            if(!noEnchants){
                Lore.append(itemLore, displayEnchantCost, true);
            }
            if(!noGems){
                Lore.append(itemLore, displayGemCost, true);
            }
            Lore.append(itemLore, displayTotal, true);
        }
    }),
() => settings.displayRawCost);

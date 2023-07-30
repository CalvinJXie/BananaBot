import { formatDouble, readJson, registerWhen } from "../../utils/functions";
import settings from "../../settings";
import { findID } from "../../utils/bazaarFunctions";
import Lore from "../../../Lore";

hover = false;
const barrier = `§8§m                                                        `
itemName = ""

registerWhen(
    register("itemToolTip", (l, itemLore) => {
        if (!l || l.length <= 3) return;
        const lastElement = l[l.length - 1].removeFormatting();
        const sellerIndex = l.findIndex((lore) => lore.includes("Seller"));
        if (!lastElement || lastElement.removeFormatting().length <= 6 || (sellerIndex === -1 && lastElement.includes("Click")) || lastElement.includes("click"))return;
        if(!lastElement.includes("Enchants:")){
            hover = true;
        }
        if (!hover) return;

        if (l[1].includes("Damage") || l[1].includes("Gear Score")) {
            hover = false;
            const startEnchants = l.findIndex((lore) => lore === "§5§o") + 1;
            const endEnchants = l.findIndex((lore, index) => index > startEnchants && lore === "§5§o");
            if (!l[startEnchants]?.includes("§d§l") || !l[startEnchants]?.includes("§9")) return;

            const priceBuyOrderData = readJson("data", "bazaarPrice.json").price.buyOrder;
            let total = 0;
            l.slice(startEnchants, endEnchants).forEach((lore) => {
                if (!lore.includes("§7")) {
                    const enchantNames = lore.removeFormatting().split(",");
                    enchantNames.forEach((enchant) => {
                        enchant = findID(enchant.trim());
                        if (priceBuyOrderData[enchant] !== undefined) {
                            total += priceBuyOrderData[enchant];
                        } else {
                            console.error(`Could not find price for ${enchant}`);
                        }
                    });
                }
            });
            const displayCost = `§aEnchants: §c${formatDouble(total)}`;
            Lore.append(itemLore, barrier, true);
            if (lastElement.indexOf("Enchants:") === -1 && !lastElement.includes("Copper")) {
                Lore.append(itemLore, displayCost, true);
            }
        }
    }),
() => settings.displayRawCost);

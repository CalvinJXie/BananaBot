import { findID, findName } from "../../utils/bazaarFunctions";
import { YELLOW, GREEN, RED, GOLD } from "../../utils/constants";
import { formatDouble, readJson } from "../../utils/functions";

function recipeCost(item){
    list = itemRecipes[findID(item)].material
    let cost = 0;
    for(let i = 0;i<list.length;i++){
        cost += priceBuyOrder[list[i]]*list[i+1];
        ChatLib.chat(`${RED}${list[i+1]}x ${YELLOW}${findName(list[i])} price: ${GREEN}${formatDouble(priceBuyOrder[list[i]] * list[i+1])}`)
        i++;
    }
    ChatLib.chat(`\n${GOLD}${findName(item)} ${YELLOW}craft cost: ${GREEN}${formatDouble(cost)}`)
}

register("command", (...args) => {
    priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder
    itemRecipes = readJson("data", "bazaar.json").enchantCraftingList.other
    if(args[0] && args[1]){
        search = findID(`${args[0]} ${args[1]}`)
    }else if(args[0]){
        search = findID(args[0])
    }
    if(itemRecipes[search] != undefined){
        recipeCost(search);
    }else{
        ChatLib.chat(`${RED}Could not find a recipe. ${RED}This may be due to a misspelling or insufficient search information.`)
    }
}).setName("itemcost").setAliases("ic")

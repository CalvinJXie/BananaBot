import { AQUA, GOLD, GREEN, LOGO, RED, YELLOW } from "../../utils/constants";
import { formatInt, removeData, saveData, registerWhen, readJson, sortDictDsc } from "../../utils/functions";
import settings from "../../settings";
storeBestiary = {}

registerWhen(register('step', ()=>{
    inv = Player.getContainer();
    if(inv == undefined) return;
    arrowIndex = inv.getName().indexOf("➜");
    if(arrowIndex == -1) return;
    bestiaryArea = inv.getName().substring(arrowIndex+2, inv.getName().length);
    if(bestiaryArea == "Fishing" && inv.getName().indexOf("Fishing") != 0)return;
    for(let i = 10;i<=43;i++){
        if(inv.getStackInSlot(i) == null) break;
        if(inv.getStackInSlot(i) == "1xtile.thinStainedGlass@15") continue;
        if(inv.getStackInSlot(i) == "1xitem.dyePowder@8"){
           mobName = inv.getStackInSlot(i).getNBT().toObject().tag.display.Name
           if(inv.getName().includes("Fishing")){
            if(storeBestiary["Fishing"]){
                if(storeBestiary["Fishing"][bestiaryArea]){
                    storeBestiary["Fishing"][bestiaryArea][mobName] = -1;
                }else{
                    storeBestiary["Fishing"][bestiaryArea] = {[mobName]: -1};
                }
            }else{
                storeBestiary["Fishing"] = {[bestiaryArea]: {[mobName]: -1}};
            }
        }else if(storeBestiary[bestiaryArea]){
            storeBestiary[bestiaryArea][mobName] = -1;
        }else{
            storeBestiary[bestiaryArea] = {[mobName]: -1};
        }
           continue;
        }
        slot = inv.getStackInSlot(i).getNBT().toObject().tag.display.Lore;
        mobNameIndex = slot.findIndex(mob => mob.includes("Bonuses"));
        mobName = slot[mobNameIndex].removeFormatting().substring(0,slot[mobNameIndex].indexOf("Bonuses")-3);
        progressIndex = slot.findIndex(progress=>progress.includes("Overall Progress"))+1;
        progress = slot[progressIndex].removeFormatting();
        playerKills = parseInt(progress.substring(0, progress.indexOf('/')).replace(/,/g, ""));
        if(progress.indexOf('k') != -1){
            maxKills = parseInt(progress.substring(progress.indexOf("/")+1, progress.indexOf("k")).replace(/,/g, ""))*1000;
        }else{
            maxKills = parseInt(progress.substring(progress.indexOf("/")+1, progress.length).replace(/,/g, ""));
        }
        if(maxKills>playerKills){
            if(inv.getName().includes("Fishing")){
                if(storeBestiary["Fishing"]){
                    if(storeBestiary["Fishing"][bestiaryArea]){
                        storeBestiary["Fishing"][bestiaryArea][mobName] = maxKills-playerKills;
                    }else{
                        storeBestiary["Fishing"][bestiaryArea] = {[mobName]: maxKills-playerKills};
                    }
                }else{
                    storeBestiary["Fishing"] = {[bestiaryArea]: {[mobName]: maxKills-playerKills}};
                }
            }else if(storeBestiary[bestiaryArea]){
                storeBestiary[bestiaryArea][mobName] = maxKills-playerKills;
            }else{
                storeBestiary[bestiaryArea] = {[mobName]: maxKills-playerKills};
            }
        }
    }
    ChatLib.chat(`${LOGO}${YELLOW}Added ${bestiaryArea} data.`)
}).setDelay(1), ()=>settings.trackBestiary)

register("command", (...args) =>{
    bestiary = readJson("data", "userstats.json")["bestiary"];
    storeBestiary = sortDictDsc(storeBestiary)
    if(args == undefined){
        if(bestiary == undefined){
            ChatLib.chat(`${LOGO}${GOLD}Nothing saved.`)
            return;
        }
        printAllDict(bestiary);
    }else{
        switch(args[0]){
            case "all":
                printAllDict(bestiary);
                break;
            case "save":
                if(storeBestiary){
                    saveData("bestiary", storeBestiary);
                    ChatLib.chat("Saved Bestiary.")
                }else{
                    ChatLib.chat("Nothing to save. Please hover over your bestiary mobs.")
                }
                break;
            case "clear":
                if(args[1] == "all"){
                    ChatLib.chat(`reset bestiary`)
                    removeData("bestiary");
                }else{
                    if(searchDict(bestiary)){
                        removeData("bestiary", found);
                        ChatLib.chat(`Cleared ${found}`)
                    }else{
                        ChatLib.chat("keyword was not found.")
                    }  
                }
                break;
            case "show":
                console.log(JSON.stringify(bestiary, false, 2))
                break;
            default:
                if(searchDict(bestiary, args[1].toLowerCase()) != ""){
                    ChatLib.chat(`${GOLD}${found} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[area][found])}`)
                }else{
                    ChatLib.chat(`${YELLOW}Available arguments: <none, all, save, clear, clearall>`);
                    ChatLib.chat(`${YELLOW}Available mobs are:`);
                    Object.keys(bestiary).forEach((area)=>{
                        ChatLib.chat(`${RED}${area}:`)
                        if(area == "Fishing"){
                            Object.keys(bestiary[area]).forEach((fish)=>{
                                Object.keys(bestiary[area][fish]).forEach((mob)=>{
                                    ChatLib.chat(`${GOLD}${mob}`)
                                })
                            })
                        }else{
                            Object.keys(bestiary[area]).forEach((mob)=>{
                                ChatLib.chat(`${GOLD}${mob}`)
                            })
                        }
                    })
                }
                break;
        }
    }
}).setName("br")

function searchDict(bestiary, args){
    found = "";
    Object.keys(bestiary).forEach((area)=>{
        if(area.toLowerCase().includes(args)){
            found = area;
        }
        if(area == "Fishing"){
            Object.keys(bestiary[area]).forEach((fish)=>{
                Object.keys(bestiary[area][fish]).forEach((mob)=>{
                    if(mob.toLowerCase().indexOf(args) != -1){
                        found = mob;
                    }
                })
            })
        }else{
            Object.keys(bestiary[area]).forEach((mob)=>{
                if(mob.toLowerCase().indexOf(args) != -1){
                    found = mob;
                }
            })
        }
    })
    return found;
}

function printAllDict(bestiary){
    total = 0;
    Object.keys(bestiary).forEach((area)=>{
        if(area == "Fishing"){
            ChatLib.chat(`${AQUA}${area}:`)
            Object.keys(bestiary[area]).forEach((fish)=>{
                ChatLib.chat(`${AQUA}${fish}:`)
                Object.keys(bestiary[area][fish]).forEach((mob)=>{
                    total++;
                    ChatLib.chat(`${GOLD}${mob} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[area][fish][mob])}`)
                })
            })
        }else{
            ChatLib.chat(`${RED}${area}:`)
            Object.keys(bestiary[area]).forEach((mob)=>{
                total++;
                ChatLib.chat(`${GOLD}${mob} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[area][mob])}`)
            })
        }
        
    })
    ChatLib.chat(`${AQUA}You are missing ${GOLD}${total} ${AQUA}max bestiaries`)
}
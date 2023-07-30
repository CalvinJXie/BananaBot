import { AQUA, GOLD, GREEN, YELLOW } from "../../utils/constants";
import { formatInt, removeData, saveData, registerWhen, readJson, sortDictDsc } from "../../utils/functions";
import settings from "../../settings";

storeBestiary = {}

registerWhen(register('itemToolTip', (l)=>{
    mobType = l[l.findIndex(item => item.includes("Bonuses"))];
    if(mobType){
        nameIndex = mobType.indexOf("Bonuses")
        if(nameIndex != -1){
            mobName = mobType.substring(0, nameIndex-1).removeFormatting();
            progress = l[l.findIndex(item => item.includes("Overall Progress"))+1].removeFormatting();
            playerKills = parseInt(progress.substring(0, progress.indexOf("/")).replace(/,/g, ""));
            if(progress.indexOf("k") != -1){
                maxKills = parseInt(progress.substring(progress.indexOf("/")+1, progress.indexOf("k")).replace(/,/g, ""))*1000;
            }else{
                maxKills = parseInt(progress.substring(progress.indexOf("/")+1, progress.length).replace(/,/g, ""));
            }
            if(maxKills-playerKills > 0){
                storeBestiary[mobName.toLowerCase()] = maxKills-playerKills
            }
        }
    }
}), ()=>settings.trackBestiary)

register("command", (...args) =>{
    bestiary = readJson("data", "userstats.json")["bestiary"];
    storeBestiary = sortDictDsc(storeBestiary)
    if(args == undefined){
        total = 0;
        Object.keys(bestiary).forEach((mob)=>{
            total++;
            ChatLib.chat(`${GOLD}${mob} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[mob])}`)
        })
        ChatLib.chat(`${AQUA}You are missing ${GOLD}${total} ${AQUA}max bestiaries`)
    }else{
        switch(args[0]){
            case "all":
                total = 0;
                Object.keys(bestiary).forEach((mob)=>{
                    total++;
                    ChatLib.chat(`${GOLD}${mob} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[mob])}`)
                })
                ChatLib.chat(`${AQUA}You are missing ${GOLD}${total} ${AQUA}max bestiaries`)
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
                    found = "";
                    Object.keys(bestiary).forEach((mob)=>{
                        if(mob.toLowerCase().indexOf(args[1]) != -1){
                            found = mob;
                        }
                    })
                    if(found != ""){
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
                found = "";
                Object.keys(bestiary).forEach((mob)=>{
                    if(mob.toLowerCase().indexOf(args[0]) != -1){
                        found = mob;
                    }
                })
                if(found != ""){
                    ChatLib.chat(`${GOLD}${found} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[found])}`)
                }else{
                    ChatLib.chat(`${YELLOW}Available arguments: <none, all, save, clear, clearall>`)
                    ChatLib.chat(`${YELLOW}Available mobs are:`)
                    Object.keys(bestiary).forEach((mob)=>{
                        ChatLib.chat(`${GOLD}${mob}`)
                    })
                }
                break;
        }
    }
}).setName("br")
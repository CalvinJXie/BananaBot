import { AQUA, GOLD, GREEN, LOGO, RED, YELLOW } from "../../utils/constants";
import { formatInt, removeData, saveData, registerWhen, readJson, sortDictDsc } from "../../utils/functions";
import settings from "../../settings";
storeBestiary = {}
seenBestiary = {
    "Your Island":false,
    "Hub":false,
    "Spider's Den":false,
    "The End":false,
    "Crimson Isle":false,
    "Dwarven Mines":false,
    "Crystal Hollows":false,
    "The Catacombs":false,
    "Regular Fishing":false,
    "Lava Fishing":false,
    "Spooky Festival Fishing":false,
    "Fishing Festival Fishing":false,
    "Winter Fishing":false,
    "Mythological Creatur":false,
    "Jerry":false,
    "Kuudra":false
}

registerWhen(register('step', ()=>{
    inv = Player.getContainer();
    if(inv == undefined) return;

    arrowIndex = inv.getName().indexOf("➜");
    if(arrowIndex == -1) return;

    bestiaryArea = inv.getName().substring(arrowIndex+2, inv.getName().length);
    
    if(inv.getName().includes("Fishing") && seenBestiary[`${bestiaryArea} Fishing`]) return;
    if(seenBestiary[bestiaryArea]) return;
    if(bestiaryArea == "Fishing" && inv.getName().indexOf("Fishing") != 0)return;
    
    if(bestiaryArea === "Fishing"){
        bestiaryArea = "Regular";
    }

    for(let i = 10;i<=43;i++){
        if(inv.getStackInSlot(i) == null) break;
        if(inv.getStackInSlot(i) == "1xtile.thinStainedGlass@15") continue;
        if(inv.getStackInSlot(i) == "1xitem.dyePowder@8"){
           mobName = inv.getStackInSlot(i).getNBT().toObject().tag.display.Name.removeFormatting();
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
    if(bestiaryArea.includes("Catacombs")){
        seenBestiary[bestiaryArea] = false;
    }else if(inv.getName().includes("Fishing")){
        bestiaryArea += " Fishing"
        seenBestiary[bestiaryArea] = true;
    }else{
        seenBestiary[bestiaryArea] = true;
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
                    removeData("bestiary");
                    saveData("bestiary", storeBestiary);
                    for(const key in seenBestiary){
                        seenBestiary[key] = false;
                    }
                    ChatLib.chat(`${LOGO}Saved Bestiary.`);
                }else{
                    ChatLib.chat(`${LOGO}Nothing to save. Please hover over your bestiary mobs.`);
                }
                break;
            case "clear":
                if(args[1] == "all"){
                    ChatLib.chat(`${LOGO}reset bestiary`)
                    removeData("bestiary");
                }else{
                    if(searchDict(bestiary)){
                        removeData("bestiary", found);
                        ChatLib.chat(`${LOGO}Cleared ${YELLOW}${found}`)
                    }else{
                        ChatLib.chat(`${LOGO}keyword was not found.`)
                    }  
                }
                break;
            case "show":
                console.log(JSON.stringify(bestiary, false, 2))
                break;
            case "test":
                console.log(searchDict(bestiary, args[1]));
                break;
            default:
                if(args[0] != undefined && args[1] != undefined && args[2] != undefined){
                    searchBe = `${args[0]} ${args[1]} ${args[2]}`;
                }else if(args[0] != undefined && args[1] != undefined){
                    searchBe = `${args[0]} ${args[1]}`;
                }else{
                    searchBe = args[0];
                }
                found = searchDict(bestiary, searchBe.toLowerCase());
                if(found == undefined) return;
                if(found.length != 0){
                    if(found.length == 3){//if fishing mob
                        ChatLib.chat(`${GOLD}${found[2]} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[found[0]][found[1]][found[2]])}`)
                    }else if(found.length == 1 || found[0].includes("Fishing")){//if area sent into args
                        if(found[1] == undefined && found[0] == "Fishing"){//if a fishing area
                            Object.keys(bestiary["Fishing"]).forEach((fishArea)=>{
                                ChatLib.chat(`${AQUA}${fishArea}`)
                                Object.keys(bestiary["Fishing"][fishArea]).forEach((mob)=>{
                                    ChatLib.chat(`${GOLD}${mob} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary["Fishing"][fishArea][mob])}`)
                                })
                            })
                        }else{//all areas
                            Object.keys(bestiary).forEach((area)=>{
                                if(area == found[0]){
                                    if(area == "Fishing"){
                                        ChatLib.chat(`${AQUA}${found[1]}`)
                                        Object.keys(bestiary[area][found[1]]).forEach((mob)=>{
                                            ChatLib.chat(`${GOLD}${mob} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[area][found[1]][mob])}`)
                                        })
                                    }else{
                                        ChatLib.chat(`${RED}${found[0]}`)
                                        Object.keys(bestiary[area]).forEach((mob)=>{
                                            ChatLib.chat(`${GOLD}${mob} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[area][mob])}`)
                                        })
                                    }
                                }
                            })
                        }
                    }else{//if regular mob
                        ChatLib.chat(`${GOLD}${found[1]} ${YELLOW}kills remaining: ${GREEN}${formatInt(bestiary[found[0]][found[1]])}`)   
                    }
                }else{
                    ChatLib.chat(`${YELLOW}Available arguments: <none, all, save, clear, clearall, mob name, mob category>. Ex: /br Fishing (displays all fishing related bestiary), /br Regular (displays remaining regular fishing kills), /br werewolf (displays reamining werewolf kills)`);
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
    args = args.toLowerCase();
    found = [];
    searchFound = false;
    console.log(found)
    for(let area in bestiary){
        if(searchFound) break;
        if(area.toLowerCase() === args || area.indexOf(args) == 0){//found exact match to area
            searchFound = true;
            found = [area];
            break;
        }else if(area.toLowerCase().includes(args)){//found similar match to area
            found = [area];
        }else{//look for mob
            if(area == "Fishing"){//edgecase since only dictionary
                for(let fishArea in bestiary[area]){//loop through fishing dictionary
                    falower = fishArea.toLowerCase();
                    if(falower === args || falower.indexOf(args) == 0){//found exact match to fishArea
                        searchFound = true;
                        found = [area, fishArea];
                        break;
                    }else if(falower.includes(args)){//found similar match to fishArea
                        found = [area, fishArea];
                    }else{
                        for(let fishMob in bestiary[area][fishArea]){//loop through all fishArea fish
                            fmlower = fishMob.toLowerCase();
                            if(fmlower === args || fmlower.indexOf(args) == 0){//found exact match to fish mob 
                                searchFound = true;
                                found = [area, fishArea, fishMob];
                                break;
                            }else if(fmlower.includes(args)){//found similar match to fish mob
                                found = [area, fishArea, fishMob];
                            }
                        }
                    }
                }
            }else{//loop through regular mobs
                for(let mob in bestiary[area]){
                    moblower = mob.toLowerCase();
                    if(moblower === args || moblower.indexOf(args) == 0){//found exact match to a mob
                        searchFound = true;
                        found = [area, mob];
                        break;
                    }else if(moblower.includes(args)){//found similar match to a mob
                        found = [area, mob];
                    }
                }
            }
        }
    }
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
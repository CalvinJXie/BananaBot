import { newTime, convertTime, formatDouble, formatInt, registerWhen, setRegisters, saveData, removeData } from "../../utils/functions";
import { GREEN, AQUA, DARK_GREEN, LIGHT_PURPLE, RED } from "../../utils/constants";
import { data } from "../../utils/variables";

tablist = null;
holdGem = 0;
holdMith = 0;
startMith = 0;
startGem = 0;
gainedGem = 0;
gainedMith = 0;
start = 0;
time = 0;
doublePowder = false;
toggle = false;
pause = false;
powdString = ""

const Keybind = new KeyBind("Powder Start/Stop", Keyboard.KEY_NONE)
const KeybindPause = new KeyBind("Powder Pause/Unpause", Keyboard.KEY_NONE)

Keybind.registerKeyPress(()=>{
    toggle = !toggle;
    data.locations.powderLoc[2] = toggle;
    if(toggle){
        start = newTime();
        startGem = tabPowder()[0]
        startMith = tabPowder()[1]
        totalLast = tabPowder()[1] + tabPowder()[0]
        pauseStart = 0;
        pauseEnd = 0;
        setRegisters();
        ChatLib.chat(`${AQUA}Powder Tracker: ${GREEN}on`)
    }else{
        ChatLib.chat(`${AQUA}Powder Tracker: ${RED}off`)
        pause = false;
        setRegisters();
    }
})

KeybindPause.registerKeyPress(()=>{
    if(!toggle)return;
    pause = !pause;
    if(pause){
        ChatLib.chat(`${AQUA}Powder Tracker: ${GREEN}Paused`)
        pauseStart = newTime();
        setRegisters();
    }else{
        ChatLib.chat(`${AQUA}Powder Tracker: ${RED}Unpaused`)
        start += (newTime() - pauseStart)
        setRegisters();
    }
});
//bossbar
const WitherClass = Java.type('net.minecraft.entity.boss.EntityWither').class;

//returns tab number [gemstone powder, mithril powder]
function tabPowder(){
    tablist = TabList.getNames();
    if(tablist == null) return;
    mPowder = tablist.find((tab)=> tab.indexOf("Mithril Powder:") != -1);
    gPowder = tablist.find((tab)=> tab.indexOf("Gemstone Powder:") != -1);
    if(mPowder  && gPowder){
        holdGem = parseInt(gPowder.removeFormatting().replace(/[^0-9.]/g, ''))
        holdMith = parseInt(mPowder.removeFormatting().replace(/[^0-9.]/g, ''))
        
    }
    return [holdGem , holdMith]
}

function checkDouble(){
    bossbar = World.getAllEntitiesOfType(WitherClass);
    eventType = bossbar.find(wither => wither.getName().indexOf("EVENT") != -1);
    if(eventType == undefined) {doublePowder = false;return;}
    if(eventType.getName().indexOf("POWDER") != -1){
        doublePowder = true;
    } else {
        doublePowder = false;
    }
}

last = 0;

register("command", (...args) =>{
    switch(args[0]){
        case "save":
            last = newTime().toString();
            powDict = {[last]:{"gemstone": gainedGem, "mithril": gainedMith, "time": time}}
            saveData("powder", powDict)
            ChatLib.chat(`${AQUA}Saved data`)
            break;
        case "rm" || "remove":
            ChatLib.chat(last)
            removeData("powder", last)
            ChatLib.chat(`${AQUA}Removed last`)
            break;
        default:
            ChatLib.chat(`${AQUA}/pow remove/rm/save`)
            break;
    }
}).setName("powder").setAliases("pow")

registerWhen(register("step", () =>{
    if(!pause){
        totalCurr = tabPowder()[0] + tabPowder()[1];
        time = newTime()-start
        checkDouble();
        convertedTime = convertTime(time);
        gainedGem = (tabPowder()[0] - startGem)
        gainedMith = (tabPowder()[1] - startMith)
        powdString = `${GREEN}Total ${LIGHT_PURPLE}Gemstone Powder: ${AQUA}${formatInt(tabPowder()[0] - startGem)}
${GREEN}Total ${DARK_GREEN}Mithril Powder: ${AQUA}${formatInt(tabPowder()[1] - startMith)}
${GREEN}Time Elapsed: ${AQUA}${convertedTime[1]}${GREEN} hrs ${AQUA}${convertedTime[2]}${GREEN} mins ${AQUA}${convertedTime[3]}${GREEN} secs
${LIGHT_PURPLE}Gemstone rate: ${AQUA}${formatDouble(gainedGem/(time/1000)*3600)}
${DARK_GREEN}Mithril rate: ${AQUA}${formatDouble(gainedMith/(time/1000)*3600)}
${GREEN}2x Powder: ${RED}${doublePowder}
`
    }
}).setFps(1), () => toggle && !pause)

registerWhen(register("renderOverlay", () =>{
    Renderer.drawString(powdString, data.locations.powderLoc[0], data.locations.powderLoc[1]);
}), () => toggle)
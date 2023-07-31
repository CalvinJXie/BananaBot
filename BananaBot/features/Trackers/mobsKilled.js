import { AQUA, WHITE, GREEN, RED, GOLD, YELLOW } from "../../utils/constants";
import { registerWhen, setRegisters } from "../../utils/functions";
import { data } from "../../utils/variables";
import { convertTime, timeString, formatDouble } from "../../utils/functions";
//track kills
item = undefined;
heldItem = undefined;
newKill = 0;
oldKill = 0;
//display string
elapsedTime = 0;
totalKills = 0;
killString = "";
goalKill = false;
goal = 0;
//keybind toggles
toggle = false;
pause = false;
const Keybind = new KeyBind("Kill Tracker Start/Stop", Keyboard.KEY_NONE);
const KeybindPause = new KeyBind("Kill Tracker Pause/Unpause", Keyboard.KEY_NONE)

KeybindPause.registerKeyPress(()=>{
    if(!toggle) return;
    pause = !pause;
    if(pause){
        oldKill = 0;
        ChatLib.chat(`${AQUA}Kill Tracker: ${GREEN}Paused`)
        setRegisters();
    }else{
        ChatLib.chat(`${AQUA}Kill Tracker: ${RED}Unpaused`)
        setRegisters();
    }
})

Keybind.registerKeyPress(()=>{
    toggle = !toggle;
    data.locations.MTL[2] = toggle;
    if(toggle){
        heldItem = undefined;
        newKill = 0;
        oldKill = 0;
        elapsedTime = 0;
        totalKills = 0;
        killString = "";
        goalKill = false;
        goal = 0;
        setRegisters();
        ChatLib.chat(`${AQUA}Kill Tracker: ${GREEN}on`)
    }else{
        ChatLib.chat(`${AQUA}Kill Tracker: ${RED}off`)
        pause = false;
        setRegisters();
    }
})

registerWhen(register("step", ()=>{
    elapsedTime++;
    if(Player.getHeldItem() == null) return;
    heldItem = Player.getHeldItem().getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes");
    if(heldItem.getInteger("stats_book") == 0 && killString == "") {
        ChatLib.chat(`${heldItem.getString("id")} does not have book of stats on it. Please apply it to display the inital timer.`)
        return;
    }
    if(item == undefined || heldItem.getString("id") != item){
        oldKill = 0;
        item = heldItem.getString("id");
    }
    newKill = heldItem.getInteger("stats_book");
    if(oldKill == 0){
        oldKill = newKill;
    }else if(oldKill != newKill){//if book of stats applied
        totalKills += newKill-oldKill;
        if(goal>0){
            goal-= newKill-oldKill;
        }
        oldKill = newKill;
    }
    time = convertTime(elapsedTime*1000);
    timeStr = timeString(time, WHITE, GOLD);
    killString = `${AQUA}Total Kills: ${WHITE}${totalKills}
${AQUA}Time Elapsed: ${timeStr}
${AQUA}Mobs per hour: ${WHITE}${formatDouble(totalKills/elapsedTime*3600)}
${AQUA}Kills remaining: ${WHITE}${goal}
${AQUA}ETA: ${timeString(convertTime(1000*(goal/(totalKills/elapsedTime))), WHITE, GOLD)}`
}).setDelay(1),()=> (toggle && !pause));

registerWhen(register("renderOverlay",()=>{
    Renderer.drawString(killString, data.locations.MTL[0], data.locations.MTL[1])
}),()=>toggle);

register("command", (args)=>{
    goalKill = true;
    goal = args;
}).setName("killset").setAliases("ks")

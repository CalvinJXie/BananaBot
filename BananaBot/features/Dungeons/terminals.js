import settings from "../../settings";
import { registerWhen, setRegisters } from "../../utils/functions";

inDungeon = false;

registerWhen(register("chat", ()=>{
    inDungeon = true;
    ChatLib.chat(`In a dungeon run ${inDungeon}`);
    setRegisters();
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon."), ()=>settings.melodyAnnounce);

registerWhen(register("guiOpened", ()=>{
    setTimeout(()=>{
        guiName = Player.getContainer().getName();
        if(!guiName.includes("Click the button on time!")) return;
        ChatLib.say(`/pc ${settings.melodyMsg}`);
    }, 100)
}), ()=>settings.melodyAnnounce && inDungeon);

register("chat", ()=>{
    ChatLib.say(`/pc MY DUCK IS DROWNING`)
}).setCriteria("Oops! You are not on SkyBlock so we couldn't warp you!")

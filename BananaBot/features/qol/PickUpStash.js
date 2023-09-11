import settings from "../../settings"
import { registerWhen, setRegisters } from "../../utils/functions";

let toggle = false;

//wardrobe keybind
const wardKeyBind = new KeyBind("Wardrobe", Keyboard.KEY_NONE)
wardKeyBind.registerKeyPress(() => {
    ChatLib.command(`wd`)
})

//command keybind
const Keybind = new KeyBind("Command", Keyboard.KEY_NONE)
Keybind.registerKeyPress(() => {
    toggle = !toggle;
    if(!toggle){ChatLib.chat("toggle off")}
    else{ChatLib.chat("toggle on")}
    setRegisters();
})

registerWhen(register('step', ()=>{
    ChatLib.command(settings.command);
}).setDelay(parseInt(settings.commandTime)), () => toggle)

register("command", (args)=>{
    ChatLib.command(`tptoplot ${args}`);
}).setName("ttp")
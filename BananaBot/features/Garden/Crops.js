import { newTime } from "../../utils/functions";
import { registerWhen } from "../../utils/functions";

toggle = false;
blocksBroken = 0;
start = 0;
bps = 0;

registerWhen(register("hitBlock", (block) => {
    if(!toggle) return;
    if(block.type == "wheat"){
        blocksBroken++;
    }
    time = newTime()-start
    bps = blocksBroken/(time/1000)
}), () => toggle);

registerWhen(register("renderOverlay", () => {
    Renderer.drawString(bps, 50, 50)
}), () => toggle);

register("command", () =>{
    toggle = true;
    blocksBroken = 0;
    start = newTime();
}).setName("fstart")

register("command", () =>{
    toggle = false;
}).setName("fend")
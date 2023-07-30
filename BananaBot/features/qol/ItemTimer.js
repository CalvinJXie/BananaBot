import settings from "../../settings";
import { data } from "../../utils/variables";
import { BOLD, GOLD, AQUA } from "../../utils/constants";
import { registerWhen } from "../../utils/functions";

let endTime = 0;

let count = 2;
registerWhen(register("actionbar", () => {
  count++;
  if(count%3 == 0){
    endTime = new Date().getTime() + parseInt(settings.ItemDuration) * 1000
  }
}).setCriteria("${before}"+settings.ItemTimerName+"${after}"), () => settings.ItemTimer)

registerWhen(register("renderOverlay", () =>{
  const remainingTime = endTime - new Date().getTime();
  if (remainingTime > 0) {
    const seconds = remainingTime/1000 //Math.ceil(remainingTime / 1000);
    const cdText = `${GOLD}${BOLD}${settings.ItemTimerName} ${AQUA}${BOLD}${seconds} ${GOLD}${BOLD}seconds`;
    Renderer.drawString(cdText, data.locations.ITL[0], data.locations.ITL[1]);
  }
}), ()=> settings.ItemTimer)
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
    Renderer.drawString(cdText, data.ITL[0], data.ITL[1]);
  }
}), ()=> settings.ItemTimer)


/*
color=null, bold=null, italic=null, underlined=null, obfuscated=null, clickEvent=null, hoverEvent=null, insertion=null}}
TextComponent{text='§65,973/5,673❤     §b-135 Mana (§6Fire Veil§b)     §b2,741/2,876✎ Mana', siblings=[], style=Style{hasParent=false, color=null, bold=null, italic=null, underlined=null, obfuscated=null, clickEvent=null, hoverEvent=null, insertion=null}}
*/
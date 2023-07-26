import settings from "../../settings";
import { BOLD, YELLOW, DARK_RED } from "../../utils/constants";
import { formatDouble, registerWhen } from "../../utils/functions";

let start = 0;
let end = 0;
registerWhen(register("chat", ()=>{
    start = new Date().getTime()
}).setCriteria("&r  &r&5&lSLAYER QUEST STARTED!&r"), () => settings.TotalKillTime);

registerWhen(register("chat", ()=>{
    end = new Date().getTime()
    time = (end - start)/1000
    min = Math.floor(time/60)
    if(time != 0)
    {
        if(min != 0)
        {
            ChatLib.chat(`\n${YELLOW}${BOLD}The Slayer took ${DARK_RED}${BOLD}${min}${YELLOW}${BOLD} Minutes and ${DARK_RED}${BOLD}${formatDouble(time%60)}${YELLOW}${BOLD} seconds to complete\n`)
        }
        else
        {
            ChatLib.chat(`\n${YELLOW}${BOLD}The Slayer took ${DARK_RED}${BOLD}${formatDouble(time%60)}${YELLOW}${BOLD} seconds to complete\n`)
        }
    }
}).setCriteria("&r  &r&a&lSLAYER QUEST COMPLETE!&r"), () => settings.TotalKillTime);



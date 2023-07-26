import settings from "../../settings";
import { YELLOW } from "../../utils/constants";
import { data } from "../../utils/variables";
import { registerWhen } from "../../utils/functions";
player = Player.getName();

registerWhen(register("chat", ()=>{
    offset = parseInt(settings.DungeonPingOffset)
    if(settings.DungeonGardenJoin)
    {
        ChatLib.command(`warp garden`)
        setTimeout(()=>{
            ChatLib.command(`p warp`)
        }, (1700+offset));
        setTimeout(()=>{
            if(settings.DunMasMode){
                ChatLib.chat(`${YELLOW}Joining Master Mode Floor ${settings.DunFloor}`)
                ChatLib.command(`joindungeon master_catacombs ${settings.DunFloor}`)
            }
            else if(settings.DunNorm){
                ChatLib.chat(`${YELLOW}Joining Floor ${settings.DunFloor}`)
                ChatLib.command(`joindungeon catacombs ${settings.DunFloor}`)
            }else{
                ChatLib.chat(`${YELLOW}You forgot to enable a dungeon type`)
            } 
        }, (3300+offset));
    }else{
        if(settings.DunMasMode){
            ChatLib.chat(`${YELLOW}Joining Master Mode Floor ${settings.DunFloor}`)
            ChatLib.command(`joindungeon master_catacombs ${settings.DunFloor}`)
        }else if(settings.DunNorm){
            ChatLib.chat(`${YELLOW}Joining Floor ${settings.DunFloor}`)
            ChatLib.command(`joindungeon catacombs ${settings.DunFloor}`)
        }else{
            ChatLib.chat(`${YELLOW}You forgot to enable a dungeon type`)
        } 
    }
//&r&cThe Catacombs &r&8- &r&eFloor I&r    ${before}Defeated${after}
}).setCriteria("${before}Defeated${after}"), () =>settings.AutoRejoin && data.Party.Leader == player)

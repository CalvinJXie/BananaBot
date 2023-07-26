import { MagicFindRate, formatDouble } from "../../utils/functions";
import settings from "../../settings";
import { getInstaBuyDict } from "../../utils/Bazaar";
import { BOLD, YELLOW, AQUA, RED, GREEN } from "../../utils/constants";

kph = settings.slayerKPH;
cost = settings.slayerCost;

drops = {
    "ENCHANTMENT_QUANTUM_1":MagicFindRate(13.33333/100),
    "SOULTWIST_RUNE":MagicFindRate(11.7647/100),
    "BUBBA_BLISTER":MagicFindRate(10/100),
    "FANG-TASTIC_CHOCOLATE_CHIP":MagicFindRate(10/100),
    "GUARDIAN_LUCKY_BLOCK":MagicFindRate(6.25/100),
    "MCGRUBBER'S_BURGER":MagicFindRate(1.2195/100),
    "UNFANGED_VAMPIRE_PART":MagicFindRate(1.2195/100),
    "ENCHANTMENT_ULTIMATE_THE_ONE_1":MagicFindRate(1.7964/100)
}

bz = {
    "FANG-TASTIC_CHOCOLATE_CHIP":0,
    "BUBBA_BLISTER":0,
    "ENCHANTMENT_ULTIMATE_THE_ONE_1":0
}
//money per drop;
mpd = {
    "ENCHANTMENT_QUANTUM_1":1500000 * drops['ENCHANTMENT_QUANTUM_1'],
    "SOULTWIST_RUNE":1,
    "BUBBA_BLISTER":0,
    "FANG-TASTIC_CHOCOLATE_CHIP":0,
    "GUARDIAN_LUCKY_BLOCK":1500000 * drops['GUARDIAN_LUCKY_BLOCK'],
    "MCGRUBBER'S_BURGER":1,
    "UNFANGED_VAMPIRE_PART":45000000 * drops['UNFANGED_VAMPIRE_PART'],
    "ENCHANTMENT_ULTIMATE_THE_ONE_1":0
}

function getBz(){
    start = new Date().getTime();
    getInstaBuyDict(bz, (error, updatedDict) => {
        console.log(item)
        console.log(updatedDict[item])
        if (error) {
            // Handle the error
            console.error(error);
        } else {
            Object.keys(updatedDict).forEach((item) =>{
                console.log(item)
                console.log(updatedDict[item])
                bz[item] = updatedDict[item]
            })
        }
        });
    end = new Date().getTime();
    return (end - start)*1000;    
}

export default function calcVamp()
{
    time = getBz();
    setTimeout(()=>{
        total = 0;
        Object.keys(bz).forEach((item) =>{
            mpd[item] = bz[item]*drops[item]
        })

        Object.keys(mpd).forEach((item) =>{
            total += mpd[item]
        })
        ChatLib.chat(`${RED}${BOLD}Vampire Slayer:`)
        ChatLib.chat(`${YELLOW}With ${AQUA}${settings.mf} ${YELLOW}Magic Find, ${GREEN}${kph} ${YELLOW}kills per hour, and ${RED}${cost} ${YELLOW}slayer cost:`)
        ChatLib.chat(`${YELLOW}Total Coins per boss kill: ${GREEN}${formatDouble(total-cost)}`)
        ChatLib.chat(`${YELLOW}Total Coins Per Hour: ${GREEN}${formatDouble(total*kph - kph*cost)}\n`)

        Object.keys(drops).forEach((item) =>{
            ChatLib.chat(`${AQUA}${item.toLowerCase().replace(/_/g," ")} ${YELLOW}drops every ${GREEN}${formatDouble(1/drops[item])} ${YELLOW}bosses`)
        })
    }, time);
    
}

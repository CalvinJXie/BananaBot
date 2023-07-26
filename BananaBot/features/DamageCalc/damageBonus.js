import { YELLOW, GREEN, RED } from "../../utils/constants"

register("command", () => {
    ChatLib.chat(`${YELLOW}If both players have all of the same stats besides:`)
    ChatLib.chat(`${YELLOW}+1 additive damage: ${GREEN}0.3225806451612856% ${YELLOW}more damage`)
    ChatLib.chat(`${YELLOW}+1 skyblock level(book of progress): ${GREEN}0.2631578947368318% ${YELLOW}more damage`)
    ChatLib.chat(`${YELLOW}+1 strength/critdamage: ${GREEN}0.05714285714286671% ${YELLOW}more damage`)

    ChatLib.chat(`\n${YELLOW}Example: Both players have 1500 str/cd and are the same skyblock level.`)
    ChatLib.chat(`${YELLOW}They are using the same level pet and weapon, but one has sharp 7(65%) and one cubism 6(45%)`)
    ChatLib.chat(`${YELLOW}The sharp 7 player will do 20*0.32258...% more damage.`)
    ChatLib.chat(`${YELLOW}If multiple additive damage is missing, then add the number to the 20 before multiplying by the ratio`)

    ChatLib.chat(`\n${YELLOW}Best sword reforge for pure damage: ${GREEN}fabled`)
    ChatLib.chat(`\n${YELLOW}Best bow reforge for pure damage: ${GREEN}spiritual`)
}).setName("damage")

register("command", () => {
    //BOP applies on base first then gdrag / other damage is added on
    ChatLib.chat(`${YELLOW}Rend Base Multiplier:`)
    ChatLib.chat(`${YELLOW}Rend with no multiplier (base multiplier) does ${GREEN}77.49987% ${YELLOW}of your crit.`)

    ChatLib.chat(`\n${YELLOW}Rend Multipliers:`)
    ChatLib.chat(`${YELLOW}For these multipliers, add the % you get onto the base multiplier. base = 77.49987`)
    ChatLib.chat(`${YELLOW}Golden Dragon (lvl 200) is a multiplier which does ${GREEN}64.88 + base ${YELLOW}of your crit.`)
    ChatLib.chat(`${YELLOW}Each Golden Dragon damage % gives ${GREEN}0.25% ${YELLOW}more damage. Add this to the base (80.45).`)
    ChatLib.chat(`${YELLOW}Thus, Each Golden Dragon level gives ${GREEN}0.3125% ${YELLOW}more damage.`)

    ChatLib.chat(`\n${YELLOW}Each lifeline level gives ${GREEN}.625% ${YELLOW}more damage.`)
    ChatLib.chat(`${YELLOW}Thus, a total of ${GREEN}50% ${YELLOW}more damage with lifeline 80.`)
    ChatLib.chat(`\n${YELLOW}Each dominance level gives ${GREEN}.3499% ${YELLOW}more damage.`)
    ChatLib.chat(`${YELLOW}Thus, a total of ${GREEN}28% ${YELLOW}more damage with dominance 80.`)

    ChatLib.chat(`\n${YELLOW}Each warden speed gives ${GREEN}.1*speed + .25% ${YELLOW}more damage.`)
    ChatLib.chat(`${YELLOW}So 400 speed would be ${GREEN}40.25% ${YELLOW}more damage.`)
    ChatLib.chat(`${YELLOW}and 401 speed would be ${GREEN}40.35% ${YELLOW}more damage.`)

    ChatLib.chat(`\n${YELLOW}Cubism ${GREEN}.25% ${YELLOW}more damage per damage increase.`)
    ChatLib.chat(`${YELLOW}So Cubism 5 = ${GREEN}15% ${YELLOW}more damage, Cubism 6 = ${GREEN}20% ${YELLOW}more damage.`)

    ChatLib.chat(`${YELLOW}Book of progress does ${GREEN} (base + multipliers) * (1+(level/100))% ${YELLOW}of your crit.`)
    ChatLib.chat(`${YELLOW}(Gdrag 200 + lifeline 70 + warden (400 speed))*1.0381 multiplier = ${GREEN}248.11% ${YELLOW}of your crit.`)
    ChatLib.chat(`${YELLOW}This almost 2.5x your crit in rend damage per arrow!`)

    ChatLib.chat(`\n${YELLOW}Not Rend multipliers:`)
    ChatLib.chat(`${YELLOW}Strength/Crit damage is ${RED}not ${YELLOW}a rend multiplier`)
    ChatLib.chat(`${YELLOW}Arrow damage is ${RED}not ${YELLOW}a rend multiplier`)
    ChatLib.chat(`${YELLOW}Base weapon damage is ${RED}not ${YELLOW}a rend multiplier`)
    ChatLib.chat(`${YELLOW}Power Enchant is ${RED}not ${YELLOW}rend multipliers`)
    ChatLib.chat(`${YELLOW}Reaper Swapping is ${RED}not ${YELLOW}a rend multiplier`)

}).setName("rend")
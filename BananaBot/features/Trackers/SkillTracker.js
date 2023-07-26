import { AQUA, GREEN } from "../../utils/constants";
import { data } from "../../utils/variables";
import settings from "../../settings";
import { convertTime, formatDouble, newTime, registerWhen } from "../../utils/functions";

class Skill{
    constructor(){
        this.reset();
    }
    reset(){
        this.start = 0.00; // Starting xp
        this.now = 0.00; // Current xp
        this.gain = 0.00; // Starting - Current xp
        this.next = 0; // xp for level up
    }
}

startTime = 0;
toggle = false;
pause = false;
pauseStart = 0;
skillString = ""

skills = {
    "None": new Skill(),
    "Farming": new Skill(),
    "Mining": new Skill(),
    "Combat": new Skill(),
    "Foraging": new Skill(),
    "Fishing": new Skill(),
    "Enchanting": new Skill(),
    "Alchemy": new Skill(),
}
current = "None";

registerWhen(register("actionbar", (before, amt, skill, num, denom) => {
    if(skill == undefined) return;
    current = skill;
    const trackSkill = skills[current];
    num = num.replace(/,/g, '');
    denom = denom.replace(/,/g, '');
    if(trackSkill.start == 0){
        trackSkill.start = num - amt.replace(/,/g, '')
    }

    trackSkill.now = num;
    trackSkill.gain = num - trackSkill.start;
    if(trackSkill.gain < 0){
        trackSkill.start = trackSkill.next - trackSkill.start;
    }
    trackSkill.next = denom;
    trackSkill.since = 0;
}).setCriteria("${before}+${amt} ${skill} (${num}/${denom})${after}"), () => toggle)

registerWhen(register("step", () =>{
    if(!pause){
        skill = skills[current];
        if(skill == undefined) return;
        time = newTime()-startTime
        convertedTime = convertTime(time);
        skillString = `${GREEN}Current Skill: ${AQUA}${current}
${GREEN}Skill Exp Gained: ${AQUA}${formatDouble(skill.gain)} ${GREEN}xp
${GREEN}Time Elapsed: ${AQUA}${convertedTime[1]}${GREEN} hrs, ${AQUA}${convertedTime[2]}${GREEN} mins, ${AQUA}${convertedTime[3]}${GREEN} seconds
${GREEN}Skill Exp Rate: ${AQUA}${formatDouble(skill.gain/(time/1000)*3600)} ${GREEN}xp/hr
`
    }
}).setFps(2), () => toggle)

registerWhen(register("renderOverlay", () =>{ 
    Renderer.drawString(skillString, data.STL[0], data.STL[1])
}), () => toggle)

register("command", (args) => {
    switch(args){
        case 'start':
            for (let key in skills)
                skills[key].reset()
            startTime = newTime();
            toggle = true;
            break;
        case 'end':
            toggle = false;
            break;
        case 'reset':
            for (let key in skills)
                skills[key].reset()  
        case 'pause':
            pause = true;
            pauseStart = newTime();
            break;
        case 'unpause':
            pause = false;
            startTime += (newTime() - pauseStart)
            break;     
        default:
            ChatLib.chat(`${GREEN}/skill (start, end) start will start the timer, end will stop it.`)
            ChatLib.chat(`${GREEN}/sk (start, end) also works`)
            break;
    }
}).setName("skill").setAliases("sk", settings.skillAlias)

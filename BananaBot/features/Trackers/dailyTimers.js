import { data } from "../../utils/variables"
import { newTime, convertTime, remainTime, registerWhen } from "../../utils/functions"
import { YELLOW, GREEN, GOLD, RED, BOLD, AQUA } from "../../utils/constants";
import settings from "../../settings";

remindStart = 0;//start of the remind
remindName = "";//holds the remind name
displayString = "";//string to hold every single tracked display to render
visitTime = remainTime(720, data.daily.visitor);//stores the visit time in tab

//returns the time till next visitor in seconds
function getVisitorTime(){
    tablist = null;
    visitTime = remainTime(720, data.daily.visitor);
    if(data.world != "Garden") return visitTime;
    tablist = TabList.getNames();
    if(tablist == null) return visitTime;
    guest = tablist.find((tab)=> tab.indexOf("Status:") != -1);
    if(guest) return visitTime;
    visit = tablist.find((tab)=> tab.indexOf("Next Visitor:") != -1);
    if(visit){
        nextVisit = visit.removeFormatting().substring(visit.indexOf(":"), visit.length)
        if(nextVisit.indexOf("Queue Full") != -1){
            visitorTime = 0;
        }
        else if(nextVisit.indexOf('m') != -1){
            visitorTime = 60 * parseInt(nextVisit.substring(0,nextVisit.indexOf('m'))) + parseInt(nextVisit.substring(nextVisit.indexOf('m')+1, nextVisit.indexOf('s')))
        }else if(nextVisit.indexOf('s') != -1){
            visitorTime = parseInt(nextVisit.substring(nextVisit.indexOf('m')+1, nextVisit.indexOf('s')))
        }
    }
    return visitorTime;
}
//takes time till reset and the start time. Returns true if no data or if player's time has reset and the tracker is useable again.
function checkTime(time, data){
    return newTime()/1000 - data/1000 >= time || data == 0;
}
//returns a string to display
function timeString(name, time){
    if(time[0] <= 0 && time[1] <= 0 && time[2] <= 0 && time[3] <=0) return `\n${GOLD}${name}: ${RED}${BOLD}NOW`;
    if(time[0] == 0 && time[1] == 0 && time[2] == 0) return `\n${GOLD}${name}: ${GREEN}${time[3]} ${YELLOW}secs`;
    if(time[0] == 0 && time[1] == 0) return `\n${GOLD}${name}: ${GREEN}${time[2]} ${YELLOW}mins ${GREEN}${time[3]} ${YELLOW}secs`;
    if(time[0] == 0) return `\n${GOLD}${name}: ${GREEN}${time[1]} ${YELLOW}hrs ${GREEN}${time[2]} ${YELLOW}mins ${GREEN}${time[3]} ${YELLOW}secs`;
    return `\n${GOLD}${name}: ${GREEN}${time[0]} ${YELLOW}days ${GREEN}${time[1]} ${YELLOW}hrs ${GREEN}${time[2]} ${YELLOW}mins ${GREEN}${time[3]} ${YELLOW}secs`
}

registerWhen(register("chat", () =>{
    if(checkTime(172800, data.daily.cake)){
        data.daily.cake = newTime();
        ChatLib.chat(`${YELLOW}added Cake timer`)
    }
}).setCriteria("Yum! You gain ${cakeType} for ${time} hours!"), () => settings.trackDaily)

registerWhen(register("chat", () =>{
    if(checkTime(1000, data.daily.raffle)){
        data.daily.raffle = newTime();
        ChatLib.chat(`${YELLOW}added Active Raffle timer`)
    }
}).setCriteria("ACTIVE PLAYER! ${after}"), () => settings.trackDaily)

registerWhen(register("chat", () =>{
    if(checkTime(86400, data.daily.matriarch)){
        data.daily.matriarch = newTime();
        ChatLib.chat(`${YELLOW}added Matriarch Perfume timer`)
    }
}).setCriteria("Applying the perfume like this could confuse the beast and cause her to implode."), () => settings.trackDaily)

registerWhen(register("chat", () =>{
    if(checkTime(86400, data.daily.eyedrop)){
        data.daily.eyedrop = newTime();
        ChatLib.chat(`${YELLOW}added Capsaicin Eyedrop timer`)
    }   
}).setCriteria("You applied the eyedrops on the minion. 1 charge left!"), () => settings.trackDaily)

registerWhen(register("chat", () =>{
    if(checkTime(72000, data.daily.feeder)){
        data.daily.feeder = newTime();
        ChatLib.chat(`${YELLOW}added Caducous Feeder timer`)
    }
}).setCriteria("You may only use this item 2 times per 20 hours!"), () => settings.trackDaily)

registerWhen(register("chat", ()=>{
    data.daily.visitor = newTime();
    data.world = "Garden";
    ChatLib.chat(`${YELLOW}added Visitor timer`)
}).setCriteria("${npc} has arrived on your Garden!"), ()=> settings.trackDaily)

registerWhen(register("chat", () =>{
    if(checkTime(43200, data.daily.hiker)){
        data.daily.hiker = newTime();
        ChatLib.chat(`${YELLOW}added Hungry Hiker to timer`)
    }
}).setCriteria("[NPC] Hungry Hiker: Thanks for the food.."), () => settings.trackHiker)

registerWhen(register("step", () =>{
    feederTimer = convertTime(remainTime(72000, data.daily.feeder));
    pearlTimer = convertTime(remainTime(86400, data.daily.matriarch));
    cakeTimer = convertTime(remainTime(172800, data.daily.cake));
    eyedropTimer = convertTime(remainTime(86400, data.daily.eyedrop));
    hikerTimer = convertTime(remainTime(43200, data.daily.hiker));
    raffleTimer = convertTime(remainTime(1200, data.daily.raffle))
    if(data.world == "Garden"){
        visitTime = getVisitorTime()*1000;
        visitorTimer = convertTime(visitTime);
    }else{
        visitTime -= 1000;
        visitorTimer = convertTime(visitTime)
    }
    fullstring = `${AQUA}Timers:`
    if(settings.trackFeeder) fullstring += timeString("Caducous Feeder", feederTimer);
    if(settings.trackPerfume) fullstring += timeString("Matriarch Pearls", pearlTimer);
    if(settings.trackCake) fullstring += timeString("Cakes", cakeTimer);
    if(settings.trackEyedrop) fullstring += timeString("Capsaicin Eyedrops", eyedropTimer);
    if(settings.trackHiker) fullstring += timeString("Hungry Hiker", hikerTimer);
    if(settings.trackVisitor) fullstring += timeString("Garden Visitor", visitorTimer);
    if(settings.trackRaffle) fullstring += timeString("Active Raffle", raffleTimer);
    if(settings.trackRemind && remindName) fullstring += timeString(remindName, convertTime(remindStart-newTime()))
    displayString = fullstring
}).setFps(1), () => settings.dailyDisplay)

registerWhen(register("renderOverlay", () =>{
    Renderer.drawString(displayString, data.locations.dailyLoc[0], data.locations.dailyLoc[1])
}), () => settings.dailyDisplay)

register("command", (args)=>{
    switch(args){
        case "cake":
            data.daily.cake = 0;
            break;
        case "hiker":
            data.daily.hiker = 0;
            break;
        case "visitor":
            data.daily.visitor = 0;
            break;
        case "matriarch":
            data.daily.matriarch = 0;
            break;
        case "eyedrop":
            data.daily.eyedrop = 0;
            break;
        case "feeder":
            data.daily.feeder = 0;
            break;
        case "remind":
            remindStart = 0;
            remindName = 0;
            break;
        case "raffle":
            data.daily.raffle = newTime();
            break;
        default:
            ChatLib.chat(`${YELLOW}/dailyreset or /dr (cake, hiker, visitor, matriarch, eyedrop, feeder, remind)`)
            break;
    }
}).setName("dailyreset").setAliases("dr")

register("command", (...args)=>{
    if(args[0] != undefined && args[1] != undefined && parseInt(args[1]) >= 0 && args[2] != undefined && parseInt(args[2]) >= 0 && args[3] != undefined && parseInt(args[3]) >= 0 && args[4] != undefined && parseInt(args[4]) >= 0){
        remindStart = newTime() + 1000*(args[1]*86400 + args[2]*3600 + args[3]*60 + args[4]*1);
        remindName = args[0];
    }else{
        ChatLib.chat("invalid value please do /remindme or /remind or /rme <name> <day hour min sec>. Ex: /remindme test 0 3 0 0, this will remind you of a test in 3 hours that you are about to fail because you are playing this game.")
    }
}).setName("remindme").setAliases("remind", "rme")
import settings from "../settings";
import { YELLOW, WHITE, BOLD, RED } from "./constants";

//performance stuff
let registers = [];
export function registerWhen(trigger, dependency) {
    registers.push([trigger.unregister(), dependency, false]);
}

// Updates on world or gui change
export function setRegisters() {
    registers.forEach(trigger => {
        if (trigger[1]() && !trigger[2]) {
            trigger[0].register();
            trigger[2] = true;
        } else if (!trigger[1]() && trigger[2]) {
            trigger[0].unregister();
            trigger[2] = false;
        }
    });
}

//number formats
export function formatDouble(num){
    return (Math.round(num*100)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatInt(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//gets player name
export function getPlayerName(name){
    return name.substring(name.indexOf(']')+2, name.length)
}

//this function calculates total minion production a day, if you want total minion actions multiply the return by 2
export function calculateTotalDayActions(minionSpeed, minionCount) {
    if(minionSpeed == 0 || minionSpeed == '0') {
      return 0;
    }else{
      return (60 / minionSpeed) * 60 * 24 * minionCount / 2;
    }
}

//this function takes user input data into a list and calculates the total amount of actions that create resources from a minion  
export function totalMinionSpeed() {
    const totalDayActions = [];
    const speedMinion = [settings.minionSpeed1, settings.minionSpeed2, settings.minionSpeed3, settings.minionSpeed4, settings.minionSpeed5, settings.minionSpeed6, settings.minionSpeed7, settings.minionSpeed8, settings.minionSpeed9, settings.minionSpeed10, settings.minionSpeed11, settings.minionSpeed12];
    const numMinion = [settings.minionCount1, settings.minionCount2, settings.minionCount3, settings.minionCount4, settings.minionCount5, settings.minionCount6, settings.minionCount7, settings.minionCount8, settings.minionCount9, settings.minionCount10, settings.minionCount11, settings.minionCount12];
    for (let i = 0; i < speedMinion.length; i++) {
    totalDayActions[i] = calculateTotalDayActions(parseInt(speedMinion[i]), parseInt(numMinion[i]));
    }
    const totalActions = totalDayActions.reduce((sum, value) => sum + value, 0);
    return totalActions;
}

export function totalMinions(){
  const minions = [settings.minionCount1, settings.minionCount2, settings.minionCount3, settings.minionCount4, settings.minionCount5, settings.minionCount6, settings.minionCount7, settings.minionCount8, settings.minionCount9, settings.minionCount10, settings.minionCount11, settings.minionCount12];
  total = 0;
  for(let i = 0;i<minions.length;i++){
    total += parseInt(minions[i]);
  }
  return total
}

//magic find drop rate
export function MagicFindRate(droprate){
    if(droprate*100 < 5){
        return (1+(parseInt(settings.mf)/100))*droprate;
    }
    else{
        return droprate;
    }
}

//factorial for big numbers
export function logFactorial(n) {
    let result = 0;
    for (let i = 2; i <= n; i++) {
      result += Math.log(i);
    }
    return result;
}

//reads json. reaedJson(./BananaBot/data)
export function readJson(folder, jsonFile){
    return JSON.parse(FileLib.read(`./BananaBot/${folder}`, jsonFile));
}

export function writeJson(folder, file, write){
  FileLib.write(`./BananaBot/${folder}`, file, JSON.stringify(write, null, 2))
}

export function saveData(dataType, newData) {
  const folder = 'data';
  const jsonFile = 'userstats.json';

  let allData = {};
  try {
    allData = JSON.parse(FileLib.read(`./BananaBot/${folder}`, jsonFile));
  } catch (error) {
    ChatLib.chat("Data does not exist or is empty")
  }

  if (allData[dataType]) {
    allData[dataType] = { ...allData[dataType], ...newData };
  } else {
    allData[dataType] = newData;
  }
  FileLib.write(`./BananaBot/${folder}`, jsonFile, JSON.stringify(allData, null, 2));
}

//dataType is the dictionary key to other dictionaryes, key is the data entry inside
//"dataType": {key: 12}, "dataType2"...
export function removeData(dataType, key) {
  const folder = 'data';
  const jsonFile = 'userstats.json';

  let allData = {};
  try {
    allData = JSON.parse(FileLib.read(`./BananaBot/${folder}`, jsonFile));
  } catch (error) {
    ChatLib.chat("Data does not exist or is empty")
  }
  if(key != undefined){
    if (allData[dataType]) {
      delete allData[dataType][key];
    } else {
      ChatLib.chat(`Entry "${dataType}" not found.`);
    }
  }else{
    delete allData[dataType]
  }

  FileLib.write(`./BananaBot/${folder}`, jsonFile, JSON.stringify(allData, null, 2));
}

//time
export function convertTime(time){
    seconds = Math.floor(time/1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);
    return [days, hours%24, minutes%60, seconds%60];
}

export function newTime(){
   return Date.now();
}

export function getDate(time){
  return new Date(time).toLocaleString();
}

//resetTime is the time till reset in seconds, lastTime is the last time recorded
export function remainTime(resetTime, lastTime){
  //72000: 20hrs, 86400:24 hrs, 3600:1hr
  return resetTime*1000 - (newTime() - lastTime);
}

//sorts dictionary descending
export function sortDictDsc(dictionary) {
    const sortedArray = Object.entries(dictionary).sort((a, b) => b[1] - a[1]);
    const sortedDict = {};
    sortedArray.forEach(([key, value]) => {
      sortedDict[key] = value;
    });
    return sortedDict;
}

export function sortDictAsc(dictionary) {
    const sortedArray = Object.entries(dictionary).sort((a, b) => a[1] - b[1]);
    const sortedDict = {};
    sortedArray.forEach(([key, value]) => {
      sortedDict[key] = value;
    });
    return sortedDict;
}
  
//help message
export const helpMsg = 
`${RED}${BOLD}Mod Related:
${YELLOW}${BOLD}/banana or /bb ${WHITE}to open the settings menu in order to edit data values.
${YELLOW}${BOLD}/bbgui ${WHITE}to change the locations of where the text should be displayed. Scaling is a Work In Progress.

${RED}${BOLD}Minions:
${YELLOW}${BOLD}/hyper ${WHITE}to calculate minion profit per day/hypergolic craft (must input minion speeds in /banana).
${YELLOW}${BOLD}/heavy ${WHITE}to calculate profit from using heavy gabagool fuel (must input minion speeds in /banana).
${YELLOW}${BOLD}/minion ${WHITE}to see minion calculations.
${YELLOW}${BOLD}/minstats <min speed> ${WHITE}to see inferno minion odds for a single minion.
${YELLOW}${BOLD}/gaba ${WHITE}to calculate profit from crafting hypergolics.
${YELLOW}${BOLD}/amal ${WHITE}to show craft cost of amalgamted crimsonite.
${YELLOW}${BOLD}/speed <minion><tier>${WHITE}to find the speed of a minion.

${RED}${BOLD}Money Per Hour Calcs:
${YELLOW}${BOLD}/<blaze/eman/rev/sven/tara> ${WHITE}to show theoretical money per hour of each slayer.
${YELLOW}${BOLD}/copper, /bits ${WHITE}to show the exchange rate of coins to a different currency.
${YELLOW}${BOLD}/farm ${WHITE}to calculate money/hr farming each crop with your input of jacob's event data. This is while using bazaar data.
${YELLOW}${BOLD}/farmnpc ${WHITE}to calculate money/hr farming each crop with your input of jacob's event data. This is using NPC sell price data.
${YELLOW}${BOLD}/composter ${WHITE}to show profit per hour/day with composter. Input composter ugprades in /bb.

${RED}${BOLD}Statistics:
${YELLOW}${BOLD}/binom ${WHITE}to show binomial distribution statistics.
${YELLOW}${BOLD}/calc "x" (*/+-%) "y" ${WHITE}to do simple math like x * y.

${RED}${BOLD}Bazaar/Auction Related stuff:
${YELLOW}${BOLD}/itemcalc or /ic <args> ${WHITE}to display craft cost of an item.
${YELLOW}${BOLD}/bzlist ${WHITE}to display items being tracked.
${YELLOW}${BOLD}/clear <itemName> ${WHITE}to reset bazaar notifier database tracker. You can get itemName from /bzlist.
${YELLOW}${BOLD}/ubz or /uah ${WHITE}to manually update bazaar/auction prices.
${YELLOW}${BOLD}/dailycoin or /dc ${WHITE}to see how much daily money you make a day.

${RED}${BOLD}Party:
${YELLOW}${BOLD}/resetparty ${WHITE}to reset any bad things that happen during dungeon rejoins.
${YELLOW}${BOLD}/joinlist <add/remove/show> ${WHITE}to auto join list only parties (if turned on in /banana).

${RED}${BOLD}Trackers:
${YELLOW}${BOLD}Turn on/off trackers in minecraft controls.
${YELLOW}${BOLD}/powder or /pow <save/remove/rm> ${WHITE}to save/remove tracked powder.
${YELLOW}${BOLD}/skill or /sk <start/end/reset> ${WHITE}to start skill exp/hr tracker.
${YELLOW}${BOLD}/bzlist ${WHITE}to show items inside bz notif. ${YELLOW}${BOLD}/clear <item name> ${WHITE}to remove from this list.
${YELLOW}${BOLD}/dailyreset or /dr (cake, hiker, visitor, matriarch, eyedrop, feeder, remind) ${WHITE}to manually reset dailies if something messes up.
${YELLOW}${BOLD}/remindme or /remind or /rme <name> <day hour min sec> ${WHITE}to set yourself a timer to remind yourself of something!

${RED}${BOLD}Damage Stuff:
${YELLOW}${BOLD}/dmg (on/off) ${WHITE}to print damage in chat.
${YELLOW}${BOLD}/rend ${WHITE}to display most rend multipliers and how the damage calculation works.
${YELLOW}${BOLD}/damage ${WHITE}to display damage multiplier differences.

${RED}${BOLD}Message From Banana:
${YELLOW}${BOLD}Data should auto save after input, but if it seems like it does not do /ct load to ensure it does. Otherwise bug report it. (it wont be fixed)
`
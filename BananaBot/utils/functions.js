import settings from "../settings";
import { data } from "./variables";
import { YELLOW, WHITE, BOLD, RED, GREEN, AQUA } from "./constants";

//performance stuff, registers when a register is activated.
let registers = [];
export function registerWhen(trigger, dependency) {
    registers.push([trigger.unregister(), dependency, false]);
}

//Updates the registers that should be active or not
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
    data.locations.BIL[2] = settings.BloodIchor;
    data.locations.TCL[2] = settings.twinClaw;
    data.locations.ETL[2] = settings.effigyTimer;
    data.locations.ITL[2] = settings.ItemTimer;
    data.locations.dailyLoc[2] = settings.dailyDisplay;
}

//number formats
export function formatDouble(num){
    return (Math.round(num*100)/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatInt(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//gets player name from hypixel chat
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

//function returns total minion speed of user input
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

//function to read only from my folders.
export function readJson(folder, jsonFile){
    return JSON.parse(FileLib.read(`./BananaBot/${folder}`, jsonFile));
}

export function writeJson(folder, file, write){
  FileLib.write(`./BananaBot/${folder}`, file, JSON.stringify(write, null, 2))
}
//saves new data and appends it onto userstats.json
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

//converts the time in miliseconds to d/h/m/s list
export function convertTime(time){
    seconds = Math.floor(time/1000);
    minutes = Math.floor(seconds / 60);
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);
    return [days, hours%24, minutes%60, seconds%60];
}
//returns a better looking time string;
export function timeString(time, color, color2){
  if(time[0] <= 0 && time[1] <= 0 && time[2] <= 0 && time[3] <=0) return "";
  if(time[0] == 0 && time[1] == 0 && time[2] == 0) return `${color}${time[3]} ${color2}secs`;
  if(time[0] == 0 && time[1] == 0) return `${color}${time[2]} ${color2}mins ${color}${time[3]} ${color2}secs`;
  if(time[0] == 0) return `${color}${time[1]} ${color2}hrs ${color}${time[2]} ${color2}mins ${color}${time[3]} ${color2}secs`;
  return `${color}${time[0]} ${color2}days ${color}${time[1]} ${color2}hrs ${color}${time[2]} ${color2}mins ${color}${time[3]} ${color2}secs`
}

export function newTime(){
   return Date.now();
}
//gets player date mm/dd/yyyy
export function getDate(time){
  return new Date(time).toLocaleString();
}

//resetTime is the time till reset in seconds, lastTime is the last time recorded
export function remainTime(resetTime, lastTime){
  //72000: 20hrs, 86400:24 hrs, 3600:1hr
  return resetTime*1000 - (newTime() - lastTime);
}

//sorts dictionary descending depending on the value of the key
//dict = {"name": 50, "name2": 90}; returns "name2": 90, "name": 50
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
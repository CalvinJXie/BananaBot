import settings from "../../settings"
import { registerWhen } from "../../utils/functions";

fishDict = {
    "Water Worm": 0,
    "Poison Worm": 0,
    "Zombie Miner": 0,
    "Carrot King": 0,
    "Agarimoo": 0,
    "Grim Reaper": 0,
    "Phantom Fisher": 0
}

//Lava
registerWhen(register("chat", ()=>{
    ChatLib.say(`/pc [BananaBotCoordinates] Thunder spawned at x: ${parseInt(Player.getX())} y: ${parseInt(Player.getY())} z: ${parseInt(Player.getZ())}`)
}).setCriteria("You hear a massive rumble as Thunder emerges."), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    ChatLib.say(`/pc [BananaBotCoordinates] Jawbus spawned at x: ${parseInt(Player.getX())} y: ${parseInt(Player.getY())} z: ${parseInt(Player.getZ())}`)
}).setCriteria("You have angered a legendary creature... Lord Jawbus has arrived."), ()=>settings.displayRareFish);

//Regular
registerWhen(register("chat", ()=>{
    fishDict["Agarimoo"]++;
}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo."), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    fishDict["Carrot King"]++;
}).setCriteria("Is this even a fish? It's the Carrot King!"), ()=>settings.displayRareFish);

//CH
registerWhen(register("chat", ()=>{
    fishDict["Zombie Miner"]++;
}).setCriteria("A Zombie Miner surfaces!"), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    fishDict["Water Worm"]++;
}).setCriteria("A Water Worm surfaces!"), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    fishDict["Poison Worm"]++;
}).setCriteria("A Poisoned Water Worm surfaces!"), ()=>settings.displayRareFish);

//Spooky
registerWhen(register("chat", ()=>{
    fishDict["Phantom Fisher"]++;
}).setCriteria("The spirit of a long lost Phantom Fisher has come to haunt you."), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    fishDict["Grim Reaper"]++;
}).setCriteria("This can't be! The manifestation of death himself!"), ()=>settings.displayRareFish);

function getString(){
    allString = "";
    Object.keys(fishDict).forEach((fish)=>{
        if(fishDict[fish] != 0){
            allString += `${fish}: ${fishDict[fish]}, `
            fishDict[fish] = 0;
        }
    })
    new Thread(()=>{
        Thread.sleep(500);
        if(allString != ""){
            ChatLib.say(`/pc ${allString.substring(0, allString.length-2)}`)
        }
    }).start();
}
registerWhen(register("chat", ()=>{
    getString();
}).setCriteria("${before}" + settings.fishCountTrigger), ()=>settings.displayRareFish);

const Keybind = new KeyBind("Start Countdown", Keyboard.KEY_NONE)

Keybind.registerKeyPress(()=>{
    new Thread(()=>{
        for(let i = parseInt(settings.fishCountDown);i>0;i--){
            ChatLib.say(`/pc ${i}`)
            Thread.sleep(1000);
        }
        ChatLib.say(`/pc GO RATS`)
    }).start();
})
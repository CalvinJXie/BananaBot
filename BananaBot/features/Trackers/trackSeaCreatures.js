import settings from "../../settings"
import { registerWhen } from "../../utils/functions";
waterWorm = 0;
poisonWorm = 0;
zombieMiner = 0;
carrotKing = 0;
agarimoo = 0;
registerWhen(register("chat", ()=>{
    ChatLib.say(`/pc Thunder spawned at x: ${parseInt(Player.getX())} y: ${parseInt(Player.getY())} z: ${parseInt(Player.getZ())}`)
}).setCriteria("You hear a massive rumble as Thunder emerges."), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    ChatLib.say(`/pc Jawbus spawned at x: ${parseInt(Player.getX())} y: ${parseInt(Player.getY())} z: ${parseInt(Player.getZ())}`)
}).setCriteria("You have angered a legendary creature... Lore Jawbus has arrived."), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    zombieMiner++;
    ChatLib.say(`/pc Zombie Miner spawned at x: ${parseInt(Player.getX())} y: ${parseInt(Player.getY())} z: ${parseInt(Player.getZ())}`)
}).setCriteria("A Zombie Miner surfaces!"), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    ChatLib.say(`/pc Vanquisher spawned at x: ${parseInt(Player.getX())} y: ${parseInt(Player.getY())} z: ${parseInt(Player.getZ())}`)
}).setCriteria("A Vanquisher is spawning nearby!"), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    agarimoo++;
}).setCriteria("Your Chumcap Bucket trembles, it's an Agarimoo."), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    carrotKing++;
}).setCriteria("Is this even a fish? It's the Carrot King!"), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    waterWorm++;
}).setCriteria("A Water Worm surfaces!"), ()=>settings.displayRareFish);

registerWhen(register("chat", ()=>{
    poisonWorm++;
}).setCriteria("A Poisoned Water Worm surfaces!"), ()=>settings.displayRareFish);

const Keybind = new KeyBind("Start Countdown", Keyboard.KEY_NONE)

Keybind.registerKeyPress(()=>{
    new Thread(()=>{
        for(let i = parseInt(settings.fishCountDown);i>0;i--){
            ChatLib.say(`/pc ${i}`)
            Thread.sleep(1000);
        }
        ChatLib.say(`/pc GO RATS`)
        Thread.sleep(400);
        if(waterWorm != 0){
            ChatLib.say(`/pc I Caught ${waterWorm} water worms`)
            Thread.sleep(1000);
        }
        if(poisonWorm != 0){
            ChatLib.say(`/pc I Caught ${poisonWorm} poison worms`)
            Thread.sleep(1000);
        }
        if(zombieMiner != 0){
            ChatLib.say(`/pc I Caught ${zombieMiner} zombie miners`)
            Thread.sleep(1000);
        }
        if(carrotKing != 0){
            ChatLib.say(`/pc I Caught ${carrotKing} Carrot Kings`)
            Thread.sleep(1000);
        }
        if(agarimoo != 0){
            ChatLib.say(`/pc I Caught ${agarimoo} agarimoos`)
            Thread.sleep(1000);
        }
        Thread.sleep(1000);
        waterWorm = 0;
        poisonWorm = 0;
        zombieMiner = 0;
        carrotKing = 0;
        agarimoo = 0;
    }).start();
})
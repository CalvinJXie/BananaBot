import { registerWhen } from "../../utils/functions"
import settings from "../../settings";

finishedKuudra = false;
//kuudra ends
registerWhen(register("chat",()=>{
    finishedKuudra = true;
}).setCriteria("${before}Tokens Earned:${tokens}"),()=>settings.kuudraProfit)
//leave instance
registerWhen(register("worldload", () =>{
    finishedKuudra = false;
}), ()=>settings.kuudraProfit);

registerWhen(register("step", () =>{
    inv = Player.getContainer();
    if(inv == undefined) return;
    if(inv.getName().indexOf("Paid Chest") == -1) return;
}).setDelay(1), ()=>finishedKuudra);

//bz - essence, ferocious, hardend, strong, vampire, inferno, ft
//ah - all armor, wof, shards
//hardcode- enrager, tentacle dye


/*
Minion Ideas:
Rustic Minion- Eats items and produces random stuff.
Giant Minion- takes up more slots.
Pacifist Minion-
Skycoin Minion - Really shy! Only works with other Skycoin minions.
Purchase upgrades for the minion.
 */
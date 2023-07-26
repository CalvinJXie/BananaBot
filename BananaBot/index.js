import settings from "./settings"
//utils
import { setBzPrices } from "./utils/bazaarFunctions"
import { helpMsg, setRegisters, registerWhen } from "./utils/functions"
import { data } from "./utils/variables"
import { YELLOW, WHITE, BOLD, RED } from "./utils/constants"
//Kuudra
import "./features/Kuudra/KuudraProfitCalc"
//Damage calc
import "./features/DamageCalc/damageBonus"
import "./features/DamageCalc/damage"
//Garden
import "./features/Garden/Composter"
import "./features/Garden/Visitor"
import "./features/Garden/Crops"
//Coin Exchanges
import "./features/Exchanges/coinConvert"
//Trackers
import "./features/Trackers/dailyTimers"
import "./features/Trackers/Powder"
import "./features/Trackers/SkillTracker"
//Party
import "./features/Party/KuudraReparty"
import "./features/Party/Party"
import "./features/Party/PartyCommands"
import "./features/Party/RejoinDungeon"
//gui
import "./features/test"
import "./features/MoveText"
//Statistics
import "./features/Statistics/BinomialDist"
//qol features
import "./features/qol/BrokenHyp"
import "./features/qol/PickUpStash"
import "./features/qol/ItemTimer"
//Rift
import "./features/Rift/TwinClaw"
import "./features/Rift/EffigyTimer"
import "./features/Rift/VampHealth"
import "./features/Rift/BloodIchor"
import "./features/Rift/Mania"
//minions
import "./features/Minions/InfernoMinionProfit"
import "./features/Minions/MinionSpeed"
import "./features/Minions/Hypergolic"
import "./features/Minions/CalcDailyMinionProfit"
import "./features/Minions/Heavy"
//Economy
import "./features/Economy/CraftFlip"
import "./features/Economy/AuctionLoop"
import "./features/Economy/BazaarNotifier"
//Slayer
import "./features/Slayer/calcProfit"
import "./features/Slayer/SlayerKillTime"
import { setPages, updateAhPrices } from "./utils/auctionFunctions"

data.autosave();

//registers command to open settings gui
const guiKeyBind = new KeyBind("BananaBot Gui", Keyboard.KEY_NONE)
guiKeyBind.registerKeyPress(()=>settings.openGUI())

register("command", () => settings.openGUI()).setName("banana").setAliases("bb");
register("guiClosed", () => setRegisters());

welcomeMsg = `${YELLOW}${BOLD}/bbhelp ${WHITE}if you need help with commands
${YELLOW}${BOLD}/banana ${WHITE}to open the settings menu.
${YELLOW}${BOLD}/bbgui ${WHITE}to move gui positions.
`
//when chat trigger reloaded command
register("gameLoad", () => {
  setRegisters();
  ChatLib.chat(welcomeMsg);
});
//when joining hypixel
register("chat", () => {
  setRegisters();
  setBzPrices();
  ChatLib.chat(welcomeMsg);
}).setCriteria("Welcome to Hypixel SkyBlock!");

//command to show help commands
register("command", () => ChatLib.chat(helpMsg)).setName("bbhelp");

todoList = `Todo:
Chest profit calc
Alter ah search to look for attribute prices
calc pet exp to coin
calc armor upgrade price
tax calculator
shen tracker
jerry box calc
Leet Code :)
`
register("command", () => ChatLib.chat(todoList)).setName("todo");

registerWhen(register("step", ()=>{
  setBzPrices();
  setPages();
  updateAhPrices();
}).setDelay(900), ()=>settings.autoUpdate);

register("command", () => {
  updateAhPrices();
  ChatLib.chat("Auction prices updated");
}).setName("uah");

register("command", () => {
  setBzPrices();
  ChatLib.chat("Bz prices updated");
}).setName("ubz");

register("worldload", () =>{
  setTimeout(()=>{
    tablist = TabList.getNames();
    if(tablist == null)return;
    area = tablist.find((tab)=> tab.indexOf("Area:") != -1);
    if(area){
      data.world = area.removeFormatting().substring(area.indexOf("Area:"), area.length)
    }
  },2000)
})
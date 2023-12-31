import settings from "./settings"
//utils
import { setBzPrices, setBzItems } from "./utils/bazaarFunctions"
import { setRegisters, registerWhen } from "./utils/functions"
import { data } from "./utils/variables"
import { YELLOW, WHITE, BOLD, LOGO, helpMsg } from "./utils/constants"
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
import "./features/Trackers/trackSeaCreatures"
import "./features/Trackers/trackBestiary"
import "./features/Trackers/mobsKilled"
import "./features/Trackers/dailyTimers"
import "./features/Trackers/Powder"
import "./features/Trackers/SkillTracker"
//Party
import "./features/Party/Party"
import "./features/Party/PartyCommands"
//dungeons
import "./features/Dungeons/terminals"
//Beacon
import "./features/Beacon/waypoints"
import "./features/Beacon/rareMobs"
//Gui
import "./features/test"
import { moveText } from "./features/MoveText"
//Statistics
import "./features/Statistics/BinomialDist"
//qol features
import "./features/qol/copyToClipboard"
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
import "./features/Economy/displayItemCost"
//Slayer
import "./features/Slayer/calcGhost"
import "./features/Slayer/calcProfit"
import "./features/Slayer/SlayerKillTime"

data.autosave();

//registers command to open settings gui
const guiKeyBind = new KeyBind("BananaBot Gui", Keyboard.KEY_NONE)
guiKeyBind.registerKeyPress(()=>settings.openGUI())

register("command", (args) => {
  switch(args){
    case "help":
      ChatLib.chat(helpMsg)
      break;
    case "gui":
      moveText.open();
      break;
    default:
      settings.openGUI()
      break;
  }
}).setName("banana").setAliases("bb");
register("guiClosed", () => setRegisters());

welcomeMsg = `${LOGO}${YELLOW}${BOLD}/banana or /bb ${WHITE}to open the settings menu.
${LOGO}${YELLOW}${BOLD}/bbhelp ${WHITE}if you need help with commands
${LOGO}${YELLOW}${BOLD}/bbgui ${WHITE}to move gui positions.
`
//when chat trigger reloaded command
register("gameLoad", () => {
  setRegisters();
  setBzItems();
  data.save();
  ChatLib.chat(welcomeMsg);
});
//when joining hypixel
register("chat", () => {
  setBzItems();
  setRegisters();
  setBzPrices();
  ChatLib.chat(welcomeMsg);
  findWorld();
}).setCriteria("Welcome to Hypixel SkyBlock!");

//command to show help commands
register("command", () => ChatLib.chat(helpMsg)).setName("bbhelp");

registerWhen(register("step", ()=>{
  setBzPrices();
}).setDelay(600), ()=>settings.autoUpdateBz);

register("command", () => {
  setBzPrices();
  ChatLib.chat(LOGO + "Bz prices updated");
}).setName("ubz");

register("chat", () =>{
  findWorld();
}).setCriteria("You are playing on profile: ${fruit}")

register("gameUnload",()=>findWorld())

register("worldLoad",()=>findWorld())

data.world = "";

register("ServerDisconnect", ()=>{data.world = "";})

register("ServerConnect", ()=>{data.world = ""})

register("chat", ()=>{data.world = ""}).setCriteria("${player} joined the lobby!")

function findWorld(){
  if(Server.getIP() != "hypixel.net") {
    data.world = "";
    return;
  }
  tablist = null;
  tablist = TabList.getNames();
    if(tablist == null){
      ChatLib.chat("not a world")
      data.world = "";
      return;
    }
    area = tablist.find((tab)=> tab.indexOf("Area:") != -1);
    if(area){
      data.world = area.removeFormatting().substring(area.indexOf("Area:"), area.length)
    }else{
      data.world = "";
    }
}

todoList = `Todo:
calc pet exp to coin

shen tracker
shen special tracker

change skills to a class maybe?

garden copper total / visitor / data store in userdata

statistical analysis of attribute crafting profit

dugeon chest profit

chili to collection/actions to chili
add args to /gaba for total craft
`
register("command", () => ChatLib.chat(todoList)).setName("todo");
register("command", () => ChatLib.chat(data.world)).setName("ww");
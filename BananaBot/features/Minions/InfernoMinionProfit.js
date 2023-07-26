import settings from "../../settings";
import { GREEN, GRAY, RED, DARK_RED, DARK_GREEN, BLUE, AQUA, DARK_GRAY, YELLOW } from '../../utils/constants';
import { totalMinionSpeed, calculateTotalDayActions, totalMinions, formatDouble, readJson } from "../../utils/functions";

//amount of actions needed on average to drop an item
const chili = 156
const vertex = 16364
const apex = 1570909
const pepper = 458182
const fish = 3927273
//30% boost from eyedrop
const eyeDrop = 1.3
//hypergolic craft recipe
const eCoal = 2404
const eSul = 150.25
const gaba = 13824
//additional hypergolic items
const fuelBlock = 2;
const dist = 6;
const hydraHead = 0.5;

//total minions user inputs
totalMinion = totalMinions();
minionActions = totalMinionSpeed()

function calculate(){
  priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
  priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;

  profitChili = minionActions/(chili/eyeDrop) * priceSellOffer["CHILI_PEPPER"];
  profitVertex = minionActions/(vertex/eyeDrop) * priceSellOffer["INFERNO_VERTEX"];
  profitPepper = minionActions/(pepper/eyeDrop) * priceSellOffer["REAPER_PEPPER"];
  profitGabagool = minionActions * priceSellOffer["CRUDE_GABAGOOL"];
  lossGabagool = priceBuyOrder["CRUDE_GABAGOOL"]*gaba;
  lossCoal = priceBuyOrder["ENCHANTED_COAL"]*eCoal;
  lossSul = priceBuyOrder["ENCHANTED_SULPHUR"]*eSul;
  lossDist = priceBuyOrder["CRUDE_GABAGOOL_DISTILLATE"]*dist;
  lossFuelBlocks = priceBuyOrder["INFERNO_FUEL_BLOCK"]*fuelBlock;
  lossEyeDrops = hydraHead*parseFloat(settings.costHydra)*1000000

  let profitApex = minionActions/(apex/eyeDrop) * (parseInt(settings.apex) * 1000000000);
  let profitFish = minionActions/(fish/eyeDrop) * (parseInt(settings.gabaFish) * 1000000);
  let totalProfit = profitChili + profitVertex + profitPepper + profitGabagool + profitApex + profitFish;
  let costHypergolic = lossGabagool+lossCoal+lossSul+lossDist+lossEyeDrops+lossFuelBlocks
  let totalLoss = costHypergolic*totalMinion
  let netTotal = totalProfit-totalLoss
  ChatLib.chat(`${YELLOW}Hypergolic Craft:`)
  ChatLib.chat(`${GRAY}Cost of ${DARK_GRAY}Coal: ${DARK_RED}${formatDouble(lossCoal)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Gabagool: ${DARK_RED}${formatDouble(lossGabagool)}`)
  ChatLib.chat(`${GRAY}Cost of ${YELLOW}Sulphur: ${DARK_RED}${formatDouble(lossSul)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Gabagool Distillite: ${DARK_RED}${formatDouble(lossDist)}`)
  ChatLib.chat(`${GRAY}Cost of ${BLUE}Hydra Heads: ${DARK_RED}${formatDouble(lossEyeDrops)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Inferno Fuel Block: ${DARK_RED}${formatDouble(lossFuelBlocks)}`)
  ChatLib.chat(`${GRAY}Cost of ${AQUA}Hypergolic: ${DARK_RED}${formatDouble(costHypergolic)}`)

  ChatLib.chat(`\n${YELLOW}Average drops per day with ${formatDouble(minionActions)} minion action per day`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(minionActions/(chili/eyeDrop))} ${GRAY}chili peppers`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(minionActions/(vertex/eyeDrop))} ${GRAY}vertexes`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(minionActions/(apex/eyeDrop))} ${GRAY}apexes or 1 every ${GREEN}${formatDouble(1/(minionActions/(apex/eyeDrop)))} days`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(minionActions/(pepper/eyeDrop))} ${GRAY}reaper peppers or 1 every ${GREEN}${formatDouble(1/(minionActions/(pepper/eyeDrop)))} days`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(minionActions/(fish/eyeDrop))} ${GRAY}gabagool the fishes or 1 every ${GREEN}${formatDouble(1/(minionActions/(fish/eyeDrop)))} days`)

  ChatLib.chat(`\n${YELLOW}Total Profit Per Day On Average:`)
  ChatLib.chat(`${GRAY}Profit from gabagool (using gabagool distillite): ${DARK_GREEN}${formatDouble(profitGabagool)}`)
  ChatLib.chat(`${GRAY}Profit from chili peppers: ${DARK_GREEN}${formatDouble(profitChili)}`)
  ChatLib.chat(`${GRAY}Profit from vertexes: ${DARK_GREEN}${formatDouble(profitVertex)}`)
  ChatLib.chat(`${GRAY}Profit from reaper pepper: ${DARK_GREEN}${formatDouble(profitPepper)}`)
  ChatLib.chat(`${GRAY}Profit from apex: ${DARK_GREEN}${formatDouble(profitApex)}`)
  ChatLib.chat(`${GRAY}Profit from gabagool the fish: ${DARK_GREEN}${formatDouble(profitFish)}`)
  ChatLib.chat(`${GRAY}Profit gained from all drops: ${DARK_GREEN}${formatDouble(totalProfit)}`)

  ChatLib.chat(`${GRAY}Money spent on ${totalMinion} hypergolics: ${DARK_RED}${formatDouble(totalLoss)}`)
  ChatLib.chat(`${GRAY}On average you make: ${GREEN}${formatDouble(netTotal)} a day`)
}

register("command", () => calculate()).setName("hyper");

register("command", (args) =>{
  statsSpeed = calculateTotalDayActions(args, 1)
  statsChili = statsSpeed/(chili/eyeDrop)
  statsVertex = statsSpeed/(vertex/eyeDrop)
  ChatLib.chat(`${GRAY}Minion creates ${YELLOW}${formatDouble(statsChili)} ${GRAY}chili peppers a day`)
  ChatLib.chat(`${GRAY}Minion creates ${YELLOW}${statsSpeed}/${vertex/eyeDrop} ${formatDouble(statsVertex)} ${GRAY}vertexes a day`)
  ChatLib.chat(`${GRAY}Minion should create ${YELLOW}${195*statsVertex} ${GRAY}vertexes in 195 days`)
}).setName("minstats")
import settings from "../../settings";
import { GREEN, GRAY, RED, DARK_RED, DARK_GREEN, BLUE, AQUA, DARK_GRAY, YELLOW } from '../../utils/constants';
import { totalMinionSpeed, calculateTotalDayActions, totalMinions, formatDouble, readJson } from "../../utils/functions";

//amount of actions needed on average to drop an item
const chili = 156/1.15
const vertex = 16364/2.8
const apex = 1570909/1.2
const pepper = 458182
const fish = 3927273
//30% boost from eyedrop
const eyeDrop = 1.3
//hypergolic craft recipe
const eCoal = 1202
const eSul = 75.125
const gaba = 6912
//additional hypergolic items
const fuelBlock = 2;
const dist = 6;

//total minions user inputs
totalMinion = totalMinions();
minionActions = totalMinionSpeed()

function calculate(){
  priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
  priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;

  // amount dropped by minionActions
  chiliRate = minionActions/(chili/eyeDrop);
  vertexRate = minionActions/(vertex/eyeDrop);
  pepperRate = minionActions/(pepper/eyeDrop);
  apexRate = minionActions/(apex/eyeDrop);
  fishRate = minionActions/(fish/eyeDrop);

  // Profit calc
  profitGabagool = minionActions * priceSellOffer["CRUDE_GABAGOOL"];
  profitChili = chiliRate * priceSellOffer["CHILI_PEPPER"];
  profitVertex = vertexRate * priceSellOffer["INFERNO_VERTEX"];
  profitPepper = pepperRate * priceSellOffer["REAPER_PEPPER"];
  profitApex = apexRate * (parseInt(settings.apex) * 1000000000);
  profitFish = fishRate * (parseInt(settings.gabaFish) * 1000000);
  totalProfit = profitChili + profitVertex + profitPepper + profitGabagool + profitApex + profitFish;

  // Loss calc
  lossGabagool = priceBuyOrder["CRUDE_GABAGOOL"]*gaba;
  lossCoal = priceBuyOrder["ENCHANTED_COAL"]*eCoal;
  lossSul = priceBuyOrder["ENCHANTED_SULPHUR"]*eSul;
  lossDist = priceBuyOrder["CRUDE_GABAGOOL_DISTILLATE"]*dist;
  lossFuelBlocks = priceBuyOrder["INFERNO_FUEL_BLOCK"]*fuelBlock;
  lossEyeDrops = (parseFloat(settings.costHydra)*1000000 + 128*priceSellOffer["ENCHANTED_CARROT"] + 4*priceSellOffer["CHILI_PEPPER"] + 128*priceSellOffer["EXPORTABLE_CARROTS"])/3

  costHypergolic = lossGabagool+lossCoal+lossSul+lossDist+lossEyeDrops+lossFuelBlocks;// calculates entire price of a fuel
  totalLoss = costHypergolic*totalMinion;// total lost per minion

  //net total
  netTotal = totalProfit-totalLoss;

  //chat message prints
  ChatLib.chat(`${YELLOW}Hypergolic Craft:`)
  ChatLib.chat(`${GRAY}Cost of ${DARK_GRAY}Coal: ${DARK_RED}${formatDouble(lossCoal)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Gabagool: ${DARK_RED}${formatDouble(lossGabagool)}`)
  ChatLib.chat(`${GRAY}Cost of ${YELLOW}Sulphur: ${DARK_RED}${formatDouble(lossSul)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Gabagool Distillite: ${DARK_RED}${formatDouble(lossDist)}`)
  ChatLib.chat(`${GRAY}Cost of ${BLUE}1 Eyedrop: ${DARK_RED}${formatDouble(lossEyeDrops)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Inferno Fuel Block: ${DARK_RED}${formatDouble(lossFuelBlocks)}`)
  ChatLib.chat(`${GRAY}Cost of ${AQUA}Hypergolic: ${DARK_RED}${formatDouble(costHypergolic)}`)

  ChatLib.chat(`\n${YELLOW}Average drops per day with ${formatDouble(minionActions)} minion action per day`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(chiliRate)} ${GRAY}chili peppers`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(vertexRate)} ${GRAY}vertexes`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(apexRate)} ${GRAY}apexes or 1 every ${GREEN}${formatDouble(1/apexRate)} days`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(pepperRate)} ${GRAY}reaper peppers or 1 every ${GREEN}${formatDouble(1/pepperRate)} days`)
  ChatLib.chat(`${GRAY}On average you get: ${GREEN}${formatDouble(fishRate)} ${GRAY}gabagool the fishes or 1 every ${GREEN}${formatDouble(1/fishRate)} days`)

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
import { GREEN, GRAY, RED, DARK_RED, DARK_GREEN, AQUA, DARK_GRAY, YELLOW } from '../../utils/constants';
import { totalMinionSpeed, totalMinions, formatDouble } from "../../utils/functions";
import { readJson } from '../../utils/functions';

//heavy gabagool craft cost
const gaba = 576
const eSul= 6.25
const eCoal = 100
const fuelBlock = 2;
const dist = 6;

minionActions = totalMinionSpeed();
totalMinion = totalMinions();

function calculate(){
  priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
  priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;
  profitGabagool = minionActions * priceSellOffer["CRUDE_GABAGOOL"];
  lossGabagool = priceBuyOrder["CRUDE_GABAGOOL"]*gaba;
  lossCoal = priceBuyOrder["ENCHANTED_COAL"]*eCoal;
  lossSul = priceBuyOrder["ENCHANTED_SULPHUR"]*eSul;
  lossDist = priceBuyOrder["CRUDE_GABAGOOL_DISTILLATE"]*dist;
  lossFuelBlock = priceBuyOrder["INFERNO_FUEL_BLOCK"]*fuelBlock;
  costHeavy = lossGabagool+lossCoal+lossSul+lossDist+lossFuelBlock
  totalLoss = costHeavy*totalMinion
  netTotal = profitGabagool-totalLoss
  ChatLib.chat(`${YELLOW}Heavy Gabagool Craft:`)
  ChatLib.chat(`${GRAY}Cost of ${DARK_GRAY}Coal: ${DARK_RED}${formatDouble(lossCoal)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Gabagool: ${DARK_RED}${formatDouble(lossGabagool)}`)
  ChatLib.chat(`${GRAY}Cost of ${YELLOW}Sulphur: ${DARK_RED}${formatDouble(lossSul)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Gabagool Distillite: ${DARK_RED}${formatDouble(lossDist)}`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Inferno Fuel Block: ${DARK_RED}${formatDouble(lossFuelBlock)}`)
  ChatLib.chat(`${GRAY}Cost of 1 ${AQUA}Heavy Gabagool: ${DARK_RED}${formatDouble(costHeavy)}`)
  ChatLib.chat(`${GRAY}Cost of ${totalMinion} ${AQUA}Heavy Gabagool: ${DARK_RED}${formatDouble(costHeavy*totalMinion)}`)

  ChatLib.chat(`\n${YELLOW}Total Profit Per Day On Average:`)
  ChatLib.chat(`${GRAY}Total Minion Actions per day: ${DARK_GREEN}${formatDouble(minionActions)}`)
  ChatLib.chat(`${GRAY}Profit from gabagool (using gabagool distillite): ${DARK_GREEN}${formatDouble(profitGabagool)}`)
  ChatLib.chat(`${GRAY}Loss from fueling: ${DARK_RED}${formatDouble(totalLoss)}`)
  ChatLib.chat(`${GRAY}Net Profit That you make per day: ${GREEN}${formatDouble(netTotal)}`)
}

register("command", ()=>calculate()).setName("heavy")
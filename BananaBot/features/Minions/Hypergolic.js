import { formatDouble } from '../../utils/functions';
import { GREEN, GRAY, RED, DARK_GREEN, BLUE, AQUA, DARK_GRAY, YELLOW, LIGHT_PURPLE } from '../../utils/constants'
import { readJson } from '../../utils/functions';
//hypergolic craft recipe
const eCoal = 1202
const eSul = 75.125
const gaba = 6912

//calculates price of each neede item
function calculateHypergolic(){
  priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer;
  priceBuyOrder = readJson("data", "bazaarPrice.json").price.buyOrder;
  costGabagool = priceBuyOrder["CRUDE_GABAGOOL"]*gaba;
  costCoal = priceBuyOrder["ENCHANTED_COAL"]*eCoal;
  costSul = priceBuyOrder["ENCHANTED_SULPHUR"]*eSul;
  instaSellHypergolic = priceBuyOrder["HYPERGOLIC_GABAGOOL"];
  instaBuyHypergolic = priceSellOffer["HYPERGOLIC_GABAGOOL"];
  let costHypergolic = costGabagool+costCoal+costSul
  ChatLib.chat(`${YELLOW}Hypergolic Craft Recipe:`)
  ChatLib.chat(`${DARK_GRAY}Coal: ${eCoal}`)
  ChatLib.chat(`${RED}Gabagool: 6912`)
  ChatLib.chat(`${YELLOW}Sulphur: ${eSul}\n`)
  ChatLib.chat(`${YELLOW}Hypergolic Craft buy order cost:`)
  ChatLib.chat(`${GRAY}Cost of ${RED}Gabagool (${formatDouble(costGabagool/gaba)}): ${GREEN}${formatDouble(costGabagool)}`)
  ChatLib.chat(`${GRAY}Cost of ${DARK_GRAY}Coal (${formatDouble(costCoal/eCoal)}): ${GREEN}${formatDouble(costCoal)}`)
  ChatLib.chat(`${GRAY}Cost of ${YELLOW}Sulphur: ${GREEN}${formatDouble(costSul)}`)
  ChatLib.chat(`${GRAY}Cost of ${AQUA}Hypergolic: ${DARK_GREEN}${formatDouble(costHypergolic)}\n`)
  ChatLib.chat(`${YELLOW}Bazaar cost of hypergolic:`)
  ChatLib.chat(`${BLUE}Insta Sell Price: ${LIGHT_PURPLE}${formatDouble(instaSellHypergolic)}`)
  ChatLib.chat(`${BLUE}Profit Insta Selling (With ${RED}1.25% ${BLUE}tax): ${LIGHT_PURPLE}${formatDouble(.9875*(instaSellHypergolic-costHypergolic))}`)
  ChatLib.chat(`${BLUE}Profit Insta Selling (With ${RED}1.125% ${BLUE}tax): ${LIGHT_PURPLE}${formatDouble(.98875*(instaSellHypergolic-costHypergolic))}`)
  ChatLib.chat(`${BLUE}Profit Insta Selling (With ${RED}1% ${BLUE}tax): ${LIGHT_PURPLE}${formatDouble(.99*(instaSellHypergolic-costHypergolic))}`)
  ChatLib.chat(`${DARK_GREEN}Insta Buy Price: ${AQUA}${formatDouble(instaBuyHypergolic)}`)
  ChatLib.chat(`${DARK_GREEN}Profit Sell Offering (With ${RED}1.25% ${DARK_GREEN}tax): ${AQUA}${formatDouble(.9875*(instaBuyHypergolic-costHypergolic))}`)
  ChatLib.chat(`${DARK_GREEN}Profit Sell Offering (With ${RED}1.125% ${DARK_GREEN}tax): ${AQUA}${formatDouble(.98875*(instaBuyHypergolic-costHypergolic))}`)
  ChatLib.chat(`${DARK_GREEN}Profit Sell Offering (With ${RED}1% ${DARK_GREEN}tax): ${AQUA}${formatDouble(.99*(instaBuyHypergolic-costHypergolic))}`)
}

register("command", ()=>calculateHypergolic()).setName("gaba");

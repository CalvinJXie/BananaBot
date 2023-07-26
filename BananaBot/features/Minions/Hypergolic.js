import { formatDouble } from '../../utils/functions';
import { GREEN, GRAY, RED, DARK_GREEN, BLUE, AQUA, DARK_GRAY, YELLOW, LIGHT_PURPLE } from '../../utils/constants'

//hypergolic craft recipe
const eCoal = 2404
const eSul = 150.25
const gaba = 13824

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
  ChatLib.chat(`${DARK_GRAY}Coal: 2404`)
  ChatLib.chat(`${RED}Gabagool: 13824`)
  ChatLib.chat(`${YELLOW}Sulphur: 150.25\n`)
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

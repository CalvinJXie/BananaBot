import { findName, findID } from "../../utils/bazaarFunctions"
import { YELLOW, GOLD, WHITE, GREEN, RED, AQUA } from "../../utils/constants"
import { sortDictAsc, formatDouble, readJson } from "../../utils/functions"

const copperAh = readJson("features/Exchanges", "conversion.json").copperAh
const copperBz = readJson("features/Exchanges", "conversion.json").copperBz
const bitsAh = readJson("features/Exchanges", "conversion.json").bitsAh
const bitsBz = readJson("features/Exchanges", "conversion.json").bitsBz

function calcExchange(ahDict, bzDict, type){
  priceSellOffer = readJson("data", "bazaarPrice.json").price.sellOffer
  ahPrice = readJson("data", "auctionPrice.json")
  coinExchange = {}
  Object.keys(ahDict).forEach((item)=>{
    if(ahPrice[item]){
      coinExchange[item] = (ahPrice[item])/ahDict[item];
      ChatLib.chat(`${GOLD}${item}${WHITE}: (${GREEN}${formatDouble(ahPrice[item])} ${GOLD}coins${WHITE}, ${GREEN}${ahDict[item]} ${type}${WHITE})`)
    }else{
      ChatLib.chat(`${YELLOW}Found no active auctions for ${item}. If there are multiple items that do not seem correct do /uah.`)
    }
  })
  Object.keys(bzDict).forEach((item) => {
    item = findID(item);
    newItem = findName(item);
    coinExchange[newItem] = (priceSellOffer[item])/bzDict[newItem];
    ChatLib.chat(`${GOLD}${newItem}${WHITE}: ( ${GREEN}${formatDouble(priceSellOffer[item])} ${GOLD}coins${WHITE}, ${GREEN}${bzDict[newItem]} ${type}${WHITE})`)
  })
  coinExchange = sortDictAsc(coinExchange);
  Object.keys(coinExchange).forEach((item) =>{
      ChatLib.chat(`${GOLD}${item}${WHITE}: ${GREEN}${formatDouble(coinExchange[item])}`)
  })
}

register("command", () =>calcExchange(copperAh, copperBz, `${RED}copper`)).setName("copper")
register("command", () =>calcExchange(bitsAh, bitsBz, `${AQUA}bits`)).setName("bits")
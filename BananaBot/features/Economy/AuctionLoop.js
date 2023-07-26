import settings from "../../settings"
import request from "../../../requestV2";
import { RED, BLUE, YELLOW, BOLD } from "../../utils/constants";
import { registerWhen } from "../../utils/functions";

const AUCTION_ENDPOINT = 'https://api.hypixel.net/skyblock/auctions?page=0';
const m = 1000000;

let lastUuid = null;

function lbin(price) {
  let head = {};
  request({
    url: AUCTION_ENDPOINT,
    json: true
  }).then((response) =>{
    let auctions = response.auctions;
    
    for (let i = 0; i < auctions.length; i++) {
      let auction = auctions[i];
      if (auction.bin && auction.item_name.includes(settings.AuctionItem) && auction.item_lore.includes(settings.AuctionItemLore)) {
        head[auction.uuid] = auction.starting_bid;
      }
    }
    if (Object.keys(head).length) {
      if (Math.min(...Object.values(head)) <= price) {
        let uuid = Object.keys(head).find(key => head[key] === Math.min(...Object.values(head)));
        if (uuid !== lastUuid) {
          ChatLib.chat(`${RED}${BOLD}/viewauction ${uuid}`);
          ChatLib.chat(`${BLUE}${BOLD}${settings.AuctionItem} worth ${(Math.min(...Object.values(head)) / m).toFixed(2)}m`);
          lastUuid = uuid;
        }
      }
    }
  }).catch((error) => {
    console.error(error)
  })
}

registerWhen(register("step", () => {
    if(!settings.loopAuction) return;
    let price = settings.AuctionPrice;
    price = price * m
    ChatLib.chat(`${YELLOW}${BOLD}Auction Loop still going`)
    lbin(price);
}).setDelay(settings.loopTimer), () => settings.loopAuction)

import settings from "../../settings"
import request from "../../../requestV2";
import { RED, BLUE, YELLOW, BOLD, GREEN, LOGO, GRAY } from "../../utils/constants";
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

function findAh(pages, price, itemName, itemLore){
  pagesChecked = 0;
  price *= 1000000
  for(let p = 0;p<=pages;p++){
    apiAh = `https://api.hypixel.net/skyblock/auctions?page=${p}`
    request({
      url: apiAh,
      json: true
    }).then((response)=>{
      pagesChecked++;
      let auctions = response.auctions;
      for(let i = 0;i<auctions.length;i++){
        let auction = auctions[i];
        item = auction.item_name.toLowerCase();
        function displayAuctions(items, lores){
          items = items.toLowerCase().replace(/_/g, " ");
          if(auction.bin && auction.starting_bid <= price && item.includes(items)){
            if(lores != undefined){
              lore = auction.item_lore.toLowerCase();
              lores = lores.toLowerCase().replace(/_/g, " ");
              if(lore.includes(lores)){
                ChatLib.chat(`\n${LOGO}${YELLOW}Item: ${auction.item_name}`)
                ChatLib.chat(`\n${LOGO}${YELLOW}Lore: ${lores}`)
                ChatLib.chat(`${LOGO}${YELLOW}Price: ${auction.starting_bid}`)
                new TextComponent(`${LOGO}${GREEN}[VIEW]`).setClick("run_command", `/viewauction ${auction.uuid}`).chat();
              }
            }else{
              ChatLib.chat(`\n${LOGO}${YELLOW}Item: ${auction.item_name}`)
              ChatLib.chat(`${LOGO}${YELLOW}Price: ${auction.starting_bid}`)
              new TextComponent(`${LOGO}${GREEN}[VIEW]`).setClick("run_command", `/viewauction ${auction.uuid}`).chat();
            }
          }
        }
        if(typeof itemName === "object" && typeof itemLore === "object"){
          itemName.forEach((searchItem)=>{
            itemLore.forEach((searchLore)=>{
              displayAuctions(searchItem, searchLore);
            })
          })
        }else if(typeof itemName === "object"){
          itemName.forEach((searchItem)=>{
            displayAuctions(searchItem, itemLore)
          })
        }else if(typeof itemLore === "object"){
          itemLore.forEach((searchLore)=>{
            displayAuctions(itemName, searchLore)
          })
        }else{
          displayAuctions(itemName, itemLore);
        }
      }
      if(pagesChecked == pages){
        ChatLib.chat(`${LOGO}${YELLOW}Finished searching for your item.`)
      }
    }).catch((error)=>{
      console.error("error")
      console.error(JSON.stringify(error,false,2))
    })
  }
}

register("command", (...args)=>{
  if(args[3]){
    args[2] = args[2].replace(/_/g, " ");
    args[3] = args[3].replace(/_/g, " ");
    findAh(args[0], args[1], args[2], args[3])
  }else if(args[2]){
    args[2] = args[2].replace(/_/g, " ");
    findAh(args[0], args[1], args[2])
  }else{
    ChatLib.chat(`${LOGO}${YELLOW}/ahf <page> <price> <item name> <item lore>`)
    ChatLib.chat(`${LOGO}${YELLOW}Put price in millions 3 = 3,000,000. Item lore is optional. Page is just the amount of pages you want to search. 
${LOGO}There are usually 50 auction pages. /ahpages to see max pages you can input.`)
    ChatLib.chat(`${LOGO}${YELLOW}For item names that are more than 1 word replace the spaces with an underscore`)
  }
}).setName("ahf")

register("command", (args)=>{
  if(args == undefined){
    ChatLib.chat(`${LOGO}${YELLOW}Available Args: mf, (lf/fort)`)
  }
  items =  ["molten_belt", "molten_bracelet"];
  if(args == "mfv"){
    lore = "magic_find_V"
    findAh(58, 15, "molten_belt", lore);
  }else if(args == "mfiv"){
    lore = "magic_find_IV"
    findAh(58, 8, "molten_belt", lore);
  }else if(args == "lfv"){
    lore = ["lifeline_V", "fortitude_V"];
    findAh(58, 4, items, lore);
  }else if(args == "lfiv"){
    lore = ["lifeline_IV", "fortitude_IV"];
    findAh(58, 2, item, lore)
  }else{
    ChatLib.chat(`${LOGO}${YELLOW}Available Args: mfv, mfiv, lfv lfiv`)
  }
}).setName("aah")

register("command", ()=>{
  request({
    url: 'https://api.hypixel.net/skyblock/auctions',
    json: true
  }).then((response)=>{
    ChatLib.chat(`${LOGO}${YELLOW}Total Pages: ${response.totalPages}`)
  })
}).setName("ahpages")
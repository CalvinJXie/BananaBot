import request from "../../requestV2";
import { readJson, writeJson } from "./functions";
import { data } from "./variables";

export function setPages(){
  const pages = `https://api.hypixel.net/skyblock/auctions`;
  request({
    url: pages,
    json: true
  }).then((response) => {
      data.totalPages = response.totalPages
      console.log(`Updated Pages: ${data.totalPages}`)
  }).catch((error)=>{
    console.error(error)
  })
}

const ahDict = readJson("data", "auction.json")["items"]

function findMinPrice(dict) {
  Object.keys(dict).forEach((item)=>{
      let minPrice = Number.MAX_SAFE_INTEGER;
      let minUUID = null;
      Object.keys(dict[item]).forEach((uuid)=>{
          const price = dict[item][uuid];
          if (price < minPrice) {
              minPrice = price;
              minUUID = uuid;
          }
      })
      priceDict[item] = {"uuid": minUUID, "price": minPrice}
  })
  writeJson("data", "auctionPrice.json", priceDict);
}

export function updateAhPrices(){
    newDict = {}
    pagesChecked = 0;
    for(let p = 0;p<data.totalPages;p++){
        const AH = 'https://api.hypixel.net/skyblock/auctions?page='+p;
        request({
            url: AH,
            json:true
        }).then((response)=>{
            let auctions = response.auctions;
            for(let i = 0;i<auctions.length;i++){
                let auction = auctions[i];
                if(auction.bin){
                    itemName = auction.item_name.toLowerCase();
                    Object.keys(ahDict).forEach((item)=>{     
                        if(itemName.includes(item.toLowerCase())){
                            if(newDict[item] == undefined || newDict[item]>auction.starting_bid){
                                newDict[item] = auction.starting_bid;
                            }
                        }
                    })
                }
            }
            pagesChecked++;
            if(pagesChecked == data.totalPages){
                console.log(`Finished searching ${pagesChecked} pages from auction house`)
                writeJson("data", "auctionPrice.json", newDict);
            }
        }).catch((error) =>{
            console.error(`Failed on page ${p}`)
            console.error(JSON.stringify(error, false,2))
            if(pagesChecked == data.totalpages){
                setPages();
            }
            ChatLib.chat("An error occured while searching auction please try again.")
        })
    }
}

/*
lore = ahDict[item].lore
if(lore != undefined){
    if(lore != undefined && lore[1]){
        if(auction.item_lore.toLowerCase().includes(lore[1].toLowerCase()) && auction.item_lore.toLowerCase().includes(lore[0].toLowerCase())){
            loreName = `${lore[0]} ${lore[1]} ${item}`
            if(newDict[loreName]){
                newDict[loreName][auction.uuid] = auction.starting_bid;
            }else{
                newDict[loreName] = {[auction.uuid]:auction.starting_bid};
            }
        }
    }else{
        if(auction.item_lore.toLowerCase().includes(lore[0].toLowerCase())){
            loreName = `${lore[0]} ${item}`
            if(newDict[loreName]){
                newDict[loreName][auction.uuid] = auction.starting_bid;
            }else{
                newDict[loreName] = {[auction.uuid]:auction.starting_bid};
            }
        }
    }
}else{
    
}
*/
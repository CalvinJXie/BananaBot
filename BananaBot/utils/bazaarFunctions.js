import request from '../../requestV2';
import axios from '../../axios';
import { writeJson } from './functions';
import { LOGO, RED } from './constants';

const BZ_API = 'https://api.hypixel.net/skyblock/bazaar';
export const myBzApi = 'http://bananabot.pythonanywhere.com/bazaar'
let bzItems;

export function setBzItems(){
  axios.get(myBzApi).then((response)=>{
    bzItems = response.data.bazaarNames
  }).catch((error)=>{
    ChatLib.chat(`${LOGO}${RED}Bazaar api error`)
    console.log(JSON.stringify(error, false, 2))
  })
}

export function setBzPrices(){
  newDict={"price":{"sellOffer":{}, "buyOrder":{}}};
  request({
    url: BZ_API,
    json: true
  }).then((response)=>{
    const products = response.products;
    Object.keys(bzItems).forEach((item)=>{
      item = bzItems[item];
      if(products[item].buy_summary[0] == undefined || products[item].sell_summary[0] == undefined){
        console.error(`No offers for ${item}`)
        if(item.includes("CHIMERA") || item.includes("FATAL") || item.includes("DIVINE")){
          tier = parseInt(item.substring(item.length-1, item.length))-1
          sellOfferPrice = Math.pow(2, tier)*products[item.substring(0,item.length-1)+"1"].buy_summary[0].pricePerUnit;
          buyOrderPrice = Math.pow(2, tier)*products[item.substring(0,item.length-1)+"1"].sell_summary[0].pricePerUnit;
        }else{
          sellOfferPrice = 0;
          buyOrderPrice = 0;
        }
      }else{
        sellOfferPrice = products[item].buy_summary[0].pricePerUnit;
        buyOrderPrice = products[item].sell_summary[0].pricePerUnit;
      }
      newDict.price.sellOffer[item] = sellOfferPrice;
      newDict.price.buyOrder[item] = buyOrderPrice;
    })
    writeJson("data", "bazaarPrice.json", newDict);
  }).catch((error)=>{
    console.error(error);
  })
}

export function findName(search) {
  //searches uuid, returns item name no spaces
  const bzItemsReverseMap = new Map(Object.entries(bzItems).map(([key, value]) => [value, key]));

  return bzItemsReverseMap.get(search) || search;
}

export function findID(search) {
  //finds correct UUID for an item
  const bzItemsMap = new Map(Object.entries(bzItems).map(([key, value]) => [key.toLowerCase().replace(/_/g, " "), value]));

  const searchKey = search.toLowerCase().replace(/_/g, " ");
  if (bzItemsMap.has(searchKey)) {
    return bzItemsMap.get(searchKey);
  }

  let foundItem = search;
  let found = false;
  bzItemsMap.forEach((value, key) => {
    if (!found && key.indexOf(searchKey) !== -1) {
      foundItem = value;
      found = true;
    }
  });

  return foundItem;
}

export function getItems(search) {
  request({
    url: BZ_API,
    json: true
  }).then((response) => {
    const products = response.products;
    Object.keys(products).forEach((item)=>{
      if(item.includes(search)){
        ChatLib.chat(item);
      }
    })
  }).catch((error) => {
    callback(error);
  });
}

register("command", (args)=>{
  getItems(args.toUpperCase())
}).setName("bzfind")

/*
Parameter: bazaar item name
Return: Insta Buy price
*/
export function getInstaBuy(item, callback) {
  request({
    url: BZ_API,
    json: true
  }).then((response) => {
    const products = response.products;
    const instaBuyPrice = products[item].buy_summary[0].pricePerUnit;
    callback(null, instaBuyPrice);
  }).catch((error) => {
    callback(error);
  });
}
/*
Parameter: bazaar item name
Return: Insta Sell price
*/
export function getInstaSell(item, callback) {
  request({
    url: BZ_API,
    json: true
  }).then((response) => {
    const products = response.products;
    const instaSellPrice = products[item].sell_summary[0].pricePerUnit;
    callback(null, instaSellPrice);
  }).catch((error) => {
    callback(error);
  });
}
/*
Parameter: dictionary (object) of bazaar items with initial values
Callback: (error, updatedDict) => {}
*/
export function getInstaBuyDict(dict, callback) {
  const updatedDict = {};
  const keys = Object.keys(dict);

  let count = keys.length;
  keys.forEach((key) => {
    key = findID(key);
    getInstaBuy(key, (error, instaBuyPrice) => {
      if (error) {
        callback(error);
        return;
      }

      updatedDict[key] = instaBuyPrice;
      count--;

      if (count === 0) {
        callback(null, updatedDict);
      }
    });
  });
}
/*
Parameter: dictionary (object) of bazaar items with initial values
Callback: (error, updatedDict) => {}
*/
export function getInstaSellDict(dict, callback) {
  const updatedDict = {};
  const keys = Object.keys(dict);

  let count = keys.length;
  keys.forEach((key) => {
    key = findID(key);
    getInstaSell(key, (error, instaSellPrice) => {
      if (error) {
        callback(error);
        return;
      }

      updatedDict[key] = instaSellPrice;
      count--;

      if (count === 0) {
        callback(null, updatedDict);
      }
    });
  });
}
/*
//Example code to run search for single item

  getInstaBuy("ENCHANTED_COAL", (error, instaBuyPrice) => {
    if (error) {
      // Handle the error
      console.error(error);
    } else {
      // Use the instaBuyPrice here or perform additional actions
      ChatLib.chat(`${DARK_GRAY}${item} ${BOLD}${YELLOW}Insta Buy Price: ${DARK_GREEN}${formatDouble(instaBuyPrice)}`);
    }
  });


//dicionary example 

  const itemsDict = {
      ENCHANTED_COAL: 0,
      CRUDE_GABAGOOL: 0,
    };

    getInstaBuyDict(itemsDict, (error, updatedDict) => {
      if (error) {
        // Handle the error
        console.error(error);
      } else {
        // Use the updatedDict here or perform additional actions
      }
    });
*/
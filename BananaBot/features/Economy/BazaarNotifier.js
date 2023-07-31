import request from "../../../requestV2";
import { data } from "../../utils/variables";
import settings from "../../settings";
import { YELLOW, BOLD, GREEN, RED, LOGO } from "../../utils/constants";
import { formatDouble, registerWhen } from "../../utils/functions";
import { findName, findID } from "../../utils/bazaarFunctions";

const BZ_API = 'https://api.hypixel.net/skyblock/bazaar';
hoverName = "";
hover = false;

//adds price to data
function handleSellOffer(item, price){
    if(data.BazaarNotif[item]){
        data.BazaarNotif[item].SellOrderPrice = price;
    } else {
        data.BazaarNotif[item] = {SellOrderPrice : price};
        data.BazaarNotif[item] = {SellCreated : false}
    }
}

function handleBuyOffer(item, price){
    if(data.BazaarNotif[item]){
        data.BazaarNotif[item].BuyOrderPrice = price;
    } else {
        data.BazaarNotif[item] = {BuyOrderPrice : price};
        data.BazaarNotif[item] = {BuyCreated : false}
    }
}

function createdOrder(item, type){
    if(data.BazaarNotif[item][type]){
        if(type == "BuyOrderPrice"){
            data.BazaarNotif[item].BuyCreated = true;
        }else if(type == "SellOrderPrice"){
            data.BazaarNotif[item].SellCreated = true;
        }
        ChatLib.chat(`${YELLOW}${BOLD}added ${GREEN}${BOLD}${findName(item)} ${YELLOW}${BOLD}to notifications database with a price of ${GREEN}${BOLD}${data.BazaarNotif[item][type]}`)
    }
}

//check if user creates orders
registerWhen(register('itemToolTip', (itemLore) => {
    orderType = itemLore[0]
    if(typeof orderType == undefined || orderType == undefined) return;
    if(orderType.indexOf("Buy Order") == -1 && orderType.indexOf("Sell Offer") == -1) return;
    orderPrice = itemLore[3]
    orderItem = itemLore[5]
    if(hoverName == "" || hoverName != orderItem){
        hoverName = orderItem;
        hover = true;
    }
    if(!hover) return;

    if(orderType.indexOf("Buy Order") == 4 && orderPrice.indexOf("Price per unit") == 6 && orderItem.indexOf("Order: ") == 6){
        quantity = parseInt(orderItem.substring(orderItem.indexOf(": ")+4, orderItem.indexOf("x")))
        item = findID(orderItem.substring(orderItem.indexOf("x")+4, orderItem.length))
        price = parseFloat(orderPrice.substring(orderPrice.indexOf(": ")+4, orderPrice.indexOf("coins")-1).replace(/,/g, ''))
        handleBuyOffer(item, price);
    }else if(orderType.indexOf("Sell Offer") == 4 && orderPrice.indexOf("Price per unit") == 6 && orderItem.indexOf("Selling: ") == 6){
        quantity = parseInt(orderItem.substring(orderItem.indexOf(": ")+4, orderItem.indexOf("x")))
        item = findID(orderItem.substring(orderItem.indexOf("x")+4, orderItem.length))
        price = parseFloat(orderPrice.substring(orderPrice.indexOf(": ")+4, orderPrice.indexOf("coins")-1).replace(/,/g, ''))
        handleSellOffer(item, price);
    }
}), () => settings.bzNotif)

//register a new buy order
registerWhen(register("chat", (item) =>{
    spliceIndex = item.indexOf("x")
    quantity = item.substring(0,spliceIndex);
    item = findID(item.substring(spliceIndex+2,item.length))
    createdOrder(item, "BuyOrderPrice");
}).setCriteria("[Bazaar] Buy Order Setup! ${item} for ${coins} coins."), () => settings.bzNotif)

//buy order fills
registerWhen(register("chat", (item) =>{
    spliceIndex = item.indexOf("x")
    item = findID(item.substring(spliceIndex+2,item.length))
    delete data.BazaarNotif[item]
    ChatLib.chat(`${YELLOW}${BOLD}Removed ${GREEN}${BOLD}${item} ${YELLOW}${BOLD}from db`)
}).setCriteria("[Bazaar] Your Buy Order for ${item} was filled!"), () => settings.bzNotif)

//register sell offers
registerWhen(register("chat", (item) =>{
    spliceIndex = item.indexOf("x")
    quantity = item.substring(0,spliceIndex);
    item = findID(item.substring(spliceIndex+2,item.length))
    createdOrder(item, "SellOrderPrice");
}).setCriteria("[Bazaar] Sell Offer Setup! ${item} for ${coins} coins."), () => settings.bzNotif)

//register sell offer canceling
registerWhen(register("chat", (item) =>{
    spliceIndex = item.indexOf("x")
    item = findID(item.substring(spliceIndex+2,item.length))
    if(data.BazaarNotif[item] != undefined) {
        data.BazaarNotif[item].SellCreated = false;
        ChatLib.chat(`${YELLOW}${BOLD}Removed ${GREEN}${BOLD}${item} ${YELLOW}${BOLD}from db`)
    }
}).setCriteria("[Bazaar] Cancelled! Refunded ${item} from cancelling Sell Offer!"), () => settings.bzNotif)

//loop to check if outbid
registerWhen(register("step", () =>{
    request({
        url: BZ_API,
        json: true
      }).then((response) => {
        const products = response.products;
        Object.keys(data.BazaarNotif).forEach((item) =>{
            const BuyPrice = products[item].sell_summary[0].pricePerUnit //buy offers
            const SellPrice = products[item].buy_summary[0].pricePerUnit //sell offers
            itemCheck = data.BazaarNotif[item];
            if(itemCheck.SellCreated && SellPrice < itemCheck.SellOrderPrice){
                ChatLib.chat(`${RED}${BOLD}[Sell Offer Notifier]`)
                ChatLib.chat(`${YELLOW}Sell Offer has been outbid:`)
                ChatLib.chat(`${YELLOW}Item: ${GREEN}${findName(item)}.`)
                ChatLib.chat(`${YELLOW}Outbid by: ${RED}${formatDouble(SellPrice - itemCheck.SellOrderPrice)}` )
                ChatLib.chat(`${YELLOW}To remove this notification.`)
                ChatLib.chat(`${YELLOW}/clear ${item}`)
            }else if(!itemCheck.SellCreated){
                delete data.BazaarNotif[item].SellOrderPrice
                delete data.BazaarNotif[item].SellCreated
            }
            if(BuyPrice > itemCheck.BuyOrderPrice){
                ChatLib.chat(`${RED}${BOLD}[Buy Order Notifier]`)
                ChatLib.chat(`${YELLOW}Buy Order has been outbid:`)
                ChatLib.chat(`${YELLOW}Item: ${GREEN}${findName(item)}.`)
                ChatLib.chat(`${YELLOW}Outbid by: ${RED}${formatDouble(BuyPrice - itemCheck.BuyOrderPrice)}` )
                ChatLib.chat(`${YELLOW}To remove this notification.`)
                ChatLib.chat(`${YELLOW}/clear ${item}`)
            }else if(!itemCheck.BuyCreated){
                delete data.BazaarNotif[item].BuyOrderPrice
                delete data.BazaarNotif[item].BuyCreated
            }
            if(!itemCheck.SellOrderPrice && !itemCheck.BuyOrderPrice){
                delete data.BazaarNotif[item];
            }
        })
      }).catch((error) => {
          ChatLib.chat(`failed on ${item}`)
          ChatLib.chat(error)
      });
}).setDelay(parseInt(settings.BzNotifTimer)), () => settings.bzNotif)

function clearDB(clear){
    if(clear == "all" || clear == ''){
        if(Object.keys(data.BazaarNotif).length>0){
            Object.keys(data.BazaarNotif).forEach((item) =>{
                delete data.BazaarNotif[item]
            })
            ChatLib.chat(`${LOGO}${YELLOW}${BOLD}Cleared entire bazaar database`)
        }
    }else{
        delete data.BazaarNotif[clear]
        ChatLib.chat(`${LOGO}${YELLOW}${BOLD}Cleared ${clear} from bazaar database`)
    }
}

//clears data base
register("command", (...args) => {
    if(args){
        clearDB(args);
    }
}).setName("clear");

register("command", () => {
    Object.keys(data.BazaarNotif).forEach((item) =>{
        ChatLib.chat(`${GREEN}${item} ${YELLOW}is in the list`)
    })
}).setName("bzlist");

registerWhen(register("chat", () => {
    clearDB("all");
}).setCriteria("Welcome to Hypixel SkyBlock!"), () => !settings.bzNotif)

//delete data.BazaarNotif[item]
//[Bazaar] Buy Order Setup! 12,000x Crude Gabagool for 11,270,400 coins.
//sell_summary(buy offers), buy_summary(sell offers), pricePerUnit, amount, orders / quick_status, sellPrice(highest buy offer), sellVolume, sellMovingWeek, sellOrders, buyPrice(loweset sell offer), buyVolume, buyMovingWeek, buyOrders
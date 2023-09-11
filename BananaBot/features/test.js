import { tax, b } from "../utils/auctionFunctions"

register("command", ()=>{
    list = tax(3.689*b);
    ChatLib.chat(`List: ${list[0]}`)
    ChatLib.chat(`claim: ${list[1]}`)
    ChatLib.chat(`dur: ${list[2]}`)
    ChatLib.chat(`Total: ${list[3]}`)
}).setName("aa")


/*
Bin Auction Listing Fees have been changed for certain price brackets:
1% for items <10,000,000 coins (unchanged)
2% for items <100,000,000 coins
2.5% for items >100,000,000 coins
*/
import request from "../../requestV2";
import { data } from "../utils/variables";
import { setPages, updateAhPrices } from "../utils/auctionFunctions";

register("command", ()=>{
    setPages();
}).setName("as")

register("command", ()=>{
    updateAhPrices();
}).setName("aaa")

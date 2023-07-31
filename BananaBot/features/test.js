import request from "../../requestV2";
import { data } from "../utils/variables";
import { updateAhPrices } from "../utils/auctionFunctions";

register("command", ()=>{
    updateAhPrices();
}).setName("aaa")

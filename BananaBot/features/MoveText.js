import { data } from "../utils/variables";
import { GOLD, BOLD, AQUA, RED, GOLD, GREEN, YELLOW } from "../utils/constants";

export const moveText = new Gui();
let selected = "";

//add in same key and example text for each new location
locString = {
    "BIL": `${RED}${BOLD}Blood Ichor 22s`,
    "TCL": `${GOLD}${BOLD}TWINCLAWS 0.2s`,
    "ETL": `${RED}${BOLD}effigy 14min 22s`,
    "ITL": `${GOLD}${BOLD}Item ${AQUA}${BOLD}x ${GOLD}${BOLD}seconds`,
    "dailyLoc": `${GOLD}${BOLD}DAILY TIMERS HERE`,
    "powderLoc": `${GREEN}${BOLD}POWDER TIMERS HERE`,
    "STL": `${GOLD}${BOLD}SKILL TRACKERS HERE`,
    "MTL": `${AQUA}${BOLD}MOB TRACKERS HERE`,
    "KPL": `${GOLD}${BOLD}KUUDRA PROFIT HERE`
}

function inBounds(x, y, textX, textY, str) {
    return (x >= textX && x <= textX + 100) && (y >= textY && y <= textY + 10); 
}

register("renderOverlay", () => {
    if (!moveText.isOpen()) return;
    Object.keys(data.locations).forEach((loc)=>{
        if(!data.locations[loc][2]){
            Renderer.drawString(locString[loc], data.locations[loc][0], data.locations[loc][1])
        }
    })
});

register("dragged", (dx, dy, x, y) => {
    if (!moveText.isOpen()) return;
    if (selected === "") return;
    Object.keys(data.locations).forEach((loc)=>{
        if(selected == loc){
            data.locations[loc][0] = parseInt(x);
            data.locations[loc][1] = parseInt(y);
        }
    })
});

register("GuiMouseClick", (x, y) => {
    if (!moveText.isOpen()) return;
    Object.keys(data.locations).forEach((loc)=>{
        if(inBounds(x,y, data.locations[loc][0], data.locations[loc][1], loc)){
            selected = loc;
        }
    })
});

register("GuiMouseRelease", (x, y) => {
    if (!moveText.isOpen()) return;
    selected = "";
});

register("command", () =>{
    selected = "";
    moveText.open();
}).setName("bbgui");
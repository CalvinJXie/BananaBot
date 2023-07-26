import { data } from "../utils/variables";
import { GOLD, BOLD, AQUA, RED, GOLD, GREEN, YELLOW } from "../utils/constants";
import { registerWhen } from "../utils/functions";

const moveText = new Gui();
let selected = ""

//when adding new gui label, add a render in renderOverlay 
//and another else if statement in GuiMouseClick
const bloodIchor = `${RED}${BOLD}Blood Ichor 22s`;
const cdText = `${GOLD}${BOLD}Item ${AQUA}${BOLD}x ${GOLD}${BOLD}seconds`;
const TwinClaws = `${GOLD}${BOLD}TWINCLAWS 0.2s`
const effigy = `${RED}${BOLD}effigy 14min 22s`

const powder = `${GREEN}${BOLD}POWDER TIMERS HERE`
const dailies = `${GOLD}${BOLD}DAILY TIMERS HERE`
const skill = `${GOLD}${BOLD}SKILL TRACKERS HERE`

function inBounds(x, y, textX, textY) {
    return (x >= textX && x <= textX + 80) && (y >= textY && y <= textY + 20); 
}

registerWhen(register("renderOverlay", () => {
    Renderer.drawString(cdText, data.ITL[0], data.ITL[1]);
    Renderer.drawString(bloodIchor, data.BIL[0], data.BIL[1]);
    Renderer.drawString(TwinClaws, data.TCL[0], data.TCL[1]);
    Renderer.drawString(effigy, data.ETL[0], data.ETL[1]);
    Renderer.drawString(dailies, data.dailyLoc[0], data.dailyLoc[1]);
    Renderer.drawString(powder, data.powderLoc[0], data.powderLoc[1]);
    Renderer.drawString(skill, data.STL[0], data.STL[1]);
}), () => moveText.isOpen())

registerWhen(register("dragged", (dx, dy, x, y) => {
    if (selected === null) return;
    if(selected == "ITL"){
        data.ITL[0] = parseInt(x);
        data.ITL[1] = parseInt(y);
    }else if(selected == "BIL"){
        data.BIL[0] = parseInt(x);
        data.BIL[1] = parseInt(y);
    }else if(selected == "TCL"){
        data.TCL[0] = parseInt(x);
        data.TCL[1] = parseInt(y);
    }else if(selected == "ETL"){
        data.ETL[0] = parseInt(x);
        data.ETL[1] = parseInt(y);
    }else if(selected == "powderLoc"){
        data.powderLoc[0] = parseInt(x);
        data.powderLoc[1] = parseInt(y);
    }else if(selected =="dailyLoc"){
        data.dailyLoc[0] = parseInt(x);
        data.dailyLoc[1] = parseInt(y);
    }else if(selected =="STL"){
        data.STL[0] = parseInt(x);
        data.STL[1] = parseInt(y);
    }
}), () => moveText.isOpen())

registerWhen(register("GuiMouseClick", (x, y) => {
    if (!moveText.isOpen()) return;
    if (inBounds(x, y, data.ITL[0], data.ITL[1])) {
        selected = "ITL";
    } else if (inBounds(x, y, data.BIL[0], data.VEL[1])) {
        selected = "BIL";
    } else if (inBounds(x, y, data.TCL[0], data.TCL[1])) {
        selected = "TCL";
    } else if (inBounds(x, y, data.ETL[0], data.ETL[1])) {
        selected = "ETL";
    } else if (inBounds(x, y, data.powderLoc[0], data.powderLoc[1])){
        selected = "powderLoc"
    } else if (inBounds(x, y, data.dailyLoc[0], data.dailyLoc[1])){
        selected = "dailyLoc"
    } else if (inBounds(x, y, data.STL[0], data.STL[1])){
        selected = "STL"
    } else {
        selected = null;
    }
}), () => moveText.isOpen())

register("command", () => {
    moveText.open();
}).setName("bbgui");

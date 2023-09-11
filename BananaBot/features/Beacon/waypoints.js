import renderBeaconBeam2 from "../../../BeaconBeam"
import { formatInt, registerWhen, setRegisters } from "../../utils/functions";
import settings from "../../settings";

x = 0;
y = 0;
z = 0;

registerWhen(register("renderWorld",()=>{
    displayBeam();
}), ()=>settings.showBeam && x != 0 && y != 0 && z != 0)

function displayBeam(){
    if(x != 0 && y != 0 && z != 0){
        renderBeaconBeam2(x, y, z, 1, 1, 0)
    }
}

registerWhen(register("chat", (party, coords)=>{
    x = parseInt(coords.substring(coords.indexOf("x:")+2, coords.indexOf(", y")))
    y = parseInt(coords.substring(coords.indexOf("y:")+2, coords.indexOf(", z")))
    z = parseInt(coords.substring(coords.indexOf("z:")+2, coords.length))
    if(x == undefined || y == undefined || z == undefined){
        x = 0;
        y = 0;
        z = 0;
    }
    setRegisters();
}).setCriteria("${before} [BananaBotCoordinates] ${coords}"), ()=>settings.showBeam)

registerWhen(register("step", ()=>{
    x = 0;
    y = 0;
    z = 0;
    setRegisters();
}).setDelay(60), ()=>x != 0 && y != 0 && z != 0)

register("command", ()=>{
    ChatLib.say(`/pc [BananaBotCoordinates] x: ${formatInt(Player.getX())}, y: ${formatInt(Player.getY())}, z: ${formatInt(Player.getZ())}`)
}).setName("bbc")
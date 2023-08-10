import { sendCoords } from "../../utils/functions";
import { registerWhen } from "../../utils/functions";
import settings from "../../settings";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

registerWhen(register("chat", ()=>{
    sendCoords("Vanquisher")
}).setCriteria("A Vanquisher is spawning nearby!"), ()=>settings.vanqBeam);

registerWhen(register("chat", ()=>{
    sendCoords("Gaia Construct")
}).setCriteria("${before} You dug out a Gaia Construct!"), ()=>settings.gaiaBeam);

registerWhen(register("chat", ()=>{
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    const player = Player.getName();
    const inquis = stands.find(stand => stand.getName().includes("Inquisitor"));
    if(inquis != undefined && settings.inquisBeam){
        xDiff = Math.abs(inquis.getX() - Player.getX());
        zDiff = Math.abs(inquis.getZ() - Player.getZ());
        if(xDiff <= 20 && yDiff <= 20){
            sendCoords("Inquisitor")
        }
    }else if(settings.champBeam){
        sendCoords("Minos Champion")
    }
}).setCriteria("${before} You dug out a Minos Champion!"), ()=>settings.champBeam || settings.inquisBeam);

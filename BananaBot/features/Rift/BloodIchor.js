import settings from "../../settings";
import { RED, BOLD } from "../../utils/constants";
import { data } from "../../utils/variables";
import { registerWhen } from "../../utils/functions";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

registerWhen(register("renderOverlay", timerOverlay), () => settings.BloodIchor) // Register the "renderOverlay" event first

function timerOverlay() {
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    //console.log(stands)
    const vamp = stands.filter(stand => stand.getName().includes('§c'));
    const respawnTimes = vamp.map(stand => {
        const name = stand.getName();
        const startIndex = name.indexOf("§c"); // Start index of the time value
        const endIndex = name.indexOf("s", startIndex); // End index of the time value
        if(name.substring(0, 15).includes("Respawn"))
        {
            return;
        }
        const timeString = name.substring(startIndex+2, endIndex); // Extract the time value
        return timeString;
    });

    respawnTimes.forEach((time) => {
        if(time<28 && time >=0)
        {
            title = `${RED}${BOLD}Blood Ichor ${time}`
            Renderer.scale(settings.BIScaleX, settings.BIScaleY)
            Renderer.drawString(title, data.locations.BIL[0], data.locations.BIL[1]);
        }
    });
}
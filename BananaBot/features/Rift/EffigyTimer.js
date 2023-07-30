import settings from "../../settings";
import { RED, BOLD } from "../../utils/constants";
import { data } from "../../utils/variables";
import { registerWhen } from "../../utils/functions";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

registerWhen(register("renderOverlay", timerOverlay), () => settings.effigyTimer) // Register the "renderOverlay" event first

function timerOverlay() {
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    const effigy = stands.filter(stand => stand.getName().includes('Respawn'));

    const respawnTimes = effigy.map(stand => {
        const name = stand.getName();
        const startIndex = name.indexOf("§c") + 2; // Start index of the time value
        const endIndex = name.indexOf("s", startIndex); // End index of the time value
        const timeString = name.substring(startIndex, endIndex); // Extract the time value
        return timeString;
    });

    respawnTimes.forEach((time, index) => {
        const title = `${RED}${BOLD}${time}`;
        const xPos = settings.effX; // Adjust the X position as desired
        const yPos = settings.effY + index * 10; // Adjust the Y position as desired

        Renderer.drawString(title, data.locations.ETL[0], data.locations.ETL[1]); // Render the timer text
    });
}
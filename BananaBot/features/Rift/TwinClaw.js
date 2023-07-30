import settings from "../../settings";
import { data } from "../../utils/variables";
import { registerWhen } from "../../utils/functions";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

registerWhen(register("renderOverlay", timerOverlay), () => settings.twinClaw) // Register the "renderOverlay" event first

function timerOverlay() {
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    const player = Player.getName();
    const bossSpawn = stands.filter(stand => stand.getName().includes(player));
    const vamp = stands.filter(stand => stand.getName().includes('TWINCLAWS'));

    const slayerBossPos = bossSpawn.map(stand => {
        const bossSpawnCoordinates = {
            x: stand.getX(),
            y: stand.getY(),
            z: stand.getZ()
        };
        return bossSpawnCoordinates;
    });

    const TwinClawPos = vamp.map(stand => {
        const TwinClawCoordinates = {
            x: stand.getX(),
            y: stand.getY(),
            z: stand.getZ()
        };
        return TwinClawCoordinates;
    })

    if (!bossSpawn.length || !vamp.length) return;

    const bossSpawnCoordinates = slayerBossPos[0];
    const TwinClawCoordinates = TwinClawPos[0];

    if(!bossSpawnCoordinates || !TwinClawCoordinates) return;

    const range = 5;

    if (
        Math.abs(bossSpawnCoordinates.x - TwinClawCoordinates.x) <= range &&
        Math.abs(bossSpawnCoordinates.y - TwinClawCoordinates.y) <= range &&
        Math.abs(bossSpawnCoordinates.z - TwinClawCoordinates.z) <= range
    )
    {
        bossName = vamp[0].getName();
        const startIndex = bossName.indexOf("§6§"); // Start index of the time value
        const endIndex = bossName.indexOf("s", startIndex); // End index of the time value
        const timeString = bossName.substring(startIndex, endIndex); // Extract the time value
        if(timeString)
        {
            Renderer.scale(settings.VampScaleX, settings.VampScaleY)
            Renderer.drawString(timeString, data.locations.TCL[0], data.locations.TCL[1]);
        }
    }
}
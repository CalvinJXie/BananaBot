import settings from "../../settings";
import { data } from "../../utils/variables";
import { registerWhen } from "../../utils/functions";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

registerWhen(register("renderOverlay", timerOverlay), () => settings.twinClaw) // Register the "renderOverlay" event first

function timerOverlay() {
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    const player = Player.getName();
    const bossSpawn = stands.filter(stand => stand.getName().includes(player));
    const vamp = stands.filter(stand => stand.getName().includes('MANIA'));

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
        const startIndex = bossName.indexOf("§5§l"); // Start index of the time value
        const endIndex = bossName.indexOf("s", startIndex); // End index of the time value
        const timeString = bossName.substring(startIndex, endIndex); // Extract the time value
        if(timeString)
        {
            Renderer.scale(settings.VampScaleX, settings.VampScaleY)
            Renderer.drawString(timeString, 200, 150);
        }
    }
}

/*
Entity{name=§c☠ §4Vampire Boss §a1318§c❤, x=192.70486111111111, y=88.96875, z=115.6111111111111}, 
Entity{name=§c03:44 §6§lTWINCLAWS §b§l0.2s §5§lMANIA §b§l25.9s, x=192.73195301783264, y=89.59512174211248, z=115.62337105624142}, 
Entity{name=§eSpawned by: §bkai_ken, x=192.5625, y=89.28125, z=115.625}, 
Entity{name=Armor Stand, x=179.59375, y=84.8125, z=119.1875},
*/

/*
import settings from "../../settings";
import { data } from "../../variables";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");

register("renderOverlay", timerOverlay); // Register the "renderOverlay" event first

function timerOverlay() {
    if(!settings.twinClaw) return;
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    const vamp = stands.filter(stand => stand.getName().includes('TWINCLAWS'));
    const respawnTimes = vamp.map(stand => {
        const name = stand.getName();
        const startIndex = name.indexOf("§6§"); // Start index of the time value
        const endIndex = name.indexOf("s", startIndex); // End index of the time value
        const timeString = name.substring(startIndex, endIndex); // Extract the time value
        return timeString;
    });

    respawnTimes.forEach((time) => {
        Renderer.scale(settings.VampScaleX, settings.VampScaleY)
        Renderer.drawString(time, settings.TCX, settings.TCY);

        //Renderer.drawString(time, data.TCL[0], data.TCL[1]); // Render the timer text
    });
}
*/
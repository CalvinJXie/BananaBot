import settings from "../../settings";
import { data } from "../../utils/variables";
import { registerWhen } from "../../utils/functions";
import { GREEN, RED, BOLD } from "../../utils/constants";

const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
registerWhen(register("renderOverlay", timerOverlay), () => settings.vampHealth)// Register the "renderOverlay" event first

function timerOverlay() {
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    const player = Player.getName();
    const bossSpawn = stands.filter(stand => stand.getName().includes(player));
    const boss = stands.filter(stand => stand.getName().includes('Bloodfiend'));
    const slayerBossPos = bossSpawn.map(stand => {
        const bossSpawnCoordinates = {
            x: stand.getX(),
            y: stand.getY(),
            z: stand.getZ()
        };
        return bossSpawnCoordinates;
    });

    const playerBossPos = boss.map(stand => {
        const bossCoordinates = {
            x: stand.getX(),
            y: stand.getY(),
            z: stand.getZ()
        };
        
        return bossCoordinates;
    });
    

    if (!bossSpawn.length || !boss.length) return; // Check if either entity is missing

    const bossSpawnCoordinates = slayerBossPos[0];
    const bossCoordinates = playerBossPos[0];

    console.log(bossSpawnCoordinates.x)

    if (!bossSpawnCoordinates || !bossCoordinates) return; // Check if either coordinate is missing

    const range = 5; // Define the range in blocks
    // Check if the boss and bossSpawn are within the specified range of each other
    if (
        Math.abs(bossSpawnCoordinates.x - bossCoordinates.x) <= range &&
        Math.abs(bossSpawnCoordinates.y - bossCoordinates.y) <= range &&
        Math.abs(bossSpawnCoordinates.z - bossCoordinates.z) <= range
    ) {
        const bossName = boss[0].getName();
        const startIndex = bossName.indexOf("§a"); // Start index of the health value
        const endIndex = bossName.indexOf("§c❤", startIndex); // End index of the health value
        const healthString = bossName.substring(startIndex + 2, endIndex); // Extract the health value

        if (healthString) {
            let title = "";
            if (healthString === "§") {
                title = `${RED}${BOLD}EXECUTE`;
            } else {
                title = `${GREEN}${healthString}`;
            }

            Renderer.scale(settings.VampHpScaleX, settings.VampHpScaleY);
            Renderer.drawString(title, settings.VEX, settings.VEY);
        }
    }
}

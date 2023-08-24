list = []
i = 0;
register("command", ()=>{
    const EntityArmorStand = Java.type("net.minecraft.entity.player.EntityPlayer");
    const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
    stands.forEach((stand)=>{
        list.push(`[BananaBotCoordinates] ${stand.getName()} x: ${stand.getX()}, y: ${stand.getY()}, z:${stand.getZ()}`)
    })
}).setName("aa")

register("command", ()=>{
    ChatLib.say(list[i]);
    i++;
}).setName("qq")
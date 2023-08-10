import { YELLOW, GREEN, RED, BLUE } from "../../utils/constants"
import { formatDouble, registerWhen } from "../../utils/functions"

function calcStats(dict){
    total = 0;
    Object.keys(dict).forEach((item) =>{
        total += dict[item];
    })
    return total;
}

//takes in weapon base damage, player str/cd, additive multipliers, multiplicative multipliers (calculate before hand, Ex: 20% and 70% stack, put 1.2 * 1.7  for parameter)
function calcMelee(basedamage, strength, critdamage, basemultiplier, postmultiplier){
    if(postmultiplier == 0){postmultiplier = 1;}
    ChatLib.chat(`${YELLOW}Base: ${GREEN}${5 + basedamage}`)
    ChatLib.chat(`${YELLOW}str: ${GREEN}${1+(strength/100)}`)
    ChatLib.chat(`${YELLOW}cd: ${GREEN}${1+(critdamage/100)}`)
    ChatLib.chat(`${YELLOW}Base Multi: ${GREEN}${1+(basemultiplier/100)}`)
    ChatLib.chat(`${YELLOW}Pos Multi: ${GREEN}${postmultiplier}`)
    return (5 + basedamage)*(1+(strength/100))*(1+(critdamage/100))*(1+(basemultiplier/100))*(postmultiplier)
}

multiplicative = {
    bop: 1 + 3.81/100,//book of progress
    zombiepet: 1 + 25/100,
    golempet: 1 + 30/100,
    fabled:[1, 2, 3, 15] //up to 15%
}

percent = {
    cleave: [3, 6, 9, 12, 15, 20],
    fireaspect: [3, 6, 9],//% of total damage, then dealt per second
    flame: [3, 6],
    thunderbolt: [4, 8, 12, 16, 20, 25],
    thunderlord: [8, 16, 24, 32, 40, 50, 60],//3 consecutive hits
    venomous: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],//stacks globally up to 40 hits
}

abilityscales = {
    aotd: 0.1,
    pigman: 0.1,
    midasstaff: 0.3,
    dreadlord: 0.3,
    bonzostaff: 0.2,
    icespray: 0.1,
    spiritsceptre: 0.2,
    giantsword: 0.05,
    witherimpact: 0.3,//other scroll damages are the same scalings
    yetisword: 0.3
}

additive = {
    combat: 210,//4% till 50 then 1% per
    bane: [10, 20, 30, 40, 60, 80, 100],
    cubism: [10, 20, 30, 40, 60, 80],
    dragonhunter: [8, 16, 24, 32, 40],
    enderslayer: [15, 30, 45, 60, 80, 100, 130],
    execute: [0.2, 0.4, 0.6, 0.8, 1, 1.25],//for each % health missing on target
    firststrike: [25, 50, 75, 100, 125],
    giantkiller: [0.1, 0.2, 0.3, 0.4, 0.6, 0.9, 1.2],//% extra health target has above you [5, 10, 15, 20, 30, 45, 65] //55% health more
    impaling: [25, 50, 75],
    prosecute: [0.1, 0.2, 0.3, 0.4, 0.7, 1], //40% cap at lvl 6 percent hp target has
    sharpness: [5, 10, 15, 20, 30, 45, 65],
    smite: [10, 20, 30, 40, 60, 80, 100],
    smoldering: [3, 6, 9, 12, 15],
    titankiller: [2, 4, 6, 8, 12, 16, 20], //per 100 defense [6, 12, 18, 24, 40, 60, 80]
    triplestrike: [10, 20, 30, 40, 50],//first 3 hits
    combo: [1, 2, 3, 4, 5], //up to 2-10 kills
    swarm: [2, 4, 6, 8, 10], //max 10 enemies
    power: [8, 16, 24, 32, 40, 50, 65],
    gdrag: 250,
    lifeline: 25,
    dominance: 10,
}

userAdditive = {
    combat: 210,
    firststrike: 125,
    giantkiller: 65,
    prosecute: 40,
    sharpness: 65
}

str = {
    //changes
    itemreforge: 40,//includes item / armor / equip
    pet: 20,
    reforge: 775.72, //542.15,//strong , //forceful
    tuning: 2, 
    
    //basically constant
    enrichment: 46,
    itemstr: 12,//Shark tooth - 10. Burststopper - 2.
    potion: 78.75 + 20,//str pot - 78.75, + 20 jerry candy
    foraging: 86,
    sbl: 76, //skyblock level
    passive: 17, //10 pandora 7 blood god
    enchantment: 14.6, //The One V
    island: 14, //beacon + cake
    itemPassive: 11,//gravity + night/day crystal
    jasper: 6.5, //artifact of power
    essenceshop: 5,
    blazeslayer: 3
}

cd = {
    //changes
    itemreforge: 110,
    reforge: 206.86,//542.15,
    pet: 66.67,

    //basically constant
    tuning: 2,
    base: 50,
    potion: 40,
    slayer: 18, //15 tara 3 sven
    tali: 6, //tiny dancer, redclaw
}

//blue tooth ring deal +1 damage if atleast 6 players on island. adds +3 damage to blazeTekk
function calcDamage(){
    baseMulti = 210; // power 50
    book = 1 + 3.81/100
    postMulti = book;//1 * (1+book)
    //weapon damage
    wepDamage = 310;
    strength = calcStats(str);
    critdamage = calcStats(cd);
    //mage
    baseAbilityDamage = 50;
    intel = 4000;
    abilityScaling = 1;

    meleeDamage = calcMelee(wepDamage, strength, critdamage, baseMulti, postMulti)
    bowDamage = calcMelee(wepDamage+24, strength, critdamage, baseMulti+1, postMulti*1.2620691364757501)
    mageDamage = calcMage(baseAbilityDamage, intel, abilityScaling, critdamage, baseMulti, postMulti)
    ChatLib.chat(`${RED}str: ${GREEN}${strength}, ${BLUE}cd: ${GREEN}${critdamage}`)
    ChatLib.chat(`${YELLOW}Expected Melee damage: ${GREEN}${formatDouble(meleeDamage)}`)
    ChatLib.chat(`${YELLOW}Expected Bow damage: ${GREEN}${formatDouble(bowDamage)}`)
}
//additive multipliers. Ex: 20% and 70% = 1+.2 + .7 = 1.9 ( base multiplier )

register("command", () =>{
    //calcDamage();
    base = 124202/160261 //only combat level
    book = 135028/167835 //book + combat level
    multi1375 = 244195/210263 //gdrag 137.5% damage + book
    multi250 = 442150/304230 //gdrag 250% damage + book
    gdrag = 406894/290639 // base + gdrag
    gdrag = gdrag-base
    ll = 141845/169367
    dom = 130288/164402
    warden400 = 282472/239891

    dm = 1106305
    rend = 2744810
    multi = rend/dm
    ChatLib.chat((gdrag + .4025 + .4375 + .15 + base)*1.0381)
    ChatLib.chat(`${YELLOW}rend does ${GREEN}${formatDouble(multi*100)}${YELLOW}% of ${GREEN}${dm} ${YELLOW}= ${GREEN}${dm*multi}`)
}).setName("ta")

toggle = false;

registerWhen(register("step", () => {
  const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand");
  const stands = World.getAllEntitiesOfType(EntityArmorStand.class);
  
  const playerCrit = stands.find(stand => stand.getName().includes('§f✧'));
  const playerNonCrit = stands.find(stand => stand.getName().indexOf('§7') == 0);
  //✧4,838✧
  if(playerCrit != undefined){
    crit = playerCrit.getName().removeFormatting().replace(/✧/g, "");
    ChatLib.chat(`Crit: ${crit}`)
  }else if(playerNonCrit != undefined){
    nonCrit = playerNonCrit.getName().removeFormatting()
    ChatLib.chat(`Non Crit: ${nonCrit}`)
  }
}).setDelay(1), () => toggle);

register("command", (args)=>{
    switch(args){
        case 'on':
            ChatLib.chat(`${YELLOW}Damage on`)
            toggle = true;
            break;
        case 'off':
            ChatLib.chat(`${YELLOW}Damage Off`)
            toggle = false;
            break;
        default:
            ChatLib.chat(`${YELLOW}/dmg on/off`)
            break;
    }
}).setName("dmg")

//baseability damage is red text in abilities damage area
//hpb does nothing
function calcMage(baseAbilityDamage, intelligence, abilityScaling, critdamage, basemultiplier, postmultiplier){
    if(postmultiplier == 0){postmultiplier = 1;}
    if(abilityScaling == 0){abilityScaling = 1;}
    return (baseAbilityDamage)*(1+(intelligence/100)*abilityScaling)*(1+(critdamage/100))*(1+(basemultiplier/100))*(postmultiplier)
}

register("command", ()=>{
    ChatLib.chat(calcMage(15000, 1000, 0.3, 100, 0, 0));
}).setName("mm")
/*
{name=§781,921
Entity{name=§f✧§f1§e0§61§c,§c8§f2§f5§e✧, x=-61.8125, y=102.4375, z=52.5},
Entity{name=§f✧§f8§e0§6,§c6§c8§f1§f✧, x=-62.5, y=101.96875, z=53.09375},
Entity{name=§f✧§f1§e0§61§c,§c8§f2§f5§e✧, x=-61.78125, y=101.625, z=52.5}
*/


/*
tests for bow damage. conclusion momentum probably effects shit so wait for wiki damage calc.

1.262062718481284, damage juju 98923/78383.17
1.262043880082931, my damage

1.277474428977928 ender bow 16611 / 13003 //deadly reforge 1336 str 405 cd
1.2773691654879773 ender bow 18062/14140 //rapid reforge(str: 1320.57, cd: 375.86 )
control rapid end bow, tiger pet, regular arrows
strong no tune 956 str 777 cd. 24769/19390 - 1.2774                    110366168128
testing
strong cd tune 956 str 928 cd - 1.2774037403740375

strong no tune 956 str 737 cd. 23640/18506 - 1.2774                    235383118988
strong reforge str tune 1107 str 777 cd. 28310/22162 - 1.2774          11785939897
strong reforge 1 str tune 957 str 777 cd. 24792/19408 - 1.2774         11376751855

forceful reforge no tune no pot 1189 str 402 cd. 17316/13555 - 1.2774  621910734048 
forceful reforge no tune pot 1189 str 442 cd. 18694/14634 - 1.2774     361076944103
forceful reforge 1 tune pot 1190 str 443 cd. 18743/14672 - 1.2774     672846237731
forceful reforge 2 tune pot 1191 str 444 cd. 18792/14711 - 1.2774     114608116376

Plain Juju
forceful 2 tune pot 1227 str 499 cd. 101825/80681 - 1.2620691364757501
1 hpb +2 damage + 2str
forceful 2 tune pot 1229 str 499 cd. 102623/81316 - 1.2620271533277583
Plain juju no +2 damage from hb
forceful 2 tune pot 1229 str 499 cd. 101978/80803 - 1.2620571018402782

better juju with power
forceful 2 tune ea 1294 str 570 cd. 161023/113147 - 1.4231309712144378

Plain Juju
forceful 2 tune pot 1227 str 499 cd. 101825/80681 - 1.2620691364757501

Plain Juju icy arrow +24 damage
forceful 2 tune pot 1227 str 499 cd. 109236/80681 - 1.3539247158562735

cc is not a factor
bigger str to cd gap = more damage?
less crit damage = more multi? needs testing
base damage multiplier???
*/

import { AQUA, GREEN, GRAY, RED, DARK_GREEN, YELLOW, BOLD, minionActions } from '../../utils/constants'
import { formatDouble } from '../../utils/functions'
import settings from "../../settings"
found = 0
function calcSpeed(args){
  //pet speed
  const pet = settings.petSpeed/100
  //minion upgrades slots constants
  const flyCatcher = .2*settings.flyAmt
  const minExpander = .05*settings.expandAmt
  //beacon/infusion constants
  const infusion = .1*settings.infusionAmt
  const scorchBeacon = .11*settings.scorchAmt
  const beacon = .1*settings.beaconAmt
  //total item upgrades
  let totalMinionUpgrades = 1+flyCatcher+minExpander+infusion+beacon+scorchBeacon+pet
  //fuels
  const flame = .4*settings.flameAmt
  const plasma = .35*settings.plasmaAmt
  const magma =.3*settings.magmaAmt
  const lava = .25*settings.lavaAmt
  const foulFlesh = .9*settings.foulAmt
  const hamsterWheel = .5*settings.wheelAmt
  const hyperCatalyst = 4
  //inferno minion fuels
  const fuelGaba = 11*settings.fuelGabaAmt
  const heavyGaba = 16*settings.heavyGabaAmt
  const hypergolic = 21*settings.HypergolicAmt
  const minionBuff = .18*settings.minionAmt
  Object.keys(minionActions).forEach((item) => {
    if(args == item){
      found++
      if(settings.flameAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Eternal flame ${YELLOW}in ${AQUA}${args}${YELLOW} minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + flame)
      }else if(settings.plasmaAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Plasma Bucket ${YELLOW}in ${AQUA}${args}${YELLOW} minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + plasma)
      }else if(settings.magmaAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Magma Bucket ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + magma)
      }else if(settings.lavaAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Lava Bucket ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + lava)
      }else if(settings.foulAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Foul Flesh ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + foulFlesh)
      }else if(settings.wheelAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Hamster Wheel ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + hamsterWheel)
      }else if(settings.fuelGabaAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Fuel Gabagool ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + minionBuff)/fuelGaba
      }else if(settings.heavyGabaAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Heavy Gabagool ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + minionBuff)/heavyGaba
      }else if(settings.HypergolicAmt == 1){
        ChatLib.chat(`${YELLOW}Using ${RED}Hypergolic Gabagool ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades + minionBuff)/hypergolic
      }else if(settings.hyperCat == 1)
      {
        ChatLib.chat(`${YELLOW}Using ${RED}Hyper Catalyst ${YELLOW}in ${AQUA}${args} ${YELLOW}minion:`)
        speed = minionActions[item]/(totalMinionUpgrades)
      }else{
        speed = minionActions[item]/(totalMinionUpgrades)
      }
    }
  })
  if(found!=0){
    found = 0
    actionsPerDay = 60/speed*60*24/2
    
    if(settings.hyperCat == 1)
    {
      ChatLib.chat(`${YELLOW}Expected minion speed: ${GREEN}${Math.round(speed*1000)/1000}`)
      ChatLib.chat(`\n${DARK_GREEN}Items generated ${GRAY}per day for 1 minion: ${GREEN}${Math.round(4*(actionsPerDay*1000)/1000)}`)
      ChatLib.chat(`${DARK_GREEN}Spawning ${GRAY}actions per day for 1 minion: ${GREEN}${Math.round(2*actionsPerDay*1000)/1000}\n`)
      ChatLib.chat(`${GRAY}With ${settings.numMinion} minions using Hyper Catalysts, 
${GREEN}${formatDouble(settings.numMinion*actionsPerDay*hyperCatalyst)} ${DARK_GREEN}items are generated ${GRAY}per day`)
      let eItem = settings.numMinion*actionsPerDay*hyperCatalyst/settings.t2Amt
      ChatLib.chat(`${GRAY}This makes ${AQUA}${formatDouble(eItem)} T2 ${GRAY}version of the item`)
      ChatLib.chat(`${GRAY}This makes ${AQUA}${formatDouble(eItem/settings.t3Amt)} T3 ${GRAY}version of the item`)
    }
    else{
      let eItem = settings.numMinion*actionsPerDay/settings.t2Amt
      ChatLib.chat(`${YELLOW}Expected minion speed: ${GREEN}${Math.round(speed*1000)/1000}`)
      ChatLib.chat(`\n${DARK_GREEN}Items generated ${GRAY}per day for 1 minion: ${GREEN}${Math.round(actionsPerDay*1000)/1000}`)
      ChatLib.chat(`${DARK_GREEN}Spawning ${GRAY}actions per day for 1 minion: ${GREEN}${Math.round(2*actionsPerDay*1000)/1000}\n`)
      ChatLib.chat(`${GRAY}With ${settings.numMinion} minions ${GREEN}${formatDouble(settings.numMinion*actionsPerDay)} ${DARK_GREEN}items are generated ${GRAY} per day`)
      ChatLib.chat(`${GRAY}This makes ${GREEN}${formatDouble(eItem)} ${AQUA}T2 ${GRAY}version of the item`)
      ChatLib.chat(`${GRAY}This makes ${GREEN}${formatDouble(eItem/settings.t3Amt)} ${AQUA}T3 ${GRAY}version of the item`)
    }
    ChatLib.chat(`\n${GRAY}With ${settings.numMinion} minions ${GREEN}${formatDouble(settings.numMinion*2*actionsPerDay)} ${DARK_GREEN}spawning ${GRAY}actions are made per day`)
    ChatLib.chat(`${GRAY}With ${settings.numMinion} minions ${GREEN}${formatDouble(settings.numMinion*actionsPerDay)} ${DARK_GREEN}items are generated ${GRAY} per day`)
  }else{
    ChatLib.chat(`${RED}Minion input is not valid. If you need help with minions refer to /speed help`)
  }
}

register("command", (...args) => {
  if(args!="help"){
    calcSpeed(args)
  }else{
    ChatLib.chat(
`${YELLOW}${BOLD}The format of the minions will be like the cobble_stone example below.
${YELLOW}${BOLD}cobble_stone<tier>. tier{1-12}. Ex: cobble_stone1, ..., cobble_stone12.
${RED}${BOLD}Reminder: Some minions do not have a t12 version.
${YELLOW}${BOLD}Here is the list of valid minions names without their tiers:
${YELLOW}${BOLD}acacia\nblaze, birch\ncactus, carrot, cave_spider, chicken, clay\ncoal, cobble_stone, cocoa, cow, creeper\ndark_oak, diamond, emerald, enderman, endstone\nfish, flower\nghast, glowstone, gold, gravel\nhard_stone\nice, inferno, iron\njungle\nlapis\nmagma_cube, mushroom, mycelium\nnether_wart\noak, obsidian\npig, potato, pumpkin\nquartz\nrabbit, red_sand, redstone, revenant\nsand, sheep, skeleton, slime, snow, spider, spruce, sugar_cane\ntarantula\nvoidling\nwheat\nzombie
`)
  }
}).setName("speed");

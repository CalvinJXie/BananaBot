import settings from "../../settings";
import { data } from "../../utils/variables";
import { getPlayerName, registerWhen, formatInt } from "../../utils/functions";

function checkInParty(line, command){
  if(line.indexOf("Party >") == -1) return;
  person = getPlayerName(line.substring(line.indexOf("> ")+2, line.indexOf(":")))
  if(person == Player.getName()) return;
  bl = true;
  data.PartyBL.forEach((player)=>{
    if(line.includes(player)){
      bl = false;
    }
  })
  if(bl){
    setTimeout(() => {
      ChatLib.say(command);
    }, 600)
  }
}

registerWhen(register("chat", (before) => {
  line = "/pc Moooooooooo"
  checkInParty(before, line)
}).setCriteria("${before}!meow"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  line = `/pc [BananaBotCoordinates] x: ${formatInt(Player.getX())}, y: ${formatInt(Player.getY())}, z: ${formatInt(Player.getZ())}`
  checkInParty(before, line)
}).setCriteria("${before}!coords"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  checkInParty(before, "/pc caw caw caw im a duck")
}).setCriteria("${before}?warp"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  checkInParty(before, "/pc stop transferring and use my mod instead")
}).setCriteria("${before}?transfer"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  checkInParty(before, "/l")
}).setCriteria("${before}!l"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  checkInParty(before, "/lobby")
}).setCriteria("${before}!lobby"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  let player = getPlayerName(before)
  if(player == Player.getName()) return;
  checkInParty(before, `/p transfer ${player}`)
}).setCriteria("${before}: !transfer"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  if(data.Party.Leader != Player.getName()) return;
  checkInParty(before, "/p warp")
}).setCriteria("${before}!warp"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  if(data.Party.Leader != Player.getName()) return;
  checkInParty(before, "/p disband")
}).setCriteria("${before}!disband"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  if(data.Party.Leader != Player.getName()) return;
  checkInParty(before, "/p settings allinvite")
}).setCriteria("${before}!allinvite"), () =>settings.PartyCommands)

registerWhen(register("chat", (before, player) => {
  if(data.Party.Leader != Player.getName()) return;
  checkInParty(before, `/p ${player}`)
}).setCriteria("${before}!invite ${player}"), () =>settings.PartyCommands)

registerWhen(register("chat", (before, tier) => {
  if(data.Party.Leader != Player.getName()) return;
  switch(parseInt(tier)){
    case 5:
      ChatLib.say("/joininstance kuudra_infernal")
      break;
    case 4:
      ChatLib.say("/joininstance kuudra_fiery")
      break;
    case 3:
      ChatLib.say("/joininstance kuudra_burning")
      break;
    case 2:
      ChatLib.say("/joininstance kuudra_hot")
      break;
    case 1:
      ChatLib.say("/joininstance kuudra_basic")
      break;
  }
}).setCriteria("${before}!t${tier}"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  checkInParty(before, settings.CustomPartyMessage)
}).setCriteria("${before}"+settings.CustomPartyName), () =>settings.PartyCommands && settings.CustomPartyName != "")
import settings from "../../settings";
import { data } from "../../utils/variables";
import { getPlayerName } from "../../utils/functions";
import { registerWhen } from "../../utils/functions";

function checkInParty(line, command)
{
  if(line.indexOf("Party >") != -1)
  {
    setTimeout(() => {
      ChatLib.say(command);
    }, 400)
  }
}

registerWhen(register("chat", () => {
    ChatLib.say(`MAY DAY MAY DAY I AM IN LIMBO PLEASE UNLIMBO ME`)
}).setChatCriteria("&cYou were spawned in Limbo.&r"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  line = "/pc Moooooooooo"
  checkInParty(before, line)
}).setCriteria("${before}!meow"), () =>settings.PartyCommands)

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
}).setCriteria("${before}!transfer"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  if(data.Party.Leader != Player.getName()) return;
  checkInParty(before, "/p warp")
}).setCriteria("${before}!warp"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  if(data.Party.Leader != Player.getName()) return;
  checkInParty(before, "/p disband")
}).setCriteria("${before}!disband"), () =>settings.PartyCommands)

registerWhen(register("chat", (before, after) => {
  if(data.Party.Leader != Player.getName()) return;
  checkInParty(before, `/joindungeon catacombs ${after}`)
  ChatLib.chat(`Joining Floor ${after}`)
}).setCriteria("${before}!join ${after}"), () =>settings.PartyCommands)

registerWhen(register("chat", (before) => {
  checkInParty(before, settings.CustomPartyMessage)
}).setCriteria("${before}"+settings.CustomPartyName), () =>settings.PartyCommands)

function party(x){
  if(data.Party.Members[x]){
    ChatLib.command(`p ${data.Party.Members[x]}`)
  } 
}   

register("command", () => {
  offset = parseInt(settings.DungeonPingOffset)
  ChatLib.command("p disband")
  setTimeout(()=>{
    party(0);
  }, 300+offset);

  setTimeout(()=>{
    party(1);
  }, 600+offset);

  setTimeout(()=>{
    party(2);
  }, 900+offset);

  setTimeout(()=>{
    party(3);
  }, 1200+offset);
}).setName(settings.RePartyCommand)

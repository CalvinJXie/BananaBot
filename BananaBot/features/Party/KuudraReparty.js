import settings from "../../settings";
import { data } from "../../utils/variables";
import { getPlayerName, registerWhen } from "../../utils/functions";
import { BOLD, GOLD, RED } from "../../utils/constants";

ign = Player.getName();

registerWhen(register("chat", (player1, player2) => {
    player1 = getPlayerName(player1);
    data.Party.Leader = player1
}).setCriteria("The party was transferred to ${player1} by ${player2}"), ()=>settings.kuudraRP)

registerWhen(register("chat", (player1, player2) => {
    player1 = getPlayerName(player1);
    data.Party.Leader = player1
}).setCriteria("The party was transferred to ${player1} because ${player2} left"), ()=>settings.kuudraRP)

registerWhen(register("chat", () =>{
    if(settings.partyTransfer == data.Party.Leader) return;
    if(settings.partyTransfer == "") return;
    ChatLib.command(`p ${settings.partyTransfer}`)
}).setCriteria("[NPC] Elle: Talk with me to begin!"), ()=>settings.kuudraRP && data.Party.Leader == ign)

registerWhen(register("chat", (player) => {
    player = getPlayerName(player);
    if(player.toLowerCase() != settings.partyTransfer.toLowerCase()) return;
    offset = parseInt(settings.KuudraPingOffset)
    ChatLib.command(`p warp`)
    setTimeout(()=>{
        ChatLib.command(`p transfer ${settings.partyTransfer}`)
    }, (300+offset));
    setTimeout(()=>{
        ChatLib.command(`p leave`)
    }, (600+offset));
}).setCriteria("${player} joined the party."), ()=>settings.kuudraRP && data.Party.Leader == ign)

registerWhen(register("chat", () => {
    if(data.Party.Leader != ign) return;
    offset = parseInt(settings.KuudraPingOffset)
    setTimeout(()=>{
        ChatLib.chat(`${GOLD}${BOLD}LEADER ${RED}${BOLD}WARNING`)
    }, 2000)
}).setCriteria("${before}Tokens Earned:${tokens}"), ()=>settings.kuudraRP)

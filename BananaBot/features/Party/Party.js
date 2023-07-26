import { data } from "../../utils/variables";
import settings from "../../settings";
import { YELLOW, GREEN, WHITE } from "../../utils/constants";
import { registerWhen } from "../../utils/functions";

const IGN = Player.getName();

function getPlayerName(name){
    return name.substring(name.indexOf(']')+2, name.length)
}

function removeFromMembers(name){
    index = data.Party.Members.indexOf(name)
    if(index != -1){
        data.Party.Members.splice(index,1)
    }
}

function delMembers(){
    data.Party.Leader = ""
    data.Party.Members = []
}

function addMember(name){
    if(data.Party.Members.indexOf(name) == -1 && name != IGN){
        data.Party.Members.push(name);
    }
}

function party(x){
    if(data.Party.Members[x] != 'undefined'){
        ChatLib.command(`p ${data.Party.Members[x]}`)
    }
}   

dungeonParty = [];
//dungeon party  
registerWhen(register("chat", (player) =>{
    player = getPlayerName(player);
    if(player == IGN) return;
    dungeonParty.push(player);
}).setCriteria("${player} warped to your dungeon"), () => settings.AutoRejoin)

registerWhen(register("chat", (player) =>{
    player = getPlayerName(player);
    if(player == IGN) return;
    dungeonParty.push(player);
}).setCriteria("${player} cannot warp from Limbo" ), () => settings.AutoRejoin)

registerWhen(register("chat", (player) =>{
    player = getPlayerName(player);
    if(player == IGN) return;
    dungeonParty.push(player);
}).setCriteria("${player} is not allowed on your server!" ), () => settings.AutoRejoin)

/*-----------------------------------------------------
[VIP] positivecoin has invited you to join [MVP+] NegativeCoin's party!
You have 60 seconds to accept. Click here to join!
-----------------------------------------------------
*/

registerWhen(register("chat", () =>{
    offset = parseInt(settings.DungeonPingOffset)
    if(dungeonParty){
        data.Party.Members = dungeonParty;
        ChatLib.command("p disband")
        setTimeout(()=>{
            party(0);
        }, (300+offset));

        setTimeout(()=>{
            party(1);
        }, (600+offset));

        setTimeout(()=>{
            party(2);
        }, (900+offset));

        setTimeout(()=>{
            party(3);
        }, (1200+offset));
    }
    dungeonParty = [];
}).setCriteria("${player} has started the dungeon countdown. The dungeon will begin in 1 minute." ), () => settings.AutoRejoin && IGN == data.Party.Leader)

isLeader = false;
//disbanding
register("chat", () => {
    if(settings.AutoRejoin || settings.reParty) return;
    delMembers();
}).setCriteria("${player} has disbanded the party!")

register("chat", () => {
    delMembers();
}).setCriteria("The party was disbanded because all invites expired and the party was empty.")

register("chat", () => {
    delMembers();
}).setCriteria("The party was disbanded because the party leader disconnected.")

register("chat", () => {
    if(settings.kuudraRP) return;
    delMembers();
}).setCriteria("You left the party.")

register("chat", () => {
    delMembers();
}).setCriteria("You are not in a party right now.")

register("chat", () => {
    delMembers();
}).setCriteria("You are not currently in a party.")

register("chat", () => {
    delMembers();
}).setCriteria("You have been kicked from the party by ${player}")

register("chat", (player) => {
    player = getPlayerName(player);
    removeFromMembers(player);
}).setCriteria("${player} was removed from your party because they disconnected.")

register("chat", (player) => {
    player = getPlayerName(player);
    removeFromMembers(player);
}).setCriteria("${player} has been removed from the party.")

register("chat", (player) => {
    player = getPlayerName(player);
    removeFromMembers(player);
}).setCriteria("${player} has left the party.")

//tracks leader
register("chat", (player1, player2) => {//party transfer manual
    player1 = getPlayerName(player1);
    player2 = getPlayerName(player2);
    data.Party.Leader = player1;
    removeFromMembers(player1);
    addMember(player2)
}).setCriteria("The party was transferred to ${player1} by ${player2}")

register("chat", (player1, player2) => {//party promote
    player1 = getPlayerName(player1);
    player2 = getPlayerName(player2);
    data.Party.Leader = player1;
    removeFromMembers(player1);
    addMember(player2)
}).setCriteria("${player1} has promoted ${player2} to Party Leader")

register("chat", (player1, player2) => {//party transferred for leaving
    player1 = getPlayerName(player1);
    player2 = getPlayerName(player2);
    data.Party.Leader = player1;
    removeFromMembers(player1);
    removeFromMembers(player2);
}).setCriteria("The party was transferred to ${player1} because ${player2} left")

register("chat", (player) => {
    player = getPlayerName(player);
    data.Party.Leader = player;
}).setCriteria("${player} invited ${player2}")

//User joins party
register("chat", (player) => {
    player = getPlayerName(player);
    data.Party.Leader = player;
    removeFromMembers(player);
}).setCriteria("You have joined ${player}'s party!")

register("chat", (player) => {
    player = getPlayerName(player);
    addMember(player)
}).setCriteria("${player} joined the party.")

//Get other members of party
register("chat", (players) => {
    data.Party.Members = players.match(/\[(.*?)\]\s(\w+)/g).map(function(match) {
        return match.split(' ')[1];
    });
}).setCriteria("You'll be partying with: ${players}")

register("chat", (player) => {
    player = getPlayerName(player).toLowerCase();
    if(data.PartyWL.indexOf(player) != -1 && settings.PartyAutoJoinList){
        ChatLib.command(`p join ${player}`)
    }else if(settings.PartyAutoJoinLead && data.Party.Leader == player){
        ChatLib.command(`p join ${player}`)
    }else if(settings.PartyAutoJoinAny){
        ChatLib.command(`p join ${player}`)
    }
}).setCriteria("${player} has invited you to join their ${after}")

register("command", () => {
    ChatLib.chat(`${YELLOW}Reset party member list`)
    delMembers();
}).setName("resetparty")

register("command", (...args) => {
    if(args[1]){
        args[1] = args[1].toLowerCase();
    }
    if(args[0] == "add"){
        if(data.PartyWL.indexOf(args[1]) == -1){
            data.PartyWL.push(args[1])
            ChatLib.chat(`${YELLOW}Added ${GREEN}${args[1]} ${YELLOW}to the party join list`)
        }else{
            ChatLib.chat(`${YELLOW}User ${GREEN}${args[1]} ${YELLOW}is already in the list /joinlist show to see users added`)
        }
    }else if(args[0] == "remove"){
        if(args[1] == "all"){
            data.PartyWL = [];
        }else{
            index = data.PartyWL.indexOf(args[1])
            if(index != -1){
                data.PartyWL.splice(index, 1)
            }
            if(data.PartyWL.indexOf(args[1]) == -1){
                ChatLib.chat(`${YELLOW}Removed ${GREEN}${args[1]} ${YELLOW}from the party join list`)
            }
        }
    }else if(args[0] == "show"){
        let listNames = `${YELLOW}Users in list: ${WHITE}`
        size = data.PartyWL.length
        for(let i = 0;i<size;i++){
            if(i == size-1){
                listNames += data.PartyWL[i]
            }else{
                listNames += data.PartyWL[i] + ", "
            }  
        }
        ChatLib.chat(listNames)
    }
    else{
        ChatLib.chat(`${YELLOW}Invalid argument, please only do /joinlist (add, remove, show). If add/remove put a valid username afterwards like /joinlist add BananaTheBot`)
    }
}).setName("joinlist")

register("chat", () => {
    delMembers();
}).setCriteria("Welcome to Hypixel SkyBlock!");
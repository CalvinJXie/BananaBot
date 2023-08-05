import { data } from "../../utils/variables";
import settings from "../../settings";
import { YELLOW, GREEN, WHITE, LOGO } from "../../utils/constants";
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

isLeader = false;
//disbanding
register("chat", () => {
    delMembers();
}).setCriteria("${player} has disbanded the party!")

register("chat", () => {
    delMembers();
}).setCriteria("The party was disbanded because all invites expired and the party was empty.")

register("chat", () => {
    delMembers();
}).setCriteria("The party was disbanded because the party leader disconnected.")

register("chat", () => {
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
register("chat", (player1, player2) => {//party promote
    player1 = getPlayerName(player1);
    player2 = getPlayerName(player2);
    if(data.Party.Leader == ""){
        data.Party.Leader = player1;
    }
}).setCriteria("${player1} invited ${player2} to the party!")

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
            ChatLib.chat(`${LOGO}${YELLOW}Added ${GREEN}${args[1]} ${YELLOW}to the party join list`)
        }else{
            ChatLib.chat(`${LOGO}${YELLOW}User ${GREEN}${args[1]} ${YELLOW}is already in the whitelist /joinlist show bl to show users in whitelist`)
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
                ChatLib.chat(`${LOGO}${YELLOW}Removed ${GREEN}${args[1]} ${YELLOW}from the whitelist`)
            }
        }
    }else if(args[0] == "show"){
        if(args[1] == "wl"){
            let listNames = `${LOGO}${YELLOW}Users in list: ${WHITE}`
            size = data.PartyWL.length
            for(let i = 0;i<size;i++){
                if(i == size-1){
                    listNames += data.PartyWL[i]
                }else{
                    listNames += data.PartyWL[i] + ", "
                }  
            }
            ChatLib.chat(listNames)
        }else if(args[1] == "bl"){
            let listNames = `${LOGO}${YELLOW}Users in list: ${WHITE}`
            size = data.PartyBL.length
            for(let i = 0;i<size;i++){
                if(i == size-1){
                    listNames += data.PartyBL[i]
                }else{
                    listNames += data.PartyBL[i] + ", "
                }  
            }
            ChatLib.chat(listNames)
        }else{
            ChatLib.chat(`${LOGO}${YELLOW}Only available arguments are bl and wl. /joinlist show bl/wl`)
        } 
    }else if(args[0] == "bl"){
        if(data.PartyBL.indexOf(args[1]) == -1){
            data.PartyBL.push(args[1])
            ChatLib.chat(`${LOGO}${YELLOW}Added ${GREEN}${args[1]} ${YELLOW}to the party commands blacklist`)  
        }else{
            ChatLib.chat(`${LOGO}${YELLOW}User ${GREEN}${args[1]} ${YELLOW}is already in the blacklist /joinlist show bl to show users in blacklist`)
        }
    }else if(args[0] == "blr"){
        if(args[1] == "all"){
            data.PartyBL = [];
        }else{
            index = data.PartyBL.indexOf(args[1])
            if(index != -1){
                data.PartyBL.splice(index, 1)
            }
            if(data.PartyBL.indexOf(args[1]) == -1){
                ChatLib.chat(`${LOGO}${YELLOW}Removed ${GREEN}${args[1]} ${YELLOW}from the blacklist`)
            }
        }
    }else{
        ChatLib.chat(`${LOGO}${YELLOW}Invalid argument, please only do /joinlist (add <name>, remove <name/all>, show <bl/wl>, bl <name>, blr <name/all>). Ex: /joinlist bl BananaTheBot, /joinlist blr BananaTheBot. Adds/removes BananaTheBot to blacklist`)
    }
}).setName("joinlist")

register("chat", () => {
    delMembers();
}).setCriteria("Welcome to Hypixel SkyBlock!");

register("command", (args)=>{
    ChatLib.say(`/p transfer ${args}`)
}).setName("pt")
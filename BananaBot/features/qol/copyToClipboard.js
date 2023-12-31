import { LOGO, RED, YELLOW } from "../../utils/constants";
import { registerWhen } from "../../utils/functions";
import settings from "../../settings";

let chatHistory = [];
/*
GuiChat
GuiInventory
GuiIngameMenu
SettingsGui
GuiChest
*/
registerWhen(register("ChatComponentClicked", (chatMessage) => {
    const clickedText = chatMessage.text.removeFormatting();
    const foundMsg = chatHistory.find((entry)=>entry.includes(clickedText));
    if(foundMsg != undefined){
        ChatLib.command(`ct copy ${foundMsg}`, true)
    }else{
        ChatLib.command(`ct copy ${clickedText}`, true)
    }
    if(!settings.copyChatNotifier) return;
    if(foundMsg){
        ChatLib.chat(`${LOGO}${YELLOW}Text Copied!`)
    }else{
        ChatLib.chat(`${LOGO}${RED}Error: Could not find the matching history entry. The copy may be wrong.`);
    }
}), ()=> settings.copyChat);

registerWhen(register("chat", (event)=>{
    if(!settings.copyChat || ChatLib.getChatMessage(event) == " ") return;
    word = ChatLib.getChatMessage(event, false).removeFormatting();
    if(chatHistory.length >= parseInt(settings.historySize)){
        chatHistory.shift();
    }
    chatHistory.push(word);
}), ()=> settings.copyChat);
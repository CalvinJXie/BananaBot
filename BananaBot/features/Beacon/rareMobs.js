import { sendCoords } from "../../utils/functions";
import { registerWhen } from "../../utils/functions";
import settings from "../../settings";

registerWhen(register("chat", ()=>{
    sendCoords("Vanquisher")
}).setCriteria("A Vanquisher is spawning nearby!"), ()=>settings.vanqBeam);

registerWhen(register("chat", ()=>{
    sendCoords("Gaia Construct")
}).setCriteria("${before} You dug out a Gaia Construct!"), ()=>settings.gaiaBeam);

registerWhen(register("chat", ()=>{
    sendCoords("Minos Champion")
}).setCriteria("${before} You dug out a Minos Champion!"), ()=>settings.champBeam);

registerWhen(register("chat", ()=>{
    sendCoords("Minos Inquisitor")
}).setCriteria("${before} You dug out a Minos Inquisitor!"), ()=>settings.inquisBeam);


//&b ☺ &eA &aGreen Jerry&e appeared!&r

registerWhen(register("chat", ()=>{
    sendCoords("Green Jerry")
}).setChatCriteria("&b ☺ ${before}Green Jerry${after}"), () => settings.greenJerryBeam);

registerWhen(register("chat", ()=>{
    sendCoords("Blue Jerry")
}).setChatCriteria("&b ☺ ${before}Blue Jerry${after}"), () => settings.blueJerryBeam);

registerWhen(register("chat", ()=>{
    sendCoords("Purple Jerry")
}).setChatCriteria("&b ☺ ${before}Purple Jerry${after}"), () => settings.purpleJerryBeam);

registerWhen(register("chat", ()=>{
    sendCoords("Golden Jerry")
}).setChatCriteria("&b ☺ ${before}Golden Jerry${after}"), () => settings.goldenJerryBeam);
import settings from "../../settings";
import { GRAY, BOLD, GREEN } from "../../utils/constants";
import { formatDouble, logFactorial } from "../../utils/functions";

N = 0 // number of experiments
X = 0 // number of desired success
P = 0 // probability of success
Q = 0 // probability of fail

function calcBinom(XSucc) {
  const logBinomialCoeff = logFactorial(N) - logFactorial(XSucc) - logFactorial(N - XSucc);
  const prob = Math.exp(logBinomialCoeff) * Math.pow(P, XSucc) * Math.pow(Q, N - XSucc);
  return prob;
}

function displayStats(){
    leftProb = 0;
    for(let i = 0;i<=X;i++){
        leftProb += calcBinom(i);
    }
    const mean = N*P
    const variance = N*P*(Q)
    const stddev = Math.sqrt(variance)
    ChatLib.chat(`${GRAY}${BOLD}There is a ${GREEN}${BOLD}${formatDouble(calcBinom(X) * 100)}%${GRAY}${BOLD} chance to get exactly ${X} items`);
    ChatLib.chat(`${GRAY}${BOLD}There is a ${GREEN}${BOLD}${formatDouble(leftProb * 100)}%${GRAY}${BOLD} chance to get ${X} or lower items`);
    ChatLib.chat(`${GRAY}${BOLD}Mean = ${GREEN}${BOLD}${formatDouble(mean)}`)
    ChatLib.chat(`${GRAY}${BOLD}Standard Deviation = ${GREEN}${BOLD}${formatDouble(stddev)}`)
    ChatLib.chat(`${GRAY}${BOLD}Variance = ${GREEN}${BOLD}${formatDouble(variance)}`)
}

register("command", () => {
  N = parseInt(settings.BinomN); // number of experiments
  X = parseInt(settings.BinomX); // number of desired success
  P = parseFloat(settings.BinomP); // probability of success
  Q = 1 - P; // probability of fail
  displayStats();
}).setName("binom");

register("command", (...args) => {
  switch(args[1]){
    case '*':
      ChatLib.chat(parseInt(args[0]) * parseInt(args[2]))
      break;
    case '/':
      ChatLib.chat(parseInt(args[0]) / parseInt(args[2]))
      break;
    case '+':
      ChatLib.chat(parseInt(args[0]) + parseInt(args[2]))
      break;
    case '-':
      ChatLib.chat(parseInt(args[0]) - parseInt(args[2]))
      break;
    case '%':
      ChatLib.chat(parseInt(args[0]) % parseInt(args[2]))
      break;
    default:
      ChatLib.chat(`${YELLOW}Only (*/+-%) is allowed as middle argument. Please only use 1 number on each side of the operater and put a space between each. Ex: /calc 4 * 4 or /calc 114234 / 14`)
      break;
  }
}).setName("calc");
import { YELLOW, RED, BOLD, RESET, GRAY } from './utils/constants';
import {
    @Vigilant,
    @SwitchProperty,
    @TextProperty,
    @SelectorProperty,
    @SliderProperty,
} from '../Vigilance/index';

@Vigilant("BananaBot", "BananaBot", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
            "Minion Data",
            "QOL",
            "Kuudra",
            "Beacon Beams",
            "Trackers",
            "Garden",
            "Economy",
            "Party",
            "Slayer",
            "Statistics",
            "Minion Speeds",
            "Rift",
        ];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    },
})
class settings {
    //Beacon beams
    @SwitchProperty({
        name: "Waypoint Beam",
        description: `Displays waypoint beam at specified other BananaBot coordinate user.`,
        category: "Beacon Beams",
        subcategory: "Beams"
    })
    showBeam = false

    @SwitchProperty({
        name: "Vanquisher",
        description: `Displays vanquisher coordinates.`,
        category: "Beacon Beams",
        subcategory: "Nether"
    })
    vanqBeam = false

    @SwitchProperty({
        name: "Gaia Construct",
        description: `Displays Gaia Construct coordinates.`,
        category: "Beacon Beams",
        subcategory: "Diana"
    })
    gaiaBeam = false

    @SwitchProperty({
        name: "Inquisitor",
        description: `Displays Inquisitor coordinates.`,
        category: "Beacon Beams",
        subcategory: "Diana"
    })
    inquisBeam = false

    @SwitchProperty({
        name: "Minos Champion",
        description: `Displays Minos Champion coordinates.`,
        category: "Beacon Beams",
        subcategory: "Diana"
    })
    champBeam = false

    @SwitchProperty({
        name: "Guild Chat",
        description: `Display coordinates in Guild chat. If neither party/guild chosen then its in whatever chat you are in.`,
        category: "Beacon Beams",
        subcategory: "Display Location"
    })
    beaconGuild = false

    @SwitchProperty({
        name: "Party Chat",
        description: `Display coordinates in Party chat. If neither party/guild chosen then its in whatever chat you are in.`,
        category: "Beacon Beams",
        subcategory: "Display Location"
    })
    beaconParty = true
    //Kuudra
    @SwitchProperty({
        name: "Kuudra Profit",
        description: `Displays profit per chest.`,
        category: "Kuudra",
        subcategory: "Kuudra Profit"
    })
    kuudraProfit = false

    @SwitchProperty({
        name: "Kuudra Teeth Profit",
        description: `Adds teeth into total profit.`,
        category: "Kuudra",
        subcategory: "Kuudra Profit"
    })
    kuudraTeeth = false

    @SwitchProperty({
        name: "lvl 100 Kuudra Pet",
        description: `includes lvl 100 pet into essence calculation. Enable if you have one otherwise its base essence amount.`,
        category: "Kuudra",
        subcategory: "Kuudra Profit"
    })
    maxKuudraPet = true

    @SwitchProperty({
        name: "Key cost",
        description: `Enable to use Enchanted Mycelium, turn off to use Enchanted Red Sand.`,
        category: "Kuudra",
        subcategory: "Kuudra Profit"
    })
    kuudraCalcMyc = true

    //Trackers
    @SwitchProperty({
        name: "Bestiary",
        description: `Hover over each mob inside your bestiary menu to store the data. Type /br <mobname> to display kills remaining. /br all to display all missing. /br clear <mobname> to manually remove a mob.`,
        category: "Trackers",
        subcategory: " Bestiary"
    })
    trackBestiary = false;

    @SwitchProperty({
        name: "Display fishing catch",
        description: `Types in chat (party chat) when a rare sea creature gets caught and its coords.`,
        category: "Trackers",
        subcategory: " Bestiary"
    })
    displayRareFish = false;

    @TextProperty({
        name: "Fishing trigger",
        description: `Write what text to trigger on for you to display how many of what type of fish you caught before that text.`,
        category: "Trackers",
        subcategory: " Bestiary"
    })
    fishCountTrigger = "GO RATS";

    @TextProperty({
        name: "Fishing countdown",
        description: `Counts down in chat. Set hotkey in mc controls (start cd).`,
        category: "Trackers",
        subcategory: " Bestiary"
    })
    fishCountDown = "4";

    @TextProperty({
        name: "Powder Alias",
        description: `write your own alias. Instead of /powder or /pow you can use your own.`,
        category: "Trackers",
        subcategory: "Aliases"
    })
    powAlias = "powd"

    @TextProperty({
        name: "Skill Alias",
        description: `write your own alias. Instead of /skill or /sk you can use your own.`,
        category: "Trackers",
        subcategory: "Aliases"
    })
    skillAlias = "s"

    @SwitchProperty({
        name: "Remind Me",
        description: `Enable to show a remind tracker. /remindme or /remind or /rme <name> <days, hours, mins, secs>. Example up in subcat area.`,
        category: "Trackers",
        subcategory: "Reminder"
    })
    trackRemind = false;
    //Daily
    @SwitchProperty({
        name: "Track Dailies",
        description: `Type /daily. This tracks time till cake, matriarch perfume, eyedrops, caducous feeder resets. `,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackDaily = false;

    @SwitchProperty({
        name: "Display Timers",
        description: `Enable to display the timers on screen.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    dailyDisplay = false;

    @SwitchProperty({
        name: "Track Caducous Feeder",
        description: `Enable to track Caducous Feeder. Spam the feeder till it says added Caducous Feeder timer.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackFeeder = false;

    @SwitchProperty({
        name: "Track Matriarch Perfume",
        description: `Enable to track Matriarch Perfume. Use the perfume inside matriarch until it says added Matriarch Timer.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackPerfume = false;

    @SwitchProperty({
        name: "Track Century Cake",
        description: `Enable to track Century Cake. Make sure it says added Cake Timer in chat.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackCake = false;

    @SwitchProperty({
        name: "Track Capsaicin Eyedrops",
        description: `Enable to track Capsaicin Eyerops. Make sure it says added Capsaicin Eyedrop Timer in chat.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackEyedrop = false;

    @SwitchProperty({
        name: "Track Hiker",
        description: `Enable to include Hiker in your tracker until you are finished.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackHiker = false;

    @SwitchProperty({
        name: "Track Garden Visitors",
        description: `Enable to track Garden Visitors. Make sure it says added Garden Visitor Timer in chat.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackVisitor = false;

    @SwitchProperty({
        name: "Track Active Raffle",
        description: `Enable to track Active Raffle. Make sure it says added Raffle Timer in chat.`,
        category: "Trackers",
        subcategory: "Dailies"
    })
    trackRaffle = false;
    //Garden
    @SwitchProperty({
        name: "Visitor Profit",
        description: `Displays coin per copper cost. Equation = coin/copper. May mess up if another mod is doing stuff to lore.`,
        category: "Garden",
        subcategory: "Visitors"
    })
    gardenVP = false;

    @TextProperty({
        name: "Copper To Coin ratio",
        description: `input coin to copper maximum pay in thousands. Will display green if under or red if over. Ex. 9 = 9000, will show green if ratio is under 9,000`,
        category: "Garden",
        subcategory: "Visitors"
    })
    ctcRatio = "7"

    @TextProperty({
        name: "Composter Speed",
        description: `input composter speed level`,
        category: "Garden",
        subcategory: "Composter"
    })
    compostSpeed = "25"

    @TextProperty({
        name: "Composter Multi Drop",
        description: `input composter multi drops level`,
        category: "Garden",
        subcategory: "Composter"
    })
    compostMulti = "25"

    @TextProperty({
        name: "Composter Cost Reduction",
        description: `input composter cost reduction level`,
        category: "Garden",
        subcategory: "Composter"
    })
    compostReduce = "25"

    //Party
    @SwitchProperty({
        name: "Party commands",
        description: `Type in party chat !(lobby, l, meow, transfer, warp, disband). Make sure an ! is infront of each word.`,
        category: "Party",
        subcategory: "Party"
    })
    PartyCommands = false;

    @SwitchProperty({
        name: "Party Auto Join List Only",
        description: `/list wl/wlr/bl/blr/show. Ex: /list wl BananaTheBot, /list wlr BananaTheBot/all, /list show wl`,
        category: "Party",
        subcategory: "Auto Join"
    })
    PartyAutoJoinList = false;

    @SwitchProperty({
        name: "Party Auto Join Anyone",
        description: `Turn this on and it will join any players party if partied.`,
        category: "Party",
        subcategory: "Auto Join"
    })
    PartyAutoJoinAny = false;

    @TextProperty({
        name: "Custom Party Name",
        description: `input a custom party name like !who`,
        category: "Party",
        subcategory: "Party"
    })
    CustomPartyName = ""

    @TextProperty({
        name: "Custom Party Message",
        description: `input a custom party message like when !who is said in party chat, user types "cares" (if command put a slash)`,
        category: "Party",
        subcategory: "Party"
    })
    CustomPartyMessage = ""

    //Slayer
    @SwitchProperty({
        name: "Total Kill Time",
        description: `Turn on or off to show total kill time for slayer (spawn + kill)`,
        category: "Slayer",
        subcategory: "Time"
    })
    TotalKillTime = false;

    //Slayer Calc
    @TextProperty({
        name: "Magic Find",
        description: `Input your magic find`,
        category: "Slayer",
        subcategory: "Slayer Calculations"
    })
    mf = "180"

    @TextProperty({
        name: "Slayer Cost",
        description: `Input the cost for your slayer spawn(23.75k,25k during aatrox, 47.5k,50k without) Type the numbers in thousands. Ex:50 = 50,000`,
        category: "Slayer",
        subcategory: "Slayer Calculations"
    })
    slayerCost = "23750"

    @TextProperty({
        name: "Kills Per Hour",
        description: `Input amount of kills per hour`,
        category: "Slayer",
        subcategory: "Slayer Calculations"
    })
    slayerKPH = "360"

    @SwitchProperty({
        name: "Auto Update Bazaar",
        description: `Automatically updates bazaar prices every 10 minutes. Really good performance. /ubz if you want to manually u pdate.`,
        category: "Economy",
        subcategory: "Auto"
    })
    autoUpdateBz = true;

    @SwitchProperty({
        name: "Display enchant cost",
        description: `Displays enchant cost and gemstone cost of an item in lore.`,
        category: "Economy",
        subcategory: "Item Cost"
    })
    displayRawCost = false;

    //Auction
    @SwitchProperty({
        name: "Auction Item Search Loop",
        description: `Turn on or off if you want a constant loop for newest auction of an item`,
        category: "Economy",
        subcategory: "Search loop"
    })
    loopAuction = false;

    @TextProperty({
        name: "Item Price",
        description: `Input max price you are willing to buy hydra heads at in millions. E.g. (1.5 = 1,500,000)`,
        category: "Economy",
        subcategory: "Search loop"
    })
    AuctionPrice = "2"

    @TextProperty({
        name: "Item Name",
        description: `Input the full name of an item partial may work idk, E.g. (Water Hydra Head)`,
        category: "Economy",
        subcategory: "Search loop"
    })
    AuctionItem = "Enchanted Book Bundle"

    @TextProperty({
        name: "Item Lore",
        description: `Input the full item lore, can be partial`,
        category: "Economy",
        subcategory: "Search loop"
    })
    AuctionItemLore = "Quantum"

    @TextProperty({
        name: "Loop Time",
        description: `Input time in seconds you want the loop to search for (lower times = more cpu usage but faster results). `,
        category: "Economy",
        subcategory: "Search loop"
    })
    loopTimer = "66"

   //Bazaar
   @SwitchProperty({
    name: "Bazaar",
    description: `turn on/off notifications when outbid on bazaar`,
    category: "Economy",
    subcategory: "Notifications"
    })
    bzNotif = false

    @TextProperty({
        name: "Bazaar Notifier Timer",
        description: `Input the time interval of the bazaar check. Smaller number = more checks, but bad on pc.`,
        category: "Economy",
        subcategory: "Notifications"
    })
    BzNotifTimer = "10"

    @TextProperty({
        name: "Number of tries",
        description: `Input the amount of tries for the drop. Ex. 195 days (small sample sizes will not be very accurate.)`,
        category: "Statistics",
        subcategory: "Binomial Distribution"
    })
    BinomN = "195"

    @TextProperty({
        name: "Probability of the drop",
        description: `Input the probability for the drop. Ex. (minion day speed/drop rate for vertex) 3600/12588 = .2859866, put in decimal form since I dont want to divide for you. Do /calc and follow from there for in game calculator.`,
        category: "Statistics",
        subcategory: "Binomial Distribution"
    })
    BinomP = ".2859866"

    @TextProperty({
        name: "Amount of times dropped",
        description: `Input number of times you drop the item. Ex. 15 vertex drops`,
        category: "Statistics",
        subcategory: "Binomial Distribution"
    })
    BinomX = "15"

    //Minion Speeds 
    @TextProperty({
        name: "Number of minions",
        description: `Input number of minions you want to find total actions per day of.`,
        category: "Minion Speeds",
        subcategory: "Minion Count"
    })
    numMinion = "31"

    @TextProperty({
        name: "Pet Speed",
        description: `Input any pet speed multiplier. E.g. lvl 100 rabbit = 30`,
        category: "Minion Speeds",
        subcategory: "Pets"
    })
    petSpeed = "0"

    @TextProperty({
        name: "Fly Catcher",
        description: `Input any minion upgrade multipliers ${RED}THERE CAN ONLY BE 2! ${RESET}E.g. 2 fly catchers = 2`,
        category: "Minion Speeds",
        subcategory: "Minion Upgrade Slots"
    })
    flyAmt = "2"

    @TextProperty({
        name: "Minion Expander",
        description: `Input any minion upgrade multipliers${RED}THERE CAN ONLY BE 2! ${RESET}E.g. 2 fly catchers = 2`,
        category: "Minion Speeds",
        subcategory: "Minion Upgrade Slots"
    })
    expandAmt = "0"

    @TextProperty({
        name: "Regular Power Crystal",
        description: `Input beacon fuel (assuming t5) if you are using scorched put ${RED}1${RESET}, if you are not using scorched put ${RED}0${RESET}. Same for beacon/infusion.`,
        category: "Minion Speeds",
        subcategory: "Beacons and Infusions"
    })
    beaconAmt = "0"

    @TextProperty({
        name: "Scorched Power Crystal",
        description: `Input beacon fuel (assuming t5) if you are using scorched put ${RED}1${RESET}, if you are not using scorched put ${RED}0${RESET}. Same for beacon/infusion.`,
        category: "Minion Speeds",
        subcategory: "Beacons and Infusions"
    })
    scorchAmt = "1"

    @TextProperty({
        name: "Minion Infusion",
        description: `Input beacon fuel (assuming t5) if you are using scorched put ${RED}1${RESET}, if you are not using scorched put ${RED}0${RESET}. Same for beacon/infusion.`,
        category: "Minion Speeds",
        subcategory: "Beacons and Infusions"
    })
    infusionAmt = "0"

    @TextProperty({
        name: "Eternal Flame",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Minion Fuel"
    })
    flameAmt = "0"

    @TextProperty({
    name: "Hyper Catalyst",
    description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
    category: "Minion Speeds",
    subcategory: "Minion Fuel"
    })
    hyperCat = "0"

    @TextProperty({
        name: "Plasma Bucket",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Minion Fuel"
    })
    plasmaAmt = "0"

    @TextProperty({
        name: "Magma Bucket",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Minion Fuel"
    })
    magmaAmt = "0"

    @TextProperty({
        name: "Lava Bucket",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Minion Fuel"
    })
    lavaAmt = "0"

    @TextProperty({
        name: "Foul Flesh",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Minion Fuel"
    })
    foulAmt = "0"

    @TextProperty({
        name: "Hamster Wheel",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Minion Fuel"
    })
    wheelAmt = "0"

    @TextProperty({
        name: "T2 Version",
        description: `Input amount of items needed to craft next tier of an item.`,
        category: "Minion Speeds",
        subcategory: "Item Calculations"
    })
    t2Amt = "160"   

    @TextProperty({
        name: "T3 Version",
        description: `Input amount of items needed to craft next tier of an item.`,
        category: "Minion Speeds",
        subcategory: "Item Calculations"
    })
    t3Amt = "15" 

    @TextProperty({
        name: "Fuel Gabagool",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Inferno Minion Fuel"
    })
    fuelGabaAmt = "0"

    @TextProperty({
        name: "Heavy Gabagool",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Inferno Minion Fuel"
    })
    heavyGabaAmt = "0"

    @TextProperty({
        name: "Hypergolic Gabagool",
        description: `Input Minion Fuel: input ${RED}1${RESET} if you are using, ${RED}0${RESET} if you are not. If you are using one make sure every other fuel property is ${RED}${BOLD}0 `,
        category: "Minion Speeds",
        subcategory: "Inferno Minion Fuel"
    })
    HypergolicAmt = "0"

    @TextProperty({
        name: "Amount of Inferno Minions",
        description: `Input total amount of inferno minions used up to ${RED}10 MAX`,
        category: "Minion Speeds",
        subcategory: "Inferno Minion Fuel"
    })
    minionAmt = "10"
    
    //QOL
    @SwitchProperty({
        name: "Copy Chat Message",
        description: `Copies chat message when clicked (left click).`,
        category: "QOL",
        subcategory: "Chat"
    })
    copyChat = false;

    @SwitchProperty({
        name: "Copy Chat Notifier",
        description: `Turn on to disable the notification in chat`,
        category: "QOL",
        subcategory: "Chat"
    })
    copyChatNotifier = false;

    @TextProperty({
        name: "Chat History",
        description: `Input how far back chat history will store that you can copy to clipboard.`,
        category: "QOL",
        subcategory: "Chat"
    })
    historySize = "50";

    @SwitchProperty({
        name: "Broken Hyperion",
        description: `Uses ${RED}<Book of Stats> ${RESET}and ${RED}<Champion> ${RESET}to track when Wither Impact breaks.`,
        category: "QOL",
        subcategory: "Combat"
    })
    brokenHyp = false;

    @SwitchProperty({
        name: "Show Item Timer",
        description: `Displays an items cooldown timer if it has any.`,
        category: "QOL",
        subcategory: "Item Timer"
    })
    ItemTimer = false;

    @TextProperty({
        name: "Item Action Name",
        description: "Input the action name of the item ex: Fire Veil (Fire Veil Wand)",
        category: "QOL",
        subcategory: "Item Timer"
    })
    ItemTimerName = "Fire Veil";

    @TextProperty({
        name: "Item Duration",
        description: "Input how long item duration lasts ex: 5 seconds (Fire Veil Wand)",
        category: "QOL",
        subcategory: "Item Timer"
    })
    ItemDuration = "5";

    @TextProperty({
        name: "Persistant Command",
        description: "Runs the command you want to run every x seconds. To toggle the command press default (p) or change in control settings (pickupstash has 3 seconds base)",
        category: "QOL",
        subcategory: "Commands"
    })
    command = "pickupstash";

    @TextProperty({
        name: "Time Loop",
        description: "Runs the command you want to run every x seconds. To toggle the command press default (p) or change in control settings (pickupstash has 3 seconds base)",
        category: "QOL",
        subcategory: "Commands"
    })
    commandTime = "3";

    //Rift
    //Blood Ichor
    @SwitchProperty({
        name: "Show Blood Ichor timer",
        description: `Turn on to show Blood Ichor on Screen`,
        category: "Rift",
        subcategory: "Blood Ichor"
        })
        BloodIchor = false;

    @TextProperty({
        name: "X-Scale",
        description: 'Input X-Scaling',
        category: "Rift",
        subcategory: "Blood Ichor"
    })
    BIScaleX = "2"

    @TextProperty({
        name: "Y-Scale",
        description: 'Input Y-Scaling',
        category: "Rift",
        subcategory: "Blood Ichor"
    })
    BIScaleY = "2"

    //Twin Claw
    @SwitchProperty({
        name: "Show Twin Claw timer",
        description: `Turn on to show Twin Claw on Screen`,
        category: "Rift",
        subcategory: "Twin Claw"
        })
        twinClaw = false;

    @TextProperty({
        name: "X-Scale",
        description: 'Input X-Scaling',
        category: "Rift",
        subcategory: "Twin Claw"
    })
    VampScaleX = "2"

    @TextProperty({
        name: "Y-Scale",
        description: 'Input Y-Scaling',
        category: "Rift",
        subcategory: "Twin Claw"
    })
    VampScaleY = "2"

    //Effigy
    @SwitchProperty({
        name: "Effigy Timer",
        description: `Shows Effigy Timers`,
        category: "Rift",
        subcategory: "Effigy"
        })
        effigyTimer = false;

    //Vampire Health
    @SwitchProperty({
        name: "Vampire Excute",
        description: `Turn on to show vampire health on screen and when it is executable.`,
        category: "Rift",
        subcategory: "Vampire Execute"
        })
    vampHealth = false;

    @TextProperty({
        name: "X-Scale",
        description: 'Input X-Scaling',
        category: "Rift",
        subcategory: "Vampire Execute"
    })
    VampHpScaleX = "2"

    @TextProperty({
        name: "Y-Scale",
        description: 'Input Y-Scaling',
        category: "Rift",
        subcategory: "Vampire Execute"
    })
    VampHpScaleY = "2"
    
    //Inferno Mininons
    @TextProperty({
        name: "Hydra Heads",
        description: 'Input the price of hydra heads in millions. E.g. 1 = 1m',
        category: "Minion Data",
        subcategory: "/ah Prices"
    })
    costHydra = "1"

    @TextProperty({
        name: "Apex",
        description: 'Input the price of apex in billions. E.g. 1.5 = 1.5b',
        category: "Minion Data",
        subcategory: "/ah Prices"
    })
    apex = "1.5"

    @TextProperty({
        name: "Gabagool The Fish",
        description: 'Input the price of Gabagool The Fish in millions. E.g. 50 = 50m',
        category: "Minion Data",
        subcategory: "/ah Prices"
    })
    gabaFish = "50"

    @TextProperty({
        name: "Minion 1 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 1"
    })
    minionSpeed1 = "12"

    @TextProperty({
        name: "Minion 1 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 1"
    })
    minionCount1 = "5"

    @TextProperty({
        name: "Minion 2 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 2"
    })
    minionSpeed2 = "12.4"

    @TextProperty({
        name: "Minion 2 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 2"
    })
    minionCount2 = "7"

    @TextProperty({
        name: "Minion 3 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 3"
    })
    minionSpeed3 = "12.9"

    @TextProperty({
        name: "Minion 3 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 3"
    })
    minionCount3 = "18"

    @TextProperty({
        name: "Minion 4 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 4"
    })
    minionSpeed4 = "13.9"

    @TextProperty({
        name: "Minion 4 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 4"
    })
    minionCount4 = "1"

    @TextProperty({
        name: "Minion 5 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 5"
    })
    minionSpeed5 = "0"

    @TextProperty({
        name: "Minion 5 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 5"
    })
    minionCount5 = "0"

    @TextProperty({
        name: "Minion 6 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 6"
    })
    minionSpeed6 = "0"

    @TextProperty({
        name: "Minion 6 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 6"
    })
    minionCount6 = "0"

    @TextProperty({
        name: "Minion 7 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 7"
    })
    minionSpeed7 = "0"

    @TextProperty({
        name: "Minion 7 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 7"
    })
    minionCount7 = "0"

    @TextProperty({
        name: "Minion 8 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 8"
    })
    minionSpeed8 = "0"

    @TextProperty({
        name: "Minion 8 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 8"
    })
    minionCount8 = "0"

    @TextProperty({
        name: "Minion 9 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 9"
    })
    minionSpeed9 = "0"

    @TextProperty({
        name: "Minion 9 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minion 9"
    })
    minionCount9 = "0"

    @TextProperty({
        name: "Minion 10 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minions 10"
    })
    minionSpeed10 = "0"

    @TextProperty({
        name: "Minion 10 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minions 10"
    })
    minionCount10 = "0"

    @TextProperty({
        name: "Minion 11 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minions 11"
    })
    minionSpeed11 = "0"

    @TextProperty({
        name: "Minion 11 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minions 11"
    })
    minionCount11 = "0"

    @TextProperty({
        name: "Minion 12 speed",
        description: 'Input speed of your minion in seconds. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minions 12"
    })
    minionSpeed12 = "0"

    @TextProperty({
        name: "Minion 12 amount",
        description: 'Input number of minions with this speed. Leave 0 if none.',
        category: "Minion Data",
        subcategory: "Minions 12"
    })
    minionCount12 = "0"

    //Minion Calculations
    @SwitchProperty({
        name: "Sell Offer",
        description: 'Turn on if you want Sell Offer profits per day (Only 1 should be turned on)',
        category: "Minion Data",
        subcategory: "Calculate Loot"
    })
    sellOffer = false

    @SwitchProperty({
        name: "Insta Sell",
        description: 'Turn on if you want insta sell profits per day (Only 1 should be turned on)',
        category: "Minion Data",
        subcategory: "Calculate Loot"
    })
    InstaSell = false

    @TextProperty({
        name: "Minion Drop",
        description: 'Input the item that your minion produces. Make sure the item is not spelled wrong.',
        category: "Minion Data",
        subcategory: "Calculate Loot"
    })
    minionItem = ""

    constructor() {
        this.initialize(this);

        this.registerListener('Number of tries', newText => {
            BinomN = newText;
        });
        this.registerListener('Probability of the drop', newText => {
            BinomP = newText;
        });
        this.registerListener('Amount of times dropped', newText => {
            BinomX = newText;
        });
        this.registerListener('Slayer Cost', newText => {
            slayerCost = newText;
        });
        this.registerListener('Kills Per Hour', newText => {
            slayerKPH = newText;
        });
        this.registerListener('Magic Find', newText => {
            mf = newText;
        });
        this.registerListener('Minion 1 speed', newText => {
            minionSpeed1 = newText;
        });
        this.registerListener('Minion 1 amount', newText => {
            minionCount1 = newText;
        });
        this.registerListener('Minion 2 speed', newText => {
            minionSpeed2 = newText;
        });
        this.registerListener('Minion 2 amount', newText => {
            minionCount2 = newText;
        });
        this.registerListener('Minion 3 speed', newText => {
            minionSpeed3 = newText;
        });
        this.registerListener('Minion 3 amount', newText => {
            minionCount3 = newText;
        });
        this.registerListener('Minion 4 speed', newText => {
            minionSpeed4 = newText;
        });
        this.registerListener('Minion 4 amount', newText => {
            minionCount4 = newText;
        });
        this.registerListener('Minion 5 speed', newText => {
            minionSpeed5 = newText;
        });
        this.registerListener('Minion 5 amount', newText => {
            minionCount5 = newText;
        });
        this.registerListener('Minion 6 speed', newText => {
            minionSpeed6 = newText;
        });
        this.registerListener('Minion 6 amount', newText => {
            minionCount6 = newText;
        });
        this.registerListener('Minion 7 speed', newText => {
            minionSpeed7 = newText;
        });
        this.registerListener('Minion 7 amount', newText => {
            minionCount7 = newText;
        });
        this.registerListener('Minion 8 speed', newText => {
            minionSpeed8 = newText;
        });
        this.registerListener('Minion 8 amount', newText => {
            minionCount8 = newText;
        });
        this.registerListener('Minion 9 speed', newText => {
            minionSpeed9 = newText;
        });
        this.registerListener('Minion 9 amount', newText => {
            minionCount9 = newText;
        });
        this.registerListener('Minion 10 speed', newText => {
            minionSpeed10 = newText;
        });
        this.registerListener('Minion 10 amount', newText => {
            minionCount10 = newText;
        });
        this.registerListener('Minion 11 speed', newText => {
            minionSpeed11 = newText;
        });
        this.registerListener('Minion 11 amount', newText => {
            minionCount11 = newText;
        });
        this.registerListener('Minion 12 speed', newText => {
            minionSpeed12 = newText;
        });
        this.registerListener('Minion 12 amount', newText => {
            minionCount12 = newText;
        });
        this.registerListener('Minion Drop', newText => {
            InstaItem = newText;
        });
        this.registerListener('Hydra Heads', newText => {
            costHydra = newText;
        });
        this.registerListener('Bazaar Notifier Timer', newText =>{
            BzNotifTimer = newText;
        })
  
        this.setCategoryDescription("Slayer",`${YELLOW}/rev, /eman, /blaze, /tara, /sven ${GRAY}to display slayer profit calculations`);
  
        this.setCategoryDescription("Minion Data",`${YELLOW}/hyper ${GRAY}to show, hypergolic fuel cost, expected average drops, and expected profit per day. 
${YELLOW}/heavy ${GRAY}to show heavy gabagool calculations.
${YELLOW}/minion ${GRAY}to show total minion actions + profit per day, input stuff in Calculate Loot subcategory.`);
  
        this.setCategoryDescription("Minion Speeds",`This will calculate the minion speed of a given minion. Do /speed (minion<Minion Tier>)
For example magma cube t11 would = ${YELLOW}/speed magma_cube11.
Another example, fish t9 = ${YELLOW}/speed fish9.
${RED}Note: I use underscore for minion names that have spaces
${YELLOW}(magma cube, nether wart, hard stone, dark oak, cobble stone, red sand, cave spider)
${RED}So use an underscore to combine the two words like in the first exmaple`);
  
        this.setCategoryDescription("Economy",`Economy related. /ubz or /uah to update ah/bazaar prices for calculations.
This will manually do it every 15 minutes if you have the auto check turned on.`);

        this.setCategoryDescription("Statistics",`${YELLOW}/binom ${GRAY}to show binomial distribution statistics.
        ${YELLOW}/calc x (symbol) y ${GRAY}will do simple calculations with 2 numbers. Make sure there is a space after each input. Ex:/calc 3 * 7`);

        this.setCategoryDescription("Rift",`
        /bbgui to change locations.
        `);

        this.setCategoryDescription("Garden",`
        /composter to display how much money you make a day/hr with composter.
        Make sure to input composter upgrades inside composter subcategory.
        `);

        this.setCategoryDescription("Trackers",`
        Change toggle in minecraft controls.
        /powder or /pow (save, remove, rm) to save your current data.
        /skill or /sk (start, end) to start skill tracker.
        /dailyreset or /dr (cake, hiker, visitor, matriarch, eyedrop, feeder) to reset dailies manually.
        /remindme or /remind or /rme <name> <days, hours, minutes, seconds>. Ex: /remindme test 1 0 0 0. Will auto convert if above 60 hours/min/sec or 24 days.
        /bbgui to change gui positions.
        `);
  
        this.setCategoryDescription("Farming",`
        Input amount of crops gained per jacobs contest. 
          ${YELLOW}/farmnpc ${RESET}- npc coins per hour
        `);
    }
}

export default new settings();

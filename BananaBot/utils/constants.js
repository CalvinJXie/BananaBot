// Colors
export const BLACK = '&0';
export const DARK_BLUE = '&1';
export const DARK_GREEN = '&2';
export const DARK_AQUA = '&3';
export const DARK_RED = '&4';
export const DARK_PURPLE = '&5';
export const GOLD = '&6';
export const GRAY = '&7';
export const DARK_GRAY = '&8';
export const BLUE = '&9';
export const GREEN = '&a';
export const AQUA = '&b';
export const RED = '&c';
export const LIGHT_PURPLE = '&d';
export const YELLOW = '&e';
export const WHITE = '&f';

// Formats
export const OBFUSCATED = '&k';
export const BOLD = '&l';
export const STRIKETHROUGH = '&m';
export const UNDERLINE = '&n';
export const ITALIC = '&o';
export const RESET = '&r';

export const LOGO = `&8[&6BananaBot&8] `

//help message
export const helpMsg = 
`${LOGO}
${RED}${BOLD}Mod Related:
${YELLOW}${BOLD}/banana or /bb ${WHITE}to open the settings menu in order to edit data values.
${YELLOW}${BOLD}/bbgui or /bb gui ${WHITE}to change the locations of where the text should be displayed. Scaling is a Work In Progress.

${RED}${BOLD}Minions:
${YELLOW}${BOLD}/hyper ${WHITE}to calculate minion profit per day/hypergolic craft (must input minion speeds in /banana).
${YELLOW}${BOLD}/heavy ${WHITE}to calculate profit from using heavy gabagool fuel (must input minion speeds in /banana).
${YELLOW}${BOLD}/minion ${WHITE}to see minion calculations.
${YELLOW}${BOLD}/minstats <min speed> ${WHITE}to see inferno minion odds for a single minion.
${YELLOW}${BOLD}/gaba ${WHITE}to calculate profit from crafting hypergolics.
${YELLOW}${BOLD}/amal ${WHITE}to show craft cost of amalgamted crimsonite.
${YELLOW}${BOLD}/speed <minion><tier>${WHITE}to find the speed of a minion.

${RED}${BOLD}Money Per Hour Calcs:
${YELLOW}${BOLD}/<blaze/eman/rev/sven/tara> ${WHITE}to show theoretical money per hour of each slayer.
${YELLOW}${BOLD}/copper, /bits ${WHITE}to show the exchange rate of coins to a different currency.
${YELLOW}${BOLD}/composter ${WHITE}to show profit per hour/day with composter. Input composter ugprades in /bb.
${YELLOW}${BOLD}/ghost <kills an hour> ${WHITE}to show coins/hr grinding ghosts.

${RED}${BOLD}Statistics:
${YELLOW}${BOLD}/binom ${WHITE}to show binomial distribution statistics.
${YELLOW}${BOLD}/calc "x" (*/+-%) "y" ${WHITE}to do simple math like x * y.

${RED}${BOLD}Bazaar/Auction Related stuff:
${YELLOW}${BOLD}/itemcost or /ic <args> ${WHITE}to display craft cost of an item.
${YELLOW}${BOLD}/bzlist ${WHITE}to display items being tracked.
${YELLOW}${BOLD}/clear <itemName> ${WHITE}to reset bazaar notifier database tracker. You can get itemName from /bzlist.
${YELLOW}${BOLD}/ubz ${WHITE}to manually update bazaar prices.
${YELLOW}${BOLD}/dailycoin or /dc ${WHITE}to see how much daily money you make a day.
${YELLOW}${BOLD}/ahf <page> <price> <item name> <item lore> ${WHITE}to search on for items that are lower than the price you inputted.
${YELLOW}${BOLD}/ahl ${WHITE}to see the last viewauction uuids if you missed them from ahf.
${YELLOW}${BOLD}/ahpages ${WHITE}to see total pages from auction house api that you can use in ahf.

${RED}${BOLD}Party:
${YELLOW}${BOLD}/resetparty ${WHITE}to reset any bad things that happen during dungeon rejoins.
${YELLOW}${BOLD}/list <wl/wlr/bl/blr/show> ${WHITE}to add players to party whitelist/blacklist.

${RED}${BOLD}Trackers:
${YELLOW}${BOLD}Turn on/off trackers in minecraft controls.
${YELLOW}${BOLD}/ks <amount> to track remaining kills needed.
${YELLOW}${BOLD}/powder or /pow <save/remove/rm> ${WHITE}to save/remove tracked powder.
${YELLOW}${BOLD}/skill or /sk <start/end/reset> ${WHITE}to start skill exp/hr tracker.
${YELLOW}${BOLD}/bzlist ${WHITE}to show items inside bz notif. ${YELLOW}${BOLD}/clear <item name> ${WHITE}to remove from this list.
${YELLOW}${BOLD}/dailyreset or /dr (cake, hiker, visitor, matriarch, eyedrop, feeder, remind) ${WHITE}to manually reset dailies if something messes up.
${YELLOW}${BOLD}/remindme or /remind or /rme <name> <day hour min sec> ${WHITE}to set yourself a timer to remind yourself of something!

${RED}${BOLD}Bestiary:
${YELLOW}${BOLD}/br <mobname (to search a mob), area_name (to search an entire area), all, save, clear <mobname>, clearall>

${RED}${BOLD}Damage Stuff:
${YELLOW}${BOLD}/dmg (on/off) ${WHITE}to print damage in chat.
${YELLOW}${BOLD}/rend ${WHITE}to display most rend multipliers and how the damage calculation works.
${YELLOW}${BOLD}/damage ${WHITE}to display damage multiplier differences.

${RED}${BOLD}Message From Banana:
${YELLOW}${BOLD}Data should auto save after input, but if it seems like it does not do /ct load to ensure it does. Otherwise bug report it. (it wont be fixed)
`

//minion speeds
export const minionActions = {
    'cobble_stone1':14, 'cobble_stone2':14, 'cobble_stone3':12, 'cobble_stone4':12, 'cobble_stone5':10, 'cobble_stone6':10, 'cobble_stone7':9, 'cobble_stone8':9, 'cobble_stone9':8, 'cobble_stone10':8, 'cobble_stone11':7, 'cobble_stone12':6,
    'obsidian1':45, 'obsidian2':45, 'obsidian3':42, 'obsidian4':42, 'obsidian5':39, 'obsidian6':39, 'obsidian7':35, 'obsidian8':35, 'obsidian9':30, 'obsidian10':30, 'obsidian11':24, 'obsidian12':21,
    'glowstone1':25, 'glowstone2':25, 'glowstone3':23, 'glowstone4':23, 'glowstone5':21, 'glowstone6':21, 'glowstone7':19, 'glowstone8':19, 'glowstone9':16, 'glowstone10':16, 'glowstone11':13, 'glowstone12':11,
    'gravel1':26, 'gravel2':26, 'gravel3':24, 'gravel4':24, 'gravel5':22, 'gravel6':22, 'gravel7':19, 'gravel8':19, 'gravel9':16, 'gravel10':16, 'gravel11':13,
    'sand1':26, 'sand2':26, 'sand3':24, 'sand4':24, 'sand5':22, 'sand6':22, 'sand7':19, 'sand8':19, 'sand9':16, 'sand10':16, 'sand11':13,
    'red_sand1':26, 'red_sand2':25, 'red_sand3':24, 'red_sand4':23, 'red_sand5':22, 'red_sand6':21, 'red_sand7':20, 'red_sand8':19, 'red_sand9':18, 'red_sand10':16, 'red_sand11':13, 'red_sand12':11,
    'mycelium1':26, 'mycelium2':25, 'mycelium3':24, 'mycelium4':23, 'mycelium5':22, 'mycelium6':21, 'mycelium7':20, 'mycelium8':19, 'mycelium9':18, 'mycelium10':16, 'mycelium11':13, 'mycelium12':11,
    'clay1':32, 'clay2':32, 'clay3':30, 'clay4':30, 'clay5':27.5, 'clay6':27.5, 'clay7':24, 'clay8':24, 'clay9':20, 'clay10':20, 'clay11':16,
    'ice1':14, 'ice2':14, 'ice3':12, 'ice4':12, 'ice5':10, 'ice6':10, 'ice7':9, 'ice8':9, 'ice9':8, 'ice10':8, 'ice11':7,
    'snow1':13, 'snow2':13, 'snow3':12, 'snow4':12, 'snow5':11, 'snow6':11, 'snow7':9.5, 'snow8':9.5, 'snow9':8, 'snow10':8, 'snow11':6.5,
    'coal1':15, 'coal2':15, 'coal3':13, 'coal4':13, 'coal5':12, 'coal6':12, 'coal7':10, 'coal8':10, 'coal9':9, 'coal10':9, 'coal11':7, 'coal12':6,
    'iron1':17, 'iron2':17, 'iron3':15, 'iron4':15, 'iron5':14, 'iron6':14, 'iron7':12, 'iron8':12, 'iron9':10, 'iron10':10, 'iron11':8, 'iron12':7,
    'gold1':22, 'gold2':22, 'gold3':20, 'gold4':20, 'gold5':18, 'gold6':18, 'gold7':16, 'gold8':16, 'gold9':14, 'gold10':14, 'gold11':11, 'gold12':9,
    'diamond1':29, 'diamond2':29, 'diamond3':27, 'diamond4':27, 'diamond5':25, 'diamond6':25, 'diamond7':22, 'diamond8':22, 'diamond9':19, 'diamond10':19, 'diamond11':15, 'diamond12':12,
    'lapis1':29, 'lapis2':29, 'lapis3':27, 'lapis4':27, 'lapis5':25, 'lapis6':25, 'lapis7':23, 'lapis8':23, 'lapis9':21, 'lapis10':21, 'lapis11':18, 'lapis12':16,
    'redstone1':29, 'redstone2':29, 'redstone3':27, 'redstone4':27, 'redstone5':25, 'redstone6':25, 'redstone7':23, 'redstone8':23, 'redstone9':21, 'redstone10':21, 'redstone11':18, 'redstone12':16,
    'emerald1':28, 'emerald2':28, 'emerald3':26, 'emerald4':26, 'emerald5':24, 'emerald6':24, 'emerald7':21, 'emerald8':21, 'emerald9':18, 'emerald10':18, 'emerald11':14, 'emerald12':12,
    'quartz1':22.5, 'quartz2':22.5, 'quartz3':21, 'quartz4':21, 'quartz5':19, 'quartz6':19, 'quartz7':17, 'quartz8':17, 'quartz9':14.5, 'quartz10':14.5, 'quartz11':11.5, 'quartz12':10,
    'endstone1':26, 'endstone2':26, 'endstone3':24, 'endstone4':24, 'endstone5':22, 'endstone6':22, 'endstone7':19, 'endstone8':19, 'endstone9':16, 'endstone10':16, 'endstone11':13,
    'mithril1':80, 'mithril2':80, 'mithril3':75, 'mithril4':75, 'mithril5':70, 'mithril6':70, 'mithril7':65, 'mithril8':65, 'mithril9':60, 'mithril10':60, 'mithril11':55, 'mithril12':50,
    'hard_stone1':14, 'hard_stone2':14, 'hard_stone3':12, 'hard_stone4':12, 'hard_stone5':10, 'hard_stone6':10, 'hard_stone7':9, 'hard_stone8':9, 'hard_stone9':8, 'hard_stone10':8, 'hard_stone11':7, 'hard_stone12':6,
    'wheat1':15, 'wheat2':15, 'wheat3':13, 'wheat4':13, 'wheat5':11, 'wheat6':11, 'wheat7':10, 'wheat8':10, 'wheat9':9, 'wheat10':9, 'wheat11':8, 'wheat12':7,
    'melon1':24, 'melon2':24, 'melon3':22.5, 'melon4':22.5, 'melon5':21, 'melon6':21, 'melon7':18.5, 'melon8':18.5, 'melon9':16, 'melon10':16, 'melon11':13, 'melon12':10,
    'pumpkin1':32, 'pumpkin2':32, 'pumpkin3':30, 'pumpkin4':30, 'pumpkin5':27, 'pumpkin6':27, 'pumpkin7':24, 'pumpkin8':24, 'pumpkin9':20, 'pumpkin10':20, 'pumpkin11':16, 'pumpkin12':12,
    'carrot1':20, 'carrot2':20, 'carrot3':18, 'carrot4':18, 'carrot5':16, 'carrot6':16, 'carrot7':14, 'carrot8':14, 'carrot9':12, 'carrot10':12, 'carrot11':10, 'carrot12':8,
    'potato1':20, 'potato2':20, 'potato3':18, 'potato4':18, 'potato5':16, 'potato6':16, 'potato7':14, 'potato8':14, 'potato9':12, 'potato10':12, 'potato11':10, 'potato12':8,
    'mushroom1':30, 'mushroom2':30, 'mushroom3':28, 'mushroom4':28, 'mushroom5':26, 'mushroom6':26, 'mushroom7':23, 'mushroom8':23, 'mushroom9':20, 'mushroom10':20, 'mushroom11':16, 'mushroom12':12,
    'cactus1':27, 'cactus2':27, 'cactus3':25, 'cactus4':25, 'cactus5':23, 'cactus6':23, 'cactus7':21, 'cactus8':21, 'cactus9':18, 'cactus10':18, 'cactus11':15, 'cactus12':12,
    'cocoa1':27, 'cocoa2':27, 'cocoa3':25, 'cocoa4':25, 'cocoa5':23, 'cocoa6':23, 'cocoa7':21, 'cocoa8':21, 'cocoa9':18, 'cocoa10':18, 'cocoa11':15, 'cocoa12':12,
    'sugar_cane1':22, 'sugar_cane2':22, 'sugar_cane3':20, 'sugar_cane4':20, 'sugar_cane5':18, 'sugar_cane6':18, 'sugar_cane7':16, 'sugar_cane8':16, 'sugar_cane9':14.5, 'sugar_cane10':14.5, 'sugar_cane11':12, 'sugar_cane12':9,
    'nether_wart1':50, 'nether_wart2':50, 'nether_wart3':47, 'nether_wart4':47, 'nether_wart5':44, 'nether_wart6':44, 'nether_wart7':41, 'nether_wart8':41, 'nether_wart9':38, 'nether_wart10':38, 'nether_wart11':32, 'nether_wart12':27,
    'flower1':30, 'flower2':29, 'flower3':28, 'flower4':27, 'flower5':26, 'flower6':25, 'flower7':24, 'flower8':24, 'flower9':22, 'flower10':20, 'flower11':18, 'flower12':15,
    'fish1':78, 'fish2':75, 'fish3':72, 'fish4':72, 'fish5':68, 'fish6':68, 'fish7':62.5, 'fish8':62.5, 'fish9':53, 'fish10':53, 'fish11':35,
    'zombie1':26, 'zombie2':26, 'zombie3':24, 'zombie4':24, 'zombie5':22, 'zombie6':22, 'zombie7':20, 'zombie8':20, 'zombie9':17, 'zombie10':17, 'zombie11':13,
    'revenant1':29, 'revenant2':29, 'revenant3':26, 'revenant4':26, 'revenant5':23, 'revenant6':23, 'revenant7':19, 'revenant8':19, 'revenant9':14.5, 'revenant10':14.5, 'revenant11':10, 'revenant12':8,
    'voidling1':45, 'voidlin2':45, 'voidling3':42, 'voidling4':42, 'voidling5':39, 'voidling6':39, 'voidling7':35, 'voidling8':35, 'voidling9':30, 'voidling10':30, 'voidling11':24,
    'inferno1':1013, 'inferno2':982, 'inferno3':950, 'inferno4':919, 'inferno5':886, 'inferno6':855, 'inferno7':823, 'inferno8':792, 'inferno9':760, 'inferno10':728, 'inferno11':697,
    'skeleton1':26, 'skeleton2':26, 'skeleton3':24, 'skeleton4':24, 'skeleton5':22, 'skeleton6':22, 'skeleton7':20, 'skeleton8':20, 'skeleton9':17, 'skeleton10':17, 'skeleton11':13,
    'creeper1':27, 'creeper2':27, 'creeper3':25, 'creeper4':25, 'creeper5':23, 'creeper6':23, 'creeper7':21, 'creeper8':21, 'creeper9':18, 'creeper10':18, 'creeper11':14,
    'spider1':26, 'spider2':26, 'spider3':24, 'spider4':24, 'spider5':22, 'spider6':22, 'spider7':20, 'spider8':20, 'spider9':17, 'spider10':17, 'spider11':13,
    'tarantula1':29, 'tarantula2':29, 'tarantula3':26, 'tarantula4':26, 'tarantula5':23, 'tarantula6':23, 'tarantula7':19, 'tarantula8':19, 'tarantula9':14.5, 'tarantula10':14.5, 'tarantula11':10,
    'cave_spider1':26, 'cave_spider2':26, 'cave_spider3':24, 'cave_spider4':24, 'cave_spider5':22, 'cave_spider6':22, 'cave_spider7':20, 'cave_spider8':20, 'cave_spider9':17, 'cave_spider10':17, 'cave_spider11':13,
    'blaze1':33, 'blaze2':33, 'blaze3':31, 'blaze4':31, 'blaze5':28.5, 'blaze6':28.5, 'blaze7':25, 'blaze8':25, 'blaze9':21, 'blaze10':21, 'blaze11':16.5, 'blaze12':13,
    'magma_cube1':32, 'magma_cube2':32, 'magma_cube3':30, 'magma_cube4':30, 'magma_cube5':28, 'magma_cube6':28, 'magma_cube7':25, 'magma_cube8':25, 'magma_cube9':22, 'magma_cube10':22, 'magma_cube11':18, 'magma_cube12':16,
    'enderman1':32, 'enderman2':32, 'enderman3':30, 'enderman4':30, 'enderman5':28, 'enderman6':28, 'enderman7':25, 'enderman8':25, 'enderman9':22, 'enderman10':22, 'enderman11':18,
    'ghast1':50, 'ghast2':50, 'ghast3':47, 'ghast4':47, 'ghast5':44, 'ghast6':44, 'ghast7':41, 'ghast8':41, 'ghast9':38, 'ghast10':38, 'ghast11':32, 'ghast12':30,
    'slime1':26, 'slime2':26, 'slime3':24, 'slime4':24, 'slime5':22, 'slime6':22, 'slime7':19, 'slime8':19, 'slime9':16, 'slime10':16, 'slime11':12,
    'cow1':26, 'cow2':26, 'cow3':24, 'cow4':24, 'cow5':22, 'cow6':22, 'cow7':20, 'cow8':20, 'cow9':17, 'cow10':17, 'cow11':13, 'cow12':10,
    'pig1':26, 'pig2':26, 'pig3':24, 'pig4':24, 'pig5':22, 'pig6':22, 'pig7':20, 'pig8':20, 'pig9':17, 'pig10':17, 'pig11':13, 'pig12':10,
    'chicken1':26, 'chicken2':26, 'chicken3':24, 'chicken4':24, 'chicken5':22, 'chicken6':22, 'chicken7':20, 'chicken8':20, 'chicken9':18, 'chicken10':18, 'chicken11':15, 'chicken12':12,
    'sheep1':24, 'sheep2':24, 'sheep3':22, 'sheep4':22, 'sheep5':20, 'sheep6':20, 'sheep7':18, 'sheep8':18, 'sheep9':16, 'sheep10':16, 'sheep11':12, 'sheep12':9,
    'rabbit1':26, 'rabbit2':26, 'rabbit3':24, 'rabbit4':24, 'rabbit5':22, 'rabbit6':22, 'rabbit7':20, 'rabbit8':20, 'rabbit9':17, 'rabbit10':17, 'rabbit11':13, 'rabbit12':10,
    'oak1':48, 'oak2':48, 'oak3':45, 'oak4':45, 'oak5':42, 'oak6':42, 'oak7':38, 'oak8':38, 'oak9':33, 'oak10':33, 'oak11':27,
    'spruce1':48, 'spruce2':48, 'spruce3':45, 'spruce4':45, 'spruce5':42, 'spruce6':42, 'spruce7':38, 'spruce8':38, 'spruce9':33, 'spruce10':33, 'spruce11':27,
    'birch1':48, 'birch2':48, 'birch3':45, 'birch4':45, 'birch5':42, 'birch6':42, 'birch7':38, 'birch8':38, 'birch9':33, 'birch10':33, 'birch11':27,
    'dark_oak1':48, 'dark_oak2':48, 'dark_oak3':45, 'dark_oak4':45, 'dark_oak5':42, 'dark_oak6':42, 'dark_oak7':38, 'dark_oak8':38, 'dark_oak9':33, 'dark_oak10':33, 'dark_oak11':27,
    'acacia1':48, 'acacia2':48, 'acacia3':45, 'acacia4':45, 'acacia5':42, 'acacia6':42, 'acacia7':38, 'acacia8':38, 'acacia9':33, 'acacia10':33, 'acacia11':27,
    'jungle1':48, 'jungle2':48, 'jungle3':45, 'jungle4':45, 'jungle5':42, 'jungle6':42, 'jungle7':38, 'jungle8':38, 'jungle9':33, 'jungle10':33, 'jungle11':27,
    'vampire1':190, 'vampire2':190, 'vampire3':175, 'vampire4':175, 'vampire5':160, 'vampire6':160, 'vampire7':140, 'vampire8':140, 'vampire9':117, 'vampire10':117, 'vampire11':95
}
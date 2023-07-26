import PogObject from "../../PogData"

export let data = new PogObject("BananaBot", {
    "BIL": [100, 40, 2, 2], //Vampire Execute Location [x, y, xScale, yScale]
    "TCL": [200, 50, 2, 2], //Twin Claw Location
    "ETL": [10, 10, 1, 1], //Effigy Timer Location
    "ITL": [200, 30, 1, 1], //Item Timer Location
    "dailyLoc": [10, 50], //Daily Timer Location
    "powderLoc": [10, 90], //Powder Tracker Location
    "STL": [10, 200], //Skill Tracker Location
    "BazaarNotif": {},
    "Party":{"Leader":"", "Members":[]},
    "PartyWL": [],
    "daily": {"cake":0, "eyedrop":0, "matriarch":0, "feeder":0, "hiker":0, "visitor":0},
    "world": "",
    "totalPages": 0
}, "userdata.json")

register("gameUnload", ()=>{
    data.save();
})
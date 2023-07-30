import PogObject from "../../PogData"

export let data = new PogObject("BananaBot", {
    "locations":{
        "BIL": [100, 40, false], //Blood Ichor Location [x, y, active]
        "TCL": [200, 50, false], //Twin Claw Location
        "ETL": [10, 10, false], //Effigy Timer Location
        "ITL": [200, 30, false], //Item Timer Location
        "dailyLoc": [10, 50, false], //Daily Timer Location
        "powderLoc": [10, 90, false], //Powder Tracker Location
        "STL": [10, 200, false], //Skill Tracker Location
        "MTL": [10, 120, false], //Mob Tracker Location
    },
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
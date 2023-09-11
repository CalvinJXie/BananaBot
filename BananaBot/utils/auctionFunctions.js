export const myAhApi = 'http://bananabot.pythonanywhere.com/auction'
/*
function lbinPrice(itemName){
  axios.get(myAhApi).then((response)=>{
    auctionInfo = response.data
    findAhPrice(itemName, auctionInfo);
    ChatLib.chat(`${LOGO}Finished grabbing auction data.`)
  }).catch((error)=>{
    console.error(error)
  })
}

Example: 
const singleItem = findAhPrice("Sword");
returns item if found;
const multipleItems = findAhPrice(["sword", "apple", "pick"]);
returns {sword: 50, apple:}
*/
export function findAhPrice(itemName, auctionInfo) {
  // Function to fetch the price for a single item
  function fetchLowestItemPrice(item) {
    const ahMap = new Map(
      Object.entries(auctionInfo).map(([key, value]) => [key.toLowerCase(), value])
    );
    const searchKey = item.toLowerCase();
    let lowestPrice = null;

    ahMap.forEach((value, key) => {
      if (key.indexOf(searchKey) !== -1) {
        if (lowestPrice === null || value < lowestPrice) {
          lowestPrice = value;
        }
      }
    });

    return lowestPrice;
  }

  if (typeof itemName === "object" && !Array.isArray(itemName)) {
    // If the input is a dictionary, fetch prices for all items in the dictionary
    const prices = {};
    Object.keys(itemName).forEach((key)=>{
      prices[key] = fetchLowestItemPrice(key);
    })
    return prices;
  } else if (Array.isArray(itemName)) {
    // If the input is an array of items, fetch prices for all items
    const prices = {};
    for (const item of itemName) {
      const price = fetchLowestItemPrice(item);
      prices[item] = price;
    }
    return prices;
  } else {
    // If the input is a single item, fetch the price for that item
    return fetchLowestItemPrice(itemName);
  }
}
export  const m = 1000000;
export  const k = 1000;
export  const b = 1000000000;
export function tax(listPrice, d){
  if(d==undefined){
    d = 6;
  }
  //duration fee
  duration = {
    1: 20,
    6: 45,
    12: 100,
    24: 350,
    48: 1200,
    336: 55200
  }
  durFee = duration[d];

  //claiming fee
  if(listPrice > 1*m){
      claimFee = listPrice*.01;
  }

  //calculates listing fee
  if(listPrice <= 10*m){
      listFee = listPrice*.01;
  }else if(listPrice <= 100*m){
      listFee = listPrice*.02;
  }else if(listPrice > 100*m){
      listFee = listPrice*.025;
  }

  //total fee
  totalFee = listFee+claimFee+durFee;
  return [listFee, claimFee, durFee, totalFee];
}

import request from "../../requestV2";
import Promise from "../../PromiseV2";
import { readJson, romanToArabic, writeJson } from "./functions";
import { data } from "./variables";

const ahDict = readJson("data", "auction.json")["items"];

export function setPages() {
  const pages = `https://api.hypixel.net/skyblock/auctions`;

  return new Promise((resolve, reject) => {
    request({
      url: pages,
      json: true
    })
      .then((response) => {
        data.totalPages = response.totalPages;
        console.log(`Updated Pages: ${data.totalPages}`);
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export function updateAhPrices() {
  const newDict = {};

  function processPage(page) {
    const AH = 'https://api.hypixel.net/skyblock/auctions?page=' + page;
    return request({ url: AH, json: true });
  }

  function processAuction(auction, item, loreAttributes, godAttributes) {
    if (auction.bin) {
      if (loreAttributes) {
        loreAttributes.forEach((attr) => {
          const regex = new RegExp(attr + ' [IVX]+', "i");
          const lore = auction.item_lore;
          const match = lore.match(regex);
          if (match) {
            const attrTier = romanToArabic(match[0].substring(attr.length + 1, match[0].length));
            const modifiedItem = `${attr} ${item}`;
            const pricePerTier = auction.starting_bid / Math.pow(2, attrTier - 1);
            if (newDict[modifiedItem] === undefined || newDict[modifiedItem] > pricePerTier) {
              newDict[modifiedItem] = pricePerTier;
            }
          }
        });
      } else if (godAttributes) {
        Object.entries(godAttributes).forEach(([gr, attrs]) => {
          const [attr1, attr2] = attrs;
          const lore = auction.item_lore;
          if (lore.includes(attr1) && lore.includes(attr2)) {
            const grString = `${attr1} ${attr2} ${item}`;
            if (newDict[grString] === undefined || newDict[grString] > auction.starting_bid) {
              newDict[grString] = auction.starting_bid;
            }
          }
        });
      } else if (newDict[item] === undefined || newDict[item] > auction.starting_bid) {
        newDict[item] = auction.starting_bid;
      }
    }
  }

  setPages()
    .then(() => {
      const pageRequests = [];
      for (let p = 0; p < data.totalPages; p++) {
        pageRequests.push(processPage(p));
      }
      return Promise.all(pageRequests);
    })
    .then((responses) => {
      for (const response of responses) {
        const auctions = response.auctions;
        for (const auction of auctions) {
          Object.entries(ahDict).forEach(([item, attributes]) => {
            const loreAttributes = attributes.lore;
            const godAttributes = attributes.god;
            if (auction.item_name.toLowerCase().includes(item.toLowerCase())) {
              processAuction(auction, item, loreAttributes, godAttributes);
            }
          });
        }
      }
      console.log(`Finished searching ${data.totalPages} pages from the auction house`);
      writeJson("data", "auctionPrice.json", newDict);
    })
    .catch((error) => {
      console.error("An error occurred while processing auctions:");
      console.error(JSON.stringify(error, false, 2));
    });
}

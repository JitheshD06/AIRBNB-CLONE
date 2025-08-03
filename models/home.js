// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");
const homeDataPath = path.join(rootDir, "data", "home.json");
const Favourite = require("./favourites");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        // edit home case
        registeredHomes = registeredHomes.map((home) =>
          home.id === this.id ? this : home
        );
      } else {
        // add home case
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      if (err) {
        console.log("File reading error:", err);
        callback([]);
      } else {
        try {
          const homes = JSON.parse(data);
          callback(homes);
        } catch (parseError) {
          console.log("JSON parsing error:", parseError);
          callback([]);
        }
      }
    });
  }

  static findById(id, callback) {
    this.fetchAll((homes) => {
      const homefound = homes.find((home) => home.id === id);
      callback(homefound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);
      fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
        Favourite.deleteById(homeId, callback);
      });
    });
  }
};
// ASYNC/AWAIT CODE

// const fs = require("fs/promises");
// const path = require("path");
// const rootDir = require("../utils/pathUtil");
// const homeDataPath = path.join(rootDir, "data", "home.json");
// const Favourite = require("./favourites");

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoUrl) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photoUrl = photoUrl;
//   }

//   async save() {
//     try {
//       let registeredHomes = await Home.fetchAll();

//       if (this.id) {
//         // Edit case
//         registeredHomes = registeredHomes.map((home) =>
//           home.id === this.id ? this : home
//         );
//       } else {
//         // Add case
//         this.id = Math.random().toString();
//         registeredHomes.push(this);
//       }

//       await fs.writeFile(homeDataPath, JSON.stringify(registeredHomes));
//       console.log("File Writing Concluded");
//     } catch (err) {
//       console.error("Error saving home:", err);
//     }
//   }

//   static async fetchAll() {
//     try {
//       const data = await fs.readFile(homeDataPath, "utf-8");
//       return JSON.parse(data);
//     } catch (err) {
//       if (err.code === "ENOENT") {
//         // file doesn't exist yet
//         return [];
//       }
//       console.error("Error reading or parsing file:", err);
//       return [];
//     }
//   }

//   static async findById(id) {
//     try {
//       const homes = await this.fetchAll();
//       return homes.find((home) => home.id === id);
//     } catch (err) {
//       console.error("Error finding home by ID:", err);
//       return null;
//     }
//   }

//   static async deleteById(homeId) {
//     try {
//       let homes = await this.fetchAll();
//       homes = homes.filter((home) => home.id !== homeId);
//       await fs.writeFile(homeDataPath, JSON.stringify(homes));
//       await Favourite.deleteById(homeId);
//     } catch (err) {
//       console.error("Error deleting home:", err);
//     }
//   }

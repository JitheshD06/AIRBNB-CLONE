const Home = require("../models/home");
const Favourite = require("../models/favourites");

exports.getHome = (req, res, next) => {
  Home.fetchAll((homearr) => {
    console.log("Homes available:", homearr);
    res.render("store/home", {
      homearr: homearr,
      pageTitle: "HOME_PAGE",
    });
  });
};

exports.bookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "BOOKING-PAGE",
  });
};

// exports.favourite = (req, res, next) => {
//   res.render("store/favourite", {
//     pageTitle: "FAVORITE-PAGE",
//   });
// };

exports.getHomeList = (req, res, next) => {
  Home.fetchAll((homearr) => {
    res.render("store/home-list", {
      homearr: homearr,
      pageTitle: "HOME-LIST",
    });
  });
};

exports.getHomeDes = (req, res, next) => {
  const homeid = req.params.homeid;
  Home.findById(homeid, (home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/home");
    } else {
      // console.log("home details", home);
      console.log(homeid);
      res.render("store/home-detail", {
        pageTitle: "HOME",
        home: home,
      });
    }
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home.id)
      );
      res.render("store/favourite", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "favourites",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favourites");
  });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from Favourite", error);
    }
    res.redirect("/favourites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/homes");
    } else {
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "Home",
      });
    }
  });
};

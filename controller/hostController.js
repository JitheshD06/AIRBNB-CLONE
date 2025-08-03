const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", { pageTitle: "ADD-HOME" });
  editing = false;
};

// exports.gethomeadded = (req, res, next) => {
//   homearr.push({ HOUSENAME: req.body.Housename }),
//     console.log(req.body),
//     res.render("home_added", { Pagetitle: "HOME ADDED" });
// };

//Replaced code

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/home_added", {
    pageTitle: "Home Added Successfully",
  });
};

exports.getHostHomeList = (req, res, next) => {
  Home.fetchAll((homearr) => {
    res.render("host/host_list", {
      homearr: homearr,
      pageTitle: "HOSTS-HOMELIST",
    });
  });
};

exports.getEditHomeList = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId, (home) => {
    if (!home) {
      consolelog("Home not Found");
      return res.redirect("/host/hostlist");
    }
    console.log(homeId, editing, home);

    res.render("host/edit-home", {
      pageTitle: "ADD-HOME",
      editing: editing,
      home,
      home,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();
  res.redirect("/host/hostlist");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while deleting ", error);
    }
    res.redirect("/host/hostlist");
  });
};

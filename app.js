//External module
const express = require("express");
//Local module
const storeRouter = require("./Routes/storeRouter");
const { hostroute } = require("./Routes/hostroutes");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded());

// app.get(
//   "/",
//   (req, res, next) =>
//     res.send(WELCOME TO AIRBNB <br>
//   <a href="/host/add-home">ADD HOME </a>) //only one res.send can be used to in one path
// );

//REPLACED ABOVE CODE

app.use(storeRouter);

// app.get("/host/add-home", (req, res, next) =>
//   res.send( <form action="/host/add-home" method="POST">
//   <input type="text" name="Housename" placeholder="Enter your house name" >
//   <input type="text"  name="Email" placeholder="Enter your Email" >
//    <button>SUBMIT</button>
//    </form>)
// );

// app.post("/host/add-home", (req, res, next) => {
//   console.log(req.body), res.send(<h1> THANKS FOR ADDING);
// });

//REPLACED CODE

app.use("/host", hostroute);

// app.use((req, res, next) => {
//   res.status(404).send(`ERROR 404 == Page cannot be found`);
// });

//REPLACED CODE

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`); // use ` to use ${}
});

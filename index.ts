import express from "express";
import ejs from "ejs";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("admin");
});

app.listen(3000, function () {
	console.log("Server is running on port 3000 ");
});

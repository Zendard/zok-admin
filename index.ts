import express from "express";
import ejs from "ejs";
import { MongoClient } from "mongodb";
import { uri } from "./uri";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("admin");
});

app.post("/add-item", async (req,res){
	const item=req.body
	const mongoClient = new MongoClient(uri);
	const db = mongoClient.db("Zok").collection("Calendar")
	db.insertOne({
		"title":item.title,
		"img":item.img,
		"descr":item.descr,
	})
})

app.listen(3000, function () {
	console.log("Server is running on port 3000 ");
});

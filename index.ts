import express from "express";
import { MongoClient } from "mongodb";
import { uri } from "./uri";
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render("admin");
});

app.post(
	"/add-item",
	async (req, res, next) => {
		console.log(req);
		const item = req.body;
		const mongoClient = await new MongoClient(uri);
		const db = mongoClient.db("Zok").collection("Calendar");
		await db.insertOne({
			title: item.title,
			name: item.name,
			img: item.img,
			date: item.date,
			time: item.timeBegin + " - " + item.timeEnd,
			descr: item.descr,
		});
		await mongoClient.close();
		next();
	},
	(req, res) => {
		res.render("admin");
	}
);

app.listen(3000, function () {
	console.log("Server is running on port 3000 ");
});

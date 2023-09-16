import express from "express";
import { MongoClient } from "mongodb";
const app = express();
if (!Bun.env.MONGODB_URI) {
	throw new Error("Please set mongo uri");
}
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
	res.render("admin");
});
app.post(
	"/add-item",
	async (req, res, next) => {
		console.log(req.body);
		const item = req.body;
		const mongoClient = await new MongoClient(Bun.env.MONGODB_URI || "");
		const db = mongoClient.db("Zok").collection("Calendar");
		await db.insertOne({
			title: item.title,
			name: item.name,
			img: item.img,
			date: item.date,
			time: item.timeBegin + " - " + item.timeEnd,
			descr: item.descr.replaceAll("\r\n", "<br>"),
			location: item.location,
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

const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const { configure } = require("./startup");

const worker = new Worker("./worker.js");

const PORT = 8080;
const HOST = "0.0.0.0";

configure(app);

app.post("/apply", (req, res) => {
	if (!req.body.logInterval || !req.body.loggerCount) {
		res.sendStatus(400);
	}
	worker.postMessage({ data: req.body, type: "applySettings" });
	res.sendStatus(200);
});

app.post("/cancel", (req, res) => {
	worker.postMessage({ type: "cancel" });
});

app.get("/health", (req, res) => {
	res.status(200).send("hello");
});

app.listen(PORT, HOST, () => {
	console.log(`server started at ${HOST}:${PORT}`);
});

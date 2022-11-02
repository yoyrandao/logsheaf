const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

module.exports = {
	configure: (app) => {
		app.use(cors());

		console.log(path.join(__dirname, "..", "dist"));
		app.use(express.static(path.join(__dirname, "..", "dist")));

		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());
	},
};

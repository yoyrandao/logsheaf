const { parentPort } = require("worker_threads");
const { machine, release, hostname } = require("os");
const fixture = require("chance").Chance();

const workerIds = [];

parentPort.on("message", (payload) => {
	if (payload.type === "applySettings") {
		apply(payload.data);
		return;
	}
	if (payload.type === "cancel") {
		cancel();
		return;
	}
});

const apply = (data) => {
	workerIds.forEach((id) => clearInterval(id));
	Array.from(Array(data.loggerCount).keys()).forEach((i) => {
		workerIds.push(setInterval(() => log(i), +data.logInterval));
	});
}

const cancel = () => {
	workerIds.forEach((id) => clearInterval(id));
}

const log = (loggerId) => {
	const logPayload = {
		loggerId,
		date: new Date(),
		machine: machine,
		os: release(),
		host: hostname(),
		message: fixture.string(),
	};
	console.log("%j", logPayload);
};

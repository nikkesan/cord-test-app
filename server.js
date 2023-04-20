import express from "express";
import CordServer from "@cord-sdk/server";

// You can retrieve these values from console.cord.com
// This code will not work until you've replaced these
// values with your own.
const CORD_APPLICATION_ID = "CORD_APPLICATION_ID";
const CORD_SECRET = "CORD_SECRET";

// Note:
// It's a best practice to use environment variables rather than hard-coding
// application secrets. This example code is just to get you up and running as
// fast as possible. In production, you should use something like
// https://www.npmjs.com/package/dotenv to load your environment variables.

const app = express();
const PORT = 3337;

app.get("/generate-cord-token", function generateCordToken(req, res) {
	const clientAuthToken = CordServer.getClientAuthToken(
		CORD_APPLICATION_ID,
		CORD_SECRET,
		{
			// The user ID can be any identifier that makes sense to your application.
			// As long as it's unique per-user, Cord can use it to represent your user.
			user_id: "severusatreides",

			// Same as above. An organization ID can be any unique string. Organizations
			// are groups of users.
			organization_id: "starpotterdunewars",

			// By supplying the  `user_details` object, you can create the user in
			// Cord's backend on-the-fly. No need to pre-sync your users.
			user_details: {
				email: "sevvy@arrakis.spice",
				name: "Severus Atreides",
			},

			// By supplying the `organization_details` object, just like the user,
			// Cord will create the organization on-the-fly.
			organization_details: {
				name: "starpotterdunewars",
			},
		}
	);

	// You only need this line if you're running this locally with the vite
	// example project.
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

	res.setHeader("Content-Type", "application/json");
	res.status(200);
	res.send(JSON.stringify({ clientAuthToken }));
});

app.listen(PORT, () => {
	console.log(`Cord example app listening on port ${PORT}`);
});

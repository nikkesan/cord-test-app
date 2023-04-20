import { useState, useEffect } from "react";
import { CordProvider, PagePresence, Thread } from "@cord-sdk/react";
import "./App.css";

function App() {
	const [cordToken, setCordToken] = useState(undefined);

	useEffect(() => {
		(async () => {
			try {
				// Change this to wherever your server is running.
				const server = "http://localhost:3337";
				const response = await fetch(`${server}/generate-cord-token`);
				const data = await response.json();
				setCordToken(data.clientAuthToken);
			} catch (error) {
				console.log("Something went wrong!: ", error);
			}
		})();
	}, [setCordToken]);

	return (
		<CordProvider clientAuthToken={cordToken}>
			<div style={{ margin: "0 auto", maxWidth: "500px" }}>
				<header
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<h1>Hello World!</h1>
					<PagePresence />
				</header>
				<p>Let's get Cord-y!</p>
				<Thread threadId="a-first-conversation" />
			</div>
		</CordProvider>
	);
}

export default App;

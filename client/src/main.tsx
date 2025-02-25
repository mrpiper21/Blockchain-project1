import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";

const rootElement = document.getElementById("root")!;
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
		<ToastContainer />
	</React.StrictMode>
);

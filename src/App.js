import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Customers from "./Customers";
import Trainings from "./Trainings";

import "./App.css";
// ylhäällä tarvittavat importoinnit Appin toimimiseen
//alhaalta lähtee itse App

function App() {
	//luodaan state, jolla saadaan navigaatiopalkki toimimaan
	//(eli valittanko customers vai trainings sivu renderöitäväksi)
	const [value, setValue] = React.useState("customer");

	//funktio, jolla muuttaa renderöitävän näkymän
	const handleChange = (event, value) => {
		setValue(value);
	};
	//renderöitävä näkymä
	return (
		//navipalkki
		<div className="App">
			<AppBar position="static">
				<Tabs value={value} onChange={handleChange}>
					<Tab value="customer" label="Customers" />
					<Tab value="training" label="Trainings" />
				</Tabs>
			</AppBar>
			{value === "customer" && <Customers></Customers>}
			{value === "training" && <Trainings></Trainings>}
		</div>
	);
}

export default App;
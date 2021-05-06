import React from "react";
import { AgGridReact } from "ag-grid-react";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddTraining from "./components/AddTraining";

import "./App.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Customers() {
	//state, johon haetaan tiedot fetchillä
	const [customers, setCustomers] = React.useState([]);

	//saadaan fetch "aktivoitua" useEffectillä
	React.useEffect(() => {
		fetchCustomers();
	}, []);

	//haetaan asiakkaat get-metodilla ja asetetaan tiedot customers-stateen
	const fetchCustomers = () => {
		fetch("https://customerrest.herokuapp.com/api/customers")
			.then((response) => response.json())
			.then((data) => setCustomers(data.content))
			.catch((err) => console.error(err));
	};

	//Asiakkaan lisääminen
	const addCustomer = (newCustomer) => {
		//tehdään post-kutsu ja muutetaan AddCustomerissa oleva data stringiksi
		//haetaan asiakaslista uudestaan, jolloin saadaan lisätty asiakas taulukkoon
		fetch("https://customerrest.herokuapp.com/api/customers", {
			method: "POST",
			body: JSON.stringify(newCustomer),
			headers: { "Content-type": "application/json" },
		})
			.then((response) => {
				//tarkistetaan, että vastaus on ok
				if (response.ok) fetchCustomers();
				else alert("Something went terribly wrong! Please try again!");
			})
			.catch((err) => console.error(err));
	};

	//asiakkaan tietojen muuttaminen: haetaan muutetut tiedot EditCustomerista
	//put-metodilla muutetaan tiedot, haetaan asiakkaat uudestaan,
	//jolloin saadaan myös muutokset näkyviin sivulle.
	const editCustomer = (url, updatedCustomer) => {
		fetch(url, {
			method: "PUT",
			body: JSON.stringify(updatedCustomer),
			headers: { "Content-type": "application/json" },
		})
			.then((response) => {
				if (response.ok) fetchCustomers();
				else alert("Something went wrong");
			})
			.catch((err) => console.error(err));
	};

	//poistetaan asiakas
	const deleteCustomer = (url) => {
		//varmistetaan halutaanko oikeasti poistaa
		if (window.confirm("Are you absolutely sure?")) {
			// tehdään fetch delete-metodilla dokumentaatio-ohjeen mukaisesti
			fetch(url, { method: "DELETE" })
				.then((response) => {
					//tarkistellaan virheiden varalta
					if (response.ok) fetchCustomers();
					else alert("Something went horribly wrong! Please try again!");
				})
				.catch((err) => console.error(err));
		}
	};

	//lisätään treeni asiakkaalle
	const addTraining = (newTraining) => {
		fetch("https://customerrest.herokuapp.com/api/trainings", {
			method: "POST",
			body: JSON.stringify(newTraining),
			headers: { "Content-Type": "application/json" },
		})
			.then((response) => {
				if (response.ok) fetchCustomers();
				else alert("Something went wrong");
			})
			.catch((err) => console.error(err));
	};

	// määritetään taulukko ja taulukon arvot (fetchillä haetut tiedot data.contentissa)
	//treenin lisäys, nimitiedot, osoite, postinro, kaupunki, sposti ja nro
	//viimeiseksi renderöidään ikonit muuttamiselle ja poistamiselle
	const columns = [
		{
			headerName: "",
			field: "links.0.href",
			width: 200,
			pinned: "left",
			cellRendererFramework: (params) => (
				<AddTraining
					link={params.value}
					addTraining={addTraining}
					customer={params.data}
				/>
			),
		},
		{ field: "firstname", sortable: true, filter: true },
		{ field: "lastname", sortable: true, filter: true },
		{ field: "streetaddress", sortable: true, filter: true },
		{ field: "postcode", sortable: true, filter: true },
		{ field: "city", sortable: true, filter: true },
		{ field: "email", sortable: true, filter: true },
		{ field: "phone", sortable: true, filter: true },
		{
			headerName: "",
			field: "links.0.href",
			width: 80,
			pinned: "right",
			cellRendererFramework: (params) => (
				<EditCustomer
					link={params.value}
					customer={params.data}
					editCustomer={editCustomer}
				/>
			),
		},
		{
			headerName: "",
			width: 80,
			pinned: "right",
			field: "links.0.href",
			//renderöidään roskakori ikoni poistonappulaksi
			cellRendererFramework: (params) => (
				<IconButton
					color="secondary"
					onClick={() => deleteCustomer(params.value)}
				>
					<DeleteIcon />
				</IconButton>
			),
		},
	];

	//renderöidään näkyville ensin asiakkaan lisäysnappula
  //sitten taulukko
	return (
		<div>
			<AddCustomer addCustomer={addCustomer} />
			<div
				className="ag-theme-material"
				style={{ height: 700, width: 1760, margin: "auto", marginTop: 15 }}
			>
				<AgGridReact
					//asiakkaat customers-statesta
					rowData={customers}
					//kuinka näytetään, columns-statesta
					columnDefs={columns}
					//sivutus päälle
					pagination={true}
					//jaetaan niin, että sivullaan on 6 riviä
					paginationPageSize={10}
					//poistaa solun valinnan, eli hävittää "aktiivisen" solun näyttämisen
					suppressCellSelection={true}
				/>
			</div>
		</div>
	);
}

//exportoidaan Customers Appin käytettäväksi
export default Customers;

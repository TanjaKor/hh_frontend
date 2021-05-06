import React from "react";
import { AgGridReact } from "ag-grid-react";
import Moment from "react-moment";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import "./App.css";

function Trainings() {
	//state, johon tulee taulukko treeneistä
	const [trainings, setTrainings] = React.useState([]);

	//aktivoidaan treenien hakemisen funktio
	React.useEffect(() => {
		fetchTrainings();
	}, []);

	//Haetaan treenit
	const fetchTrainings = () => {
		fetch("https://customerrest.herokuapp.com/gettrainings")
			.then((response) => response.json())
			.then((data) => setTrainings(data))
			.catch((err) => console.error(err));
	};

	//Poistetaan treeni
	const deleteTraining = (id) => {
		//varmistetaan halutaanko toiminto tehdä
		if (window.confirm("Are you absolutely sure?")) {
			//poisto delete-metodilla dokumentaation mukaisesti
			fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, {
				method: "DELETE",
			})
				.then((response) => {
           //tarkistetaan, että vastaus on ok
					if (response.ok) fetchTrainings();
					else alert("Something went horribly wrong! Please try again!");
				})
				.catch((err) => console.error(err));
		}
	};

	//state, joka määrittelee taulukon tiedot: aika (momentilla muokattuna),
	//aktiviteetti, kesto, asiakkaan tiedot ja poistoikoni
	const columns = [
		{
			field: "date",
			sortable: true,
			filter: true,
			cellRendererFramework: (params) => (
				<Moment format="MMMM DD YYYY, h:mm a">{params.value}</Moment>
			),
		},
		{ field: "activity", sortable: true, filter: true },
		{ field: "duration", sortable: true, filter: true },
		{
			headerName: "Firstname",
			field: "customer.firstname",
			sortable: true,
			filter: true,
		},
		{
			headerName: "Lastname",
			field: "customer.lastname",
			sortable: true,
			filter: true,
		},
		{
			headerName: "",
			field: "id",
			width: 80,
			cellRendererFramework: (params) => (
				<IconButton
					style={{ margin: 0 }}
					color="secondary"
					onClick={() => deleteTraining(params.value)}
				>
					<DeleteIcon />
				</IconButton>
			),
		},
	];

	//renderöinti
	return (
		<div>
			<div
				//ag-grid muotoilu taulukolle
				className="ag-theme-material"
				style={{ height: 700, width: 1100, margin: "auto", marginTop: 30 }}
			>
				<AgGridReact
					//rivien tiedot tulee trainings-statesta
					rowData={trainings}
					//rivit näytetään state columnsin mukaisesti
					columnDefs={columns}
					//sivutus päälle
					pagination={true}
					//maksimissaan 10 treeniä sivullaan
					paginationPageSize={10}
					//siistitään ulkoasua ja poistetaan aktiivisen solun näyttö
					suppressCellSelection={true}
				/>
			</div>
		</div>
	);
}

//exportoidaan Trainigns Appin käytettäväksi
export default Trainings;
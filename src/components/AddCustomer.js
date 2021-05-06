import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function AddCustomer(props) {
	//state, jolla saadaan dialogi auki (ja kiinni)
	const [open, setOpen] = React.useState(false);

	//state, jolla saadaan tallennettua asiakkaan tiedot
	const [customer, setCustomer] = React.useState({
		firstname: "",
		lastname: "",
		streetaddress: "",
		postcode: "",
		city: "",
		email: "",
		phone: "",
	});

	//Avatan dialogi
	const handleClickOpen = () => {
		setOpen(true);
	};

	//suljetaan dialogi
	const handleClose = () => {
		setOpen(false);
	};

	//tallennetaan asiakkaiden tiedot, eli saadaan
	//propsien kautta addCustomer-funktio Customer:sta
	const handleSave = () => {
		props.addCustomer(customer);
		setOpen(false);
	};

	//tallennettaan syötettävät tiedot stateen
	const inputChanged = (event) => {
		setCustomer({ ...customer, [event.target.name]: event.target.value });
	};

	//renderöidään ensin button, millä avataan dialogi-ikkuna,
	//tämän jälkeen avautuva dialogi-ikkuna, sen kentät
	//ja toiminnot (peruutus ja tallennus-buttonit)
	return (
		<div>
			<Button
				style={{ marginTop: 15, marginBottom: 15 }}
				size="large"
				variant="contained"
				color="primary"
				onClick={handleClickOpen}
			>
				New customer
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add customer</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To add a customer please fill the form below
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						name="firstname"
						label="Firstname"
						value={customer.firstname}
						onChange={inputChanged}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="lastname"
						label="Lastname"
						value={customer.lastname}
						onChange={inputChanged}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="streetaddress"
						label="Streetaddress"
						value={customer.streetaddress}
						onChange={inputChanged}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="postcode"
						label="Postcode"
						value={customer.postcode}
						onChange={inputChanged}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="city"
						label="City"
						value={customer.city}
						onChange={inputChanged}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="email"
						label="Email"
						value={customer.email}
						onChange={inputChanged}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="phone"
						label="Phonenumber"
						value={customer.phone}
						onChange={inputChanged}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleSave} color="primary">
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
//exportoidaan, että on käytettävissä appissa.
export default AddCustomer;

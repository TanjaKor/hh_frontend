import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import moment from "moment";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

function AddTraining(props) {
	//state, jolla saadaan dialogi auki (ja kiinni)
	const [open, setOpen] = React.useState(false);

	//state, jolla saadaan tallennettua treenin tiedot
	const [training, setTraining] = React.useState({
		date: "",
		activity: "",
		duration: "",
		customer: props.link,
	});

	//Avataan dialogi
	const handleClickOpen = () => {
		setOpen(true);
	};

	//suljetaan dialogi
	const handleClose = () => {
		setOpen(false);
	};

	//tallennetaan treenin tiedot ( ja laitetaan dialogi kiinni)
	const handleSave = () => {
		props.addTraining(training);
		setOpen(false);
	};

	//tallennettaan syötettävät tiedot stateen
	const inputChanged = (event) => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	//Muutetaan päivämäärä oikeaan muotoon
	const changedDate = (date) => {
		setTraining({ ...training, date: moment(date).toISOString() });
	};

	//renderöidään ensin button, millä avataan dialogi-ikkuna,
	//tämän jälkeen avautuva dialogi-ikkuna, sen kentät
	//ja toiminnot (peruutus ja tallennus-buttonit)
	return (
		<div>
			<Button
				style={{ marginBottom: 4 }}
				variant="outlined"
				size="small"
				color="primary"
				onClick={handleClickOpen}
			>
				New training
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Add training</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To add a training for {props.customer.firstname} please fill the
						form below
					</DialogContentText>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DateTimePicker
							label="Date"
							value={training.date}
							disablePast
							showTodayButton
							onChange={(date) => changedDate(date)}
						/>
					</MuiPickersUtilsProvider>
					<TextField
						margin="dense"
						name="activity"
						label="Activity"
						value={training.activity}
						onChange={inputChanged}
						fullWidth
					/>
					<TextField
						margin="dense"
						name="duration"
						label="Duration"
						value={training.duration}
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
export default AddTraining;

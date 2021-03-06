import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function EditCustomer(props) {

  //dialogin avaus ja sulku
  const [open, setOpen] = React.useState(false);

  //asiakkaan tiedot
  const [customer, setCustomer] = React.useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: ''
  });

  //avattaessa näytetään muokattavan asiakkaan
  //tiedot
  const handleClickOpen = () => {
    setCustomer({
      firstname: props.customer.firstname,
      lastname: props.customer.lastname,
      streetaddress: props.customer.streetaddress,
      postcode: props.customer.postcode,
      city: props.customer.city,
      email: props.customer.email,
      phone: props.customer.phone
    })
    setOpen(true);
  };

  //suljetaan dialogi  
  const handleClose = () => {
    setOpen(false);
  };

  //tallennetaan tiedot propsien avulla
  const handleSave = () => {
    props.editCustomer(props.link, customer);
    setOpen(false);
  };

  //tallennetaan muokattavat tiedot customer-stateen  
  const inputChanged = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  };

  //renderöidään ensin edit-nappula, 
  //Avauksen jälkeen renderöidään itse dialogi
  //mihin tehdään muutokset sekä cancel ja save nappula
  return (
    <div>
      <IconButton 
        color="primary" onClick={handleClickOpen}>
        <EditIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To edit your customer please fill the form below
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

};

//exportoidaan käytettäväksi
export default EditCustomer; 

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class AlertDialog extends React.Component {
  //const [open, setOpen] = React.useState(props.ShowDialog);
  constructor(props){
    super(props);
    this.state = {open:false};
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open:true
    });
  }

  handleClose() {
    this.setState({
      open:false
    });
  }

  

  render(){
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Attention!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.messageDialog}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }  
}
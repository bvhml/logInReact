import React from 'react';
import ButtonSubmit from './ButtonSubmit';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class SignInForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            messageDialog:'',
            showDialog:false,
        };

        this.handleClose = this.handleClose.bind(this);
    }

    
    handleSubmit(event){

        const email = event.target.email.value;
        const password = event.target.password.value;

        axios.post('http://localhost/usuario', {
          nombre: email,
          apellido: password
        })
        .then( response => {
          //console.log(response);
            this.setState({
              email:email,
              password:password,
              messageDialog:response.data.mensaje,
              showDialog:true
          });
        })
        .catch((error) => {
          //console.log(error);
            this.setState({
              email:email,
              password:password,
              messageDialog:error.data.mensaje,
              showDialog:true
          });
        });
        
        event.preventDefault();
        return;
      }
    
      componentDidUpdate(){
        console.log(this.state.showDialog);
        //alert(this.state.messageDialog.data);
      }

    
      handleClose() { 
        this.setState({
          showDialog:false
        });
      }

      

    render(){
        const {classes} = this.props;

        return(
            
            <form className={classes.form} onSubmit={e => this.handleSubmit(e)} noValidate>
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  />
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  />
                  <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  />
                  <Dialog
                    open={this.state.showDialog}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{"Attention!"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {this.state.messageDialog}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary" autoFocus>
                        Dismiss
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <ButtonSubmit classes={classes.submit}/>
                  <Grid container>
                  <Grid item xs>
                      <Link href="#" variant="body2">
                      Forgot password?
                      </Link>
                  </Grid>
                  <Grid item>
                      <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                      </Link>
                  </Grid>
                  </Grid>
                  
              </form>
        );
    }
}
import React from 'react';
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
import FormValidator from './FormValidator'
import validator from 'validator'
import Info from '@material-ui/icons/Info'
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import * as LinkRouter from "react-router-dom";
import AuthHelperMethods from './AuthHelperMethods';
import jwt from 'jwt-decode'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const validatorArg = new FormValidator([
  {
    field: 'email',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Please provide an email address.'
  },
  { 
    field: 'email',
    method: validator.isEmail,
    validWhen: true,
    message: 'That is not a valid email.'
  },
  { 
    field: 'password',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Email and Password required.'
  }
]);

var  validationResponse =  {email:false,password:false};

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailInput = React.createRef();
        
    }

    focusInput(component) {
      if (component) {
          React.findDOMNode(component).focus(); 
      }
    }
    
    Auth = new AuthHelperMethods();
    componentWillMount(){
      if (this.Auth.loggedIn()){
        this.props.history.replace('/');
      }
    }
    handleSubmit(event){
     
      event.preventDefault();

      

      const email = event.target.email.value;
      const password = event.target.password.value;

      this.setState({
        email:email,
        password:password,
      });



      const validation = validatorArg.validate({email:email,password:password});

    

      validationResponse = {email: validation.email.isInvalid,password:validation.password.isInvalid}

      if (validation.isValid) {
        console.log("TODO BIEN");
          

        this.Auth.login(email, password)
          .then(res => {
            if (res === false) {
              this.setState({
                messageDialog:"Usuario/Password no son correctos",
                showDialog:true,
              });
              return alert("Usuario/Password no son correctos");
              
            }
            
            console.log(res);
            //this.props.history.replace("/");
          })
          .catch(err => {
            alert(err);
          });

      }
      else{
        //if is Invalid
        if (validationResponse.email) { 
        }
        else if (validationResponse.password) {
          
        }
      }
      
      
      return;

      }
    
      componentDidUpdate(){

        
        if (validationResponse.email) {
          //console.log(this.emailInput.current);
           
        }
        else if (validationResponse.password) {
          
        }
      }

      handleClose() { 
        this.setState({
          showDialog:false
        });
      }

      

    render(){
        const {classes,handleClick} = this.props;
        
        
        return(
            <div className={classes.paper} spacing={5}>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign in
              </Typography>
              <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                    <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={validationResponse.email}
                    inputRef={this.emailInput}
                    
                    />
                    <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={validationResponse.password}
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
                      <DialogContent className={classes.dialogContent}>
                      <Info className={classes.icon} />
                        <DialogContentText id="alert-dialog-description" >
                          
                          {this.state.messageDialog}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                          Dismiss
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      >
                      Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                    <Link href="#" className={classes.Link} onClick={handleClick('forgotPassword')}>
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2"  className={classes.Link} onClick={handleClick('register')}>
                        Don't have an account? Sign Up
                      </Link>
                    </Grid>
                    </Grid>
                </form>
              </div>
        );
    }
}
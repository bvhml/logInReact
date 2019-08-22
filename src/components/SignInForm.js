import React, { useState, useEffect } from 'react';
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
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';

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



export default function SignInForm (props) {

  let themeName = props.themeName;

  const handleChange = props.handleChange;

      const [state,setState] = useState({
        email:'',
        password:'',
        messageDialog:'',
        showDialog:false,
      });

        /*this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        */
       let emailInput = React.createRef();

    let validationResponse =  {};

    function focusInput(component) {
      if (component) {
          React.findDOMNode(component).focus(); 
      }
    }
    
    let Auth = new AuthHelperMethods();

    useEffect(() =>{
      if (Auth.loggedIn()){
        //this.props.history.replace('/');
        console.log("Ya inicie sesion");
        
      }
      else{
        Auth.logout();
      }
    });
    
    function handleSubmit(event){
     
      event.preventDefault();


      const email = event.target.email.value;
      const password = event.target.password.value;

      setState(state => ({
        ...state,
        email:email,
        password:password,
      }));



      const validation = validatorArg.validate({email:email,password:password});

    

      validationResponse = {email: validation.email.isInvalid,password:validation.password.isInvalid}

      if (validation.isValid) {
        console.log("TODO BIEN");
          

        Auth.login(email, password)
          .then(res => {
            if (res.data.status === 400) {
              setState(state => ({
                ...state,
                messageDialog:"Usuario/Password no son correctos",
                showDialog:true,
              }));
              //return alert("Usuario/Password no son correctos");
              
            }
            else if (res.data.status === 200){
              if (Auth.loggedIn()){
                //this.props.history.replace('/');
                console.log("Ya inicie sesion");
              }
              else{
                Auth.logout();
              }
            }
            
            //console.log(res);
            //this.props.history.replace("/");
          })
          .catch(err => {
            //alert(err);
            setState(state => ({
              ...state,
              messageDialog:"Usuario/Password no son correctos",
              showDialog:true,
            }));
          });

      }
      else{
        //if is Invalid
        
      }
      
      
      return;

      }
    

      function handleClose() { 
        setState(state => ({
          ...state,
          showDialog:false
        }));
      }

      

   
        const {classes,handleClick} = props;
        
        
        return(
          <div>
          <Grid container component="main" className={classes.root} fixed = {'true'}>
          <CssBaseline />
          <Grid item xs={false} sm={5} md={7} component={Paper} className={classes.image} elevation={7} square></Grid>
            <Grid item xs={12} sm={7} md={5} component={Paper} elevation={7} square >
              <Grid container item justify="flex-end" direction="row">
                <FormControlLabel
                value="top"
                control={<Switch
                  checked={state.checkedB}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label={themeName}
                labelPlacement="bottom"
              />
              </Grid>
              <div className={classes.paper} spacing={5}>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign in
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
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
                    inputRef={emailInput}
                    
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
                      open={state.showDialog}
                      onClose={handleClose}
                      TransitionComponent={Transition}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Attention!"}</DialogTitle>
                      <DialogContent className={classes.dialogContent}>
                      <Info className={classes.icon} />
                        <DialogContentText id="alert-dialog-description" >
                          
                          {state.messageDialog}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
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
            </Grid>
            </Grid>
            </div>
            
        );
    
}
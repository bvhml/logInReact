import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
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
import Typography from '@material-ui/core/Typography';
import Help from '@material-ui/icons/Help';
import AuthHelperMethods from './AuthHelperMethods';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import * as LinkRouter from "react-router-dom";
import {Redirect} from "react-router-dom";

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
  },
  { 
    field: 'nombre',
    method: validator.isNumeric,
    validWhen: false,
    message: 'Nombre required.'
  },
  { 
    field: 'nombre',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Nombre required.'
  },
  { 
    field: 'apellido',
    method: validator.isEmpty,
    validWhen: false,
    message: 'Apellido required.'
  },
  { 
    field: 'apellido',
    method: validator.isNumeric,
    validWhen: false,
    message: 'Apellido required.'
  }
]);


let validationResponse =  {};
let registrado = false;
export default function Register (props){

        let themeName = props.themeName;
        let checkedB = props.checkedB;
        const handleChange = props.handleChange;

        const [state,setState] = useState({
          email:'',
          password:'',
          messageDialog:'',
          showDialog:false,
        });

        /*
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        */

        let emailInput = React.createRef();
        
    

    

    let Auth = new AuthHelperMethods();
    
    useEffect(() =>{
      let Authenticate = new AuthHelperMethods();

      
      if (Authenticate.loggedIn()){
        //this.props.history.replace('/');
        console.log("Ya inicie sesion");
       
      }
      else{
        Authenticate.logout();
      }
    },[]);

    function handleSubmit(event){

        const email = event.target.email.value;
        const password = event.target.password.value;
        const nombre = event.target.nombre.value;
        const apellido = event.target.apellido.value;

        setState(state => ({
          ...state,
          email:email,
          password:password,
          nombre:nombre,
          apellido:apellido,
        }));

      const validation = validatorArg.validate({email: email,password: password,nombre: nombre,apellido: apellido});

      validationResponse = {email: validation.email.isInvalid,password:validation.password.isInvalid,nombre:validation.nombre.isInvalid,apellido:validation.apellido.isInvalid}
      
     

      if (validation.isValid) {
        console.log("TODO BIEN");
          
        Auth.signUp(email, password,nombre,apellido)
          .then(res => {
            if (res === false) {
              setState(state => ({
                ...state,
                messageDialog:"El correo ya esta en uso.",
                showDialog:true,
              }));
              return alert("El correo ya esta en uso.");
              
            }
            else{
              setState(state => ({
                ...state,
                messageDialog:"Creado con exito",
                showDialog:true,
              }));
            }
            
            

            console.log(res);
            //props.history.replace("/");
          })
          .catch(err => {
            setState(state => ({
              ...state,
              messageDialog:"Correo ya esta en uso.",
              showDialog:true,
            }));
            //alert(err);
          });

          


        
      }
      else{
        //if is Invalid
        if (validationResponse.email) { 
        }
        else if (validationResponse.password) {
          
        }
      }

        
      event.preventDefault();
      return;

      }
    

      function handleClose() { 

        if (state.messageDialog === 'Creado con exito'){
          registrado = true;
        }

        setState(state => ({
          ...state,
          showDialog:false
        }));
      }

      
        const {classes} = props;
        
        let { from } = { from: { pathname: "/" } };
        if(state.messageDialog !== 'Creado con exito'){
          registrado = false;
        }
        if (registrado) {
          return <Redirect to={from}/>;
        }
        
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
                  checked={checkedB}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />}
                label={themeName}
                labelPlacement="bottom"
              />
              </Grid>
              <div className={classes.paper} spacing={1}>
              <Avatar className={classes.avatar}>
                  <Help/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
             
            
              <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <Grid container item spacing={1}>
                        <Grid item md xs>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="nombre"
                            label="Nombres"
                            name="nombre"
                            autoComplete="Nombres"
                            autoFocus
                            error={validationResponse.nombre}
                            inputRef={emailInput}
                            />
                        </Grid>
                        <Grid item md xs>
                            <TextField
                            variant="outlined"
                            margin="dense"
                            required
                            fullWidth
                            id="apellido"
                            label="Apellidos"
                            name="apellido"
                            autoComplete="Apellidos"
                            error={validationResponse.apellido}
                            inputRef={emailInput}
                            />
                        </Grid>
                    </Grid>

                    <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                    <Dialog
                      open={state.showDialog}
                      onClose={handleClose}
                      TransitionComponent={Transition}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Attention!"}</DialogTitle>
                      <DialogContent className={classes.dialogContent} >
                      <Avatar  className={classes.bigAvatar} >
                      <Info className={classes.icon} />
                      </Avatar>
                        <DialogContentText id="alert-dialog-description" className={classes.DialogContentText}>
                          {state.messageDialog}
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} autoFocus>
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
                      Sign Up
                    </Button>
                    <Grid container>
                    <Grid item lg>
                    <LinkRouter.Link to="/" component={Link} className={classes.Link} style={{ textDecoration: 'none' }}>
                      Already have an account? Sign In
                    </LinkRouter.Link>
                    </Grid>
                    </Grid>
                </form>
              </div>
            </Grid>
            </Grid>
            </div>

            
        );
    
}
import React from 'react';
import axios from 'axios'
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
  ,
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



export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            email:'',
            password:'',
            nombre:'',
            apellido:'',
            messageDialog:'',
            showDialog:false,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailInput = React.createRef();
        
    }

    validationResponse =  {};

    focusInput(component) {
      if (component) {
          React.findDOMNode(component).focus(); 
      }
    }

    Auth = new AuthHelperMethods();
    componentWillMount(){
      if (this.Auth.loggedIn()){
        //this.props.history.replace('/');
      }
    }

    handleSubmit(event){

        const email = event.target.email.value;
        const password = event.target.password.value;
        const nombre = event.target.nombre.value;
        const apellido = event.target.apellido.value;

        this.setState({
          email:email,
          password:password,
          nombre:nombre,
          apellido:apellido,
        });

      const validation = validatorArg.validate({email: email,password: password,nombre: nombre,apellido: apellido});

      this.validationResponse = {email: validation.email.isInvalid,password:validation.password.isInvalid,nombre:validation.nombre.isInvalid,apellido:validation.apellido.isInvalid}
      
     

      if (validation.isValid) {
        console.log("TODO BIEN");
          
        this.Auth.signUp(email, password,nombre,apellido)
          .then(res => {
            if (res === false) {
              this.setState({
                messageDialog:"El correo ya esta en uso.",
                showDialog:true,
              });
              return alert("El correo ya esta en uso.");
              
            }
            else{
              this.setState({
                messageDialog:"Creado con exito",
                showDialog:true,
              });
            }
            
            

            console.log(res);
            //this.props.history.replace("/");
          })
          .catch(err => {
            this.setState({
              messageDialog:"Correo ya esta en uso.",
              showDialog:true,
            });
            //alert(err);
          });

          


        
      }
      else{
        //if is Invalid
        if (this.validationResponse.email) { 
        }
        else if (this.validationResponse.password) {
          
        }
      }

        
      event.preventDefault();
      return;

      }
    
      componentDidUpdate(){

        
        if (this.validationResponse.email) {
          //console.log(this.emailInput.current);
           
        }
        else if (this.validationResponse.password) {
          
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
            <div className={classes.paper} spacing={1}>
              <Avatar className={classes.avatar}>
                  <Help/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
             
            
              <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
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
                            error={this.validationResponse.nombre}
                            inputRef={this.emailInput}
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
                            error={this.validationResponse.apellido}
                            inputRef={this.emailInput}
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
                    error={this.validationResponse.email}
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
                    error={this.validationResponse.password}
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
                      Sign Up
                    </Button>
                    <Grid container>
                    <Grid item xs>
                    <Link href="#" className={classes.Link} onClick={handleClick('signIn')}>
                        Have already an account, Sign In
                    </Link>
                    </Grid>
                    </Grid>
                </form>
              </div>
        );
    }
}
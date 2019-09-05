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
import {Redirect} from "react-router-dom";
import AuthHelperMethods from './AuthHelperMethods';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Parallax } from "react-parallax";
import MadeBy from './MadeBy'
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const image1 =
'https://source.unsplash.com/random';



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


let validationResponse =  {};

export default function SignInForm (props) {

  let themeName = props.themeName;
  let checkedB = props.checkedB;
  

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
    
    let Auth = new AuthHelperMethods();

    useEffect(() =>{
      let Authenticate = new AuthHelperMethods();
      if (Authenticate.loggedIn()){
        //this.props.history.replace('/');
        //console.log("Ya inicie sesion");
      }
      else{
        //console.log("No inicie sesion");
        Authenticate.logout();
      }
    }, []);
    
    function handleSubmit(event){
     
      event.preventDefault();


      const email = event.target.email.value;
      const password = event.target.password.value;
      const validation = validatorArg.validate({email:email,password:password});

    

      validationResponse = {email: validation.email.isInvalid,password:validation.password.isInvalid}
      

      if (validation.isValid) {
        //console.log("TODO BIEN");
          

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
              
                //this.props.history.replace('/');
                console.log("Respuesto correcta de Log In");
                
                setState(state => ({
                  ...state,
                  email:email,
                  password:password,
                }));
            }
          })
          .catch(err => {
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
      
      setState(state => ({
        ...state,
        email:email,
        password:password,
      }));
      
      return;

      }
    

      function handleClose() { 
        setState(state => ({
          ...state,
          showDialog:false
        }));
      }

      

   
        const {classes,handleChange} = props;
        
        let { from } = { from: { pathname: "/me" } };
    

        if (Auth.loggedIn()) {
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
                      Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                      
                    <Link href="#" className={classes.Link} >
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <LinkRouter.Link to="/register" component={Link} className={classes.Link} style={{ textDecoration: 'none' }}>
                      Don't have an account? Sign Up
                    </LinkRouter.Link>
                    </Grid>
                    </Grid>
                </form>
              </div>
            </Grid>
            </Grid>
            <div style={styles}>
              <Parallax bgImage={image1} strength={500}>
                <Grid container className={classes.footer}>
                  <Grid container className={classes.MadeBy} >
                      <Grid item container className={classes.MadeBy} >
                        <Grid item className={classes.MadeBy}>
                        <Avatar alt="Avatar" src={require("../static/images/facetigo.jpg")} className={classes.photo} />
                        </Grid>
                        <Grid className={classes.MadeBy}>
                        <MadeBy name="from Guatemala" style={{color:'white',fontSize:'20vh'}}/>
                        </Grid>
                      </Grid>
                      <Grid item container className={classes.MadeBy}>
                      <Tooltip title="GitHub">
                          <Link href='https://github.com/bvhml' target="_blank" className={classes.Link} style={{fontSize:30}} >
                            <Grid className={classes.MadeBy}>
                            <Avatar alt="Avatar" src={require("../static/images/gitHubLogo.png")} className={classes.bigPhoto} />
                            </Grid>
                          </Link>
                      </Tooltip>
                      <Tooltip title="linkedIn">
                        <Link href='https://www.linkedin.com/in/victorh-morales-gt' target="_blank" className={classes.Link} style={{fontSize:30}} >
                          <Grid className={classes.MadeBy}>
                          <Avatar alt="Avatar" src={require("../static/images/linkedin.png")} className={classes.bigPhoto} />
                          </Grid>
                        </Link>
                      </Tooltip>
                      <Tooltip title="facebook">
                        <Link href='https://www.facebook.com/victorhmoralesgt' target="_blank" className={classes.Link} style={{fontSize:30}} >
                          <Grid className={classes.MadeBy}>
                          <Avatar alt="Avatar" src={require("../static/images/facebook.png")} className={classes.bigPhoto} />
                          </Grid>
                        </Link>
                      </Tooltip>
                      </Grid>
                  </Grid>
                </Grid>
              </Parallax>
              </div>
            </div>
            
        );
    
}
import React, { useState, useEffect } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormValidator from './FormValidator'
import validator from 'validator'
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {Redirect} from "react-router-dom";
import AuthHelperMethods from './AuthHelperMethods';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';



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



export default function Me (props) {

  let themeName = props.themeName;

  const handleChange = props.handleChange;

      const [state,setState] = useState({
        email:'',
        password:'',
        messageDialog:'',
        showDialog:false,
      });
 
   

    
    let Auth = new AuthHelperMethods();
    

    useEffect(() =>{
      let Authenticate = new AuthHelperMethods();
      if (Authenticate.loggedIn()){
        //this.props.history.replace('/');
        console.log("Ya inicie sesion ME");

        //Authenticate.validateMe();
        //decoded = Auth.getConfirm();
        //console.log(decoded);
      }
      else{
        console.log("No inicie sesion");
        Authenticate.logout();
      }
    }, []);
    

      function logOut(){
        setState(state => ({
          ...state,
          showDialog:false
        }));
        Auth.logout();
      }

      


        const {classes} = props;
        let { from } = { from: { pathname: "/" } };
        if (!Auth.loggedIn()) {
          return <Redirect to={from}/>;
        }
        
        return(
          <div>
          <Grid container component="main" className={classes.root} fixed = {'true'}>
          <CssBaseline />
          <Grid item xs={false} sm={false} md={false} component={Paper} className={classes.image} elevation={7} square></Grid>
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={7} square >
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
                  WELCOME TO HOME PAGE
              </Typography>
              <Grid container item xs justify="flex-end" direction="row">
              <Button
                     
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={logOut}
                      >
                      Log Out
                    </Button>
              </Grid>
              </div>
              
            </Grid>
            </Grid>
            </div>
            
        );
    
}
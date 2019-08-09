import React from 'react';
import ButtonSubmit from './ButtonSubmit';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

export default class SignInForm extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            email:'',
            password:'',
        };
    }

    handleSubmit(event){

        const email = event.target.email.value;
        const password = event.target.password.value;

        axios.post('http://localhost/usuario', {
          nombre: email,
          apellido: password
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
   
      
        this.setState({
            email:email,
            password:password,
        });

        event.preventDefault();
        return;
      }
    
    render(){
        const {classes} = this.props;
        const {email,password} = this.state;

        console.log(email);
        console.log(password);


        return(
            
            <form className={classes.form} onSubmit={(e) => this.handleSubmit(e)} noValidate>
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
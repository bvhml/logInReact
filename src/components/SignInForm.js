import React from 'react';
import ButtonSubmit from './ButtonSubmit';
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import AlertDialog from './AlertDialog'

export default class SignInForm extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            email:'',
            password:'',
            response:'',
            showDialog:false,
        };
    }

    handleSubmit(event){

        const email = event.target.email.value;
        const password = event.target.password.value;

        axios.post('http://localhost/usuario', {
          nombre: email,
          apellido: password
        })
        .then( response => {
          console.log(response);
          this.setState({response:response});
        })
        .catch((error) => {
          console.log(error);
          this.setState({response:error});
        });


        this.setState({
            email:email,
            password:password,
            showDialog:true
        });

        
        event.preventDefault();
        return;
      }
    
      componentDidUpdate(){
        console.log(this.state.showDialog);
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
                  <AlertDialog Response={this.state.response} ShowDialog={this.state.showDialog}/>
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
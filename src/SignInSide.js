import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from "react-router-dom";
import SignInForm from './components/SignInForm'
import ForgotPassword from './components/ForgotPassword'
import Me from './components/Me'
import Register from './components/Register'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AuthHelperMethods from './components/AuthHelperMethods';

let theme = createMuiTheme({});
let themeName = 'Dark';

let useStyles = makeStyles(theme => ({
  root: {
    height:'100vh',
    padding: '6vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 1), //8,1
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paperContainer: {
    backgroundColor:'#303030',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  bigAvatar: {
    margin: 10,
    width: 100,
    height: 100,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  palette: {
    primary: blue,
    secondary: deepOrange,
  },
  status: {
    danger: 'orange',
  },
  icon: {
    fontSize: 100,
    color:'#273c75'
  },
  dialogContent:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:400,
  },
  Link: {
    color:blue[400],
  },
}));

//--------------------DARK THEME--------------------
theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      root: {
        backgroundColor:blue[400],
        border: 0,
        color: 'white',
        "&:hover": { // increase the specificity for the pseudo class
          color: "white",
          backgroundColor:blue[800],
        }
      },
    },
    MuiPaper:{
      root: {
        backgroundColor:'#303030',
        color:'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
    MuiGrid:{
      root:{
        backgroundColor:'#2b2a2a',
      },
      item:{
        backgroundColor:'#303030',
      },
      
    },
    MuiTextField:{
      root:{
        color :'white',   
        borderColor:blue,           
      },
    },
    MuiInputLabel: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: "white",
        borderColor:"white",
        "&$focused": { // increase the specificity for the pseudo class
          color: "white"
        }
      }
    },
    MuiOutlinedInput:{
      root:{
        color:'white',
        borderColor:"white",
      },
      
      notchedOutline: {
        borderWidth: "1px",
        borderColor: blue[400],
        '&$hover': {
          borderColor:"white",
          borderWidth: 2,
        },
      },
    },
    
  },
  palette: {
    primary: blue,
    secondary: deepOrange,
    dark:'#303030',
  },
  status: {
    danger: 'orange',
  },
  paper: {
    margin: theme.spacing(8, 1), //8,1
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor:'#303030',
  },
  paperContainer: {
    backgroundColor:'#303030',
  },
});

export default function SignInSide (props) {
  
  const classes = useStyles();
  let Auth = new AuthHelperMethods();
  const [tema, setTema] = React.useState({
    checkedA: false,
    checkedB: true,
  });

  const [view, setView] = React.useState(0);

  //const [greeting, setGreeting] = React.useState('Hello World');

  const handleClick = name => event => {
    event.preventDefault();

    if (name === "signIn") {
      setView(0);
    }
    else if (name === "forgotPassword"){
      setView(1);
    }
    else if(name === "register"){
      setView(2);
    }
    else if (name === "me"){
      setView(3);
    }

  }

  function SignInFormRoute(){
    return <SignInForm handleChange={handleChange} classes={classes} handleClick={handleClick} PrivateRoute={PrivateRoute}/>
  }  

  function ForgotPasswordRoute(){
    return <ForgotPassword classes={classes} handleClick={handleClick}/>
  }  

  function RegisterRoute(){
    return <Register handleChange={handleChange} classes={classes} handleClick={handleClick}/>
  }  

  function ProtectedRoute(){
    return <Me handleChange={handleChange} classes={classes} handleClick={handleClick}/>
  }  

  
  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          Auth.loggedIn() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        }
      />
    );
  }

  const handleChange = name => event => {
    setTema({ ...tema, [name]: event.target.checked });

    if (event.target.checked) {
      themeName = 'Dark';
      theme = createMuiTheme({
        overrides: {
          // Style sheet name ⚛️
          MuiButton: {
            root: {
              color: 'white',
              backgroundColor:blue,
            },
          },
          MuiPaper:{
            root: {
              backgroundColor:'#303030',
              color:'white',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
          },
          MuiGrid:{
            root:{
              backgroundColor:'#2b2a2a',
            },
            item:{
              backgroundColor:'#303030',
            },
            
          },
          MuiTextField:{
            root:{
              color :'white',   
              borderColor:blue,           
            },
          },
          MuiInputLabel: { // Name of the component ⚛️ / style sheet
            root: { // Name of the rule
              color: "white",
              borderColor:"white",
              "&$focused": { // increase the specificity for the pseudo class
                color: "white"
              }
            }
          },
          MuiOutlinedInput:{
            root:{
              color:'white',
              borderColor:"white",
            },
            notchedOutline: {
              borderWidth: "1px",
              borderColor: theme.palette.primary.main,
            },
          },
        },
        palette: {
          primary: blue,
          secondary: deepOrange,
          dark:'#303030',
        },
        status: {
          danger: 'orange',
        },
        paper: {
          margin: theme.spacing(8, 1), //8,1
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:'#303030',
        },
        paperContainer: {
          backgroundColor:'#303030',
        },
      });
    }
    else{
      themeName = 'Light';
      theme = createMuiTheme({
          palette: {
          primary: blue,
          secondary: deepOrange,
          dark:'#303030',
        },
      });
    }

    };

    return (
      
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact component={SignInFormRoute}/>
          <Route path="/register" exact component={RegisterRoute}/>
          <PrivateRoute path="/Me" component={ProtectedRoute} />
        </Router>
      </ThemeProvider>
    );
}
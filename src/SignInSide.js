import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import {BrowserRouter as Router,Route,Redirect} from "react-router-dom";
import SignInForm from './components/SignInForm'
import ForgotPassword from './components/ForgotPassword'
import Me from './components/Me'
import Register from './components/Register'
import AuthHelperMethods from './components/AuthHelperMethods';

let theme = createMuiTheme({});
let themeName = 'Dark';

let useStyles = makeStyles(theme => ({
  root: {
    height:'100vh',
    padding: '6vh',
  },
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    //background: 'linear-gradient(to right bottom, #2c3e50, #82ffa1)',
    backgroundColor: 'transparent',
    height: '100vh',
    alignItems: 'center',
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
  photo: {
    margin: 10,
    width: 100,
    height: 100,
  },
  bigPhoto: {
    margin: 10,
    width: 75,
    height: 75,
    background: theme.palette.background.paper,
    color: 'red',
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
    color: 'white',
  },
  DialogContentText:{
    color:blue[400],
  },
  Link: {
    color:blue[400],
  },
  MadeBy: {
    color:'white',
    backgroundColor:'transparent',
    display: 'flex',
    justifyContent: 'center',
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

  const handleChange = name => event => {
    
    setTema({ ...tema, [name]: event.target.checked});
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

    
    return;
    };
 

  //const [greeting, setGreeting] = React.useState('Hello World');


  function SignInFormRoute(){
    return <SignInForm handleChange={handleChange} classes={classes} themeName={themeName} checkedB={tema.checkedB}/>
  }  

  // eslint-disable-next-line
  function ForgotPasswordRoute(){
    return <ForgotPassword classes={classes} />
  }  

  function RegisterRoute(){
    return <Register handleChange={handleChange} classes={classes} themeName={themeName} checkedB={tema.checkedB}/>
  }  

  function ProtectedRoute(){
    return <Me handleChange={handleChange} classes={classes} themeName={themeName} checkedB={tema.checkedB}/>
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

  

    return (
      
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact component={SignInFormRoute}/>
          <Route path="/register" exact component={RegisterRoute}/>
          <PrivateRoute path="/me" component={ProtectedRoute} />
        </Router>
      </ThemeProvider>
    );
}
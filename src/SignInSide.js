import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { BrowserRouter as Router, Route} from "react-router-dom";
import SignInForm from './components/SignInForm'
import ForgotPassword from './components/ForgotPassword'
import Me from './components/Me'
import Register from './components/Register'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
        backgroundColor:'#303030',
        border: 0,
        color: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
  const [state, setState] = React.useState({
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

  function goToMe(){ setView(3)};

  function SignInFormRoute(){
    return <SignInForm classes={classes} handleClick={handleClick} goToMe={goToMe}/>
  }  

  function ForgotPasswordRoute(){
    return <ForgotPassword classes={classes} handleClick={handleClick}/>
  }  

  function RegisterRoute(){
    return <Register classes={classes} handleClick={handleClick}/>
  }  

  function MeRoute(){
    return <Me classes={classes} handleClick={handleClick} goToMe={() => goToMe}/>
  }  

  
  

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });

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

    const formView = () => {
      if (view === 0) {
        return SignInFormRoute();
      }
      else if (view === 1){
        return ForgotPasswordRoute();
      }
      else if (view === 2){
        return RegisterRoute();
      }
      else if (view === 3){
        return MeRoute();
      }
    } 

    return (
      
      <ThemeProvider theme={theme}>
          <Grid container component="main" className={classes.root} fixed = {'true'}>
          <CssBaseline />
          <Grid item xs={false} sm={5} md={7} component={Paper} className={classes.image} elevation={7} square/>
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
          {formView()}
          </Grid>
          </Grid>
      </ThemeProvider>
    );
}
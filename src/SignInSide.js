import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Icon from '@material-ui/core/Icon';
import { BrowserRouter as Router, Route} from "react-router-dom";
import * as LinkRouter from "react-router-dom";
import SignInForm from './components/SignInForm'
import Switch from '@material-ui/core/Switch';

let theme = createMuiTheme({});
let themeName = 'Light';
function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Built with love by the '}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {' team.'}
    </Typography>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}


let useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    padding: '10vw',
    backgroundColor: theme.palette.dark,
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
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
}));



export default function SignInSide (props) {
  const classes = useStyles();
  
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });

    if (event.target.checked) {
      themeName = 'Dark';
      theme = createMuiTheme({
        overrides: {
          // Style sheet name ⚛️
          MuiButton: {
            root: {
              backgroundColor:'#303030',
              border: 0,
              color: 'white',
              //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
            item:{
              backgroundColor:'#303030',
            },
            
          },
          MuiTextField:{
            root:{
              color:'white',            }
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
      theme = createMuiTheme({});
    }

  };

  
    return (
      <ThemeProvider theme={theme}>
          <Switch
            checked={state.checkedB}
            onChange={handleChange('checkedB')}
            value="checkedB"
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />{themeName}
          <Grid container component="main" className={classes.root} fixed = {'true'}>
          <CssBaseline />
          <Grid item xs={false} sm={5} md={7} className={classes.image} />
          <Grid item xs={12} sm={7} md={5} component={Paper} elevation={7} square>
              <div className={classes.paper} spacing={5}>
              <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Sign in
              </Typography>
              <SignInForm classes={classes}/>
              </div>
          </Grid>
          </Grid>
      </ThemeProvider>
    );
}
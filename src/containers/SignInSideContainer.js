import React from 'react';
import SignInSide from '../SignInSide'
import axios from 'axios'



export default class SignInSideContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:'',
        };

        
    }

   
    handleSubmit(e){

        
        const email = this.state.email;
        const password = this.state.password;

        console.log(email);

        axios.post('/user', {
            firstName: email,
            lastName: password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        this.setState({
            email,
            password,
        })
        e.preventDefault();
    }

    render(){
        return(
            <SignInSide onSubmit={this.handleSubmit}/>
        );
    }
}
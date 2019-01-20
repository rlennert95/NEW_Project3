import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Link } from 'react-router-dom'
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
        this.state = {
            username: null,
          }
    }

    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
        })
      }

      componentDidMount() {
        this.getUser()
      }

      getUser() {
        axios.get('/user/').then(response => {
          // console.log('Get user response: ')
          // console.log("resonse.data: " + response.data)
          // // console.log(response.data.CurrentUser.email) //still needs more
          // console.log("response.data.user.CurrentUser: " + response.data.user)
          if (response.data.CurrentUser) {
            console.log('Get User: There is a user saved in the server session: ')
            console.log(response.data)
    
            this.setState({
              loggedIn: true,
              username: response.data.CurrentUser.username,
          
            })
          } else {
            console.log('Get user: no user');
            this.setState({
              loggedIn: false,
              username: null,
            })
            
          }   console.log("LOGGED IN STATE")
              console.log(this.state.loggedIn)
              console.log("CONTRACTOR STATE")
              console.log(this.state.contractor)
  
              if (this.state.loggedIn == true && this.state.contractor == true ) {
               console.log("I AM A CONTRACTOR")
              } else if (this.state.loggedIn == true && this.state.contractor == false) {
                console.log("I AM A HOMEOWNER")
              } else {
                console.log("I AM NOTHING")
              }
          
        })
   
      }

    render() {
        const loggedIn = this.props.loggedIn;
        console.log('navbar render, props: ')
        console.log(this.props);
        
        return (
            <div>

                <header className="navbar navbar-expand-lg navbar-light bg-light" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                <span className="text-secondary">logout</span></Link>
                                <Link to="/listings" className="btn btn-link">
                                        <span className="text-secondary">Listings</span>
				                    </Link>
                                    <Link to="/Jobs" className="btn btn-link">
                                        <span className="text-secondary">Submit a job request</span>
				                    </Link>
                                    <div> Username: {this.state.username} </div>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to="/" className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                    </Link>
                                    <Link to="/login" className="btn btn-link text-secondary">
                                        <span className="text-secondary">login</span>
				                    </Link>
                                    <Link to="/signup" className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
				                    </Link>
                                    <Link to="/signup-contractor" className="btn btn-link">
                                        <span className="text-secondary">contractor sign up</span>
				                    </Link>
                                    <Link to="/listings" className="btn btn-link">
                                        <span className="text-secondary">Listings</span>
				                    </Link>
                                    <Link to="/Jobs" className="btn btn-link">
                                        <span className="text-secondary">Submit a job request</span>
				                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                    <div id="top-filler"></div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Helping Hand</h1>
                    </div>
                </header>
            </div>

        );

    }
}

export default Navbar
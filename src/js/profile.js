import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import PropTypes from 'prop-types'

import {setLogin, profile, setProfile, isLogin} from "../index";
import "../css/profile.css";

class Profile extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    logout(){
        if (!window.confirm("Sure to log out?")){
            return;
        }
        setLogin(false);
        this.context.router.history.push('/booklist');
    }
    render(){
        if (!isLogin){
            alert("Please login first");
            this.context.router.history.push('/login');
        }
        return(
            <div>
                <div className={"Info"}>
                    <h2>Your info:</h2>
                    Name: {profile.name}<br/>
                    Address: {profile.address}<br/>
                    Email: {profile.email}<br/>
                    Phone: {profile.phone}<br/>
                </div>
                <div >
                    <button className={"logout"} onClick={()=>this.logout()}>Log out</button>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile);

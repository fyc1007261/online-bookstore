import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import PropTypes from 'prop-types'
import $ from 'jquery';


import {setLogin} from "../index";
import "../css/login.css";




class Login extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    checkLogin(){
        let usn = document.getElementById("username").value;
        let psw = document.getElementById("password").value;

        $.post("login/check", { usn: usn, psw: psw },
            function(data){
                if (data.toString()==="Succeed")
                {
                    setLogin(true);
                    this.context.router.history.push('/booklist');
                }
            });
    }
    render(){
        return(
            <div className={"back"}>
                <div>
                    <div className={"inputs"}>
                    <div>Username</div><input id={"username"}/>
                    <div>Password</div><input type={"password"} id={"password"}/>

                    <div>
                        <button className={"loginbut"} onClick={()=>this.checkLogin()}>Login</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);

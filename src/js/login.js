import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router";
import PropTypes from 'prop-types'
import $ from 'jquery';
import {FormControl, Button} from 'react-bootstrap';

import {isLogin, setLogin} from "../index";
import "../css/login.css";




class Login extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(){
        super();
        this.state={
            valid: false
        }
    }
    checkLogin(){
        let usn = document.getElementById("username").value;
        let psw = document.getElementById("password").value;
        let result;

        $.ajax({ url: "login/check",
            data: {usn:usn, psw:psw},
            context: document.body,
            async: false,
            type: "post",
            success: function(data){
                result = data.toString();
                if (result==="Succeed")
                {
                    setLogin(true)
                }
            }});

        if (isLogin){
            this.context.router.history.goBack();
            alert("Success!");
        }
        else if (result==="Blocked user"){
            alert("Your ID has been blocked");
        }
        else{
            alert("Invalid username or password.");
        }

    }
    render(){
        return(
            <div className={"back"}>
                <div>
                    <div className={"inputs"}>
                        <div>Username</div><FormControl className={"usnNpsw"} id={"username"}/>
                        <div>Password</div><FormControl className={"usnNpsw"}  type={"password"} id={"password"}/>
                    <div>
                        <Button bsSize="small" bsStyle="success" className={"loginbut"} onClick={()=>this.checkLogin()}>Login</Button>
                        <Link to={"/signup"}><Button  bsSize="small" bsStyle="info" className={"signup"}>Sign Up</Button></Link>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);

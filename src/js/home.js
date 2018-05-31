import React, { Component } from 'react';
import '../css/home.css';
import { withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class Home extends Component{
    render(){
        return(
            <div className={"back"}>
                <img className={"imgCSAPP"} alt={"An img of CSAPP"} src={require("../res/csapp.png")}/>
                <div className={"ads"}>
                    <br/><br/><br/><br/>
                    <div className={"newarr"}>New Arrivals!!</div>
                    <div className={"off"}>$34.99 Only!!</div>
                </div>
                <Link className={"toList"} to={"/booklist"}>
                    <Button bsSize={"large"} bsStyle={"success"}>View Book List</Button>
                </Link>
            </div>
        )
    }
}

export default withRouter(Home);

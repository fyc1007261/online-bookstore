import React, { Component } from 'react';
import '../css/purchase.css';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {originalData} from '../js/data';
import {isLogin} from '../index';

let data = originalData;

function Confirm(props) {
    let Book = {
        ID: props.ID,
        Name:"",
        Author: "",
        Language: "",
        Price: 0,
    };
    let Customer = {
        Name:"",
        Address:"",
        Email:"",
        Phone:"",
    };
    for (let i=0; i<data.length; i++){
        if (Number(data[i].ID) === Number(Book.ID)) {
            Book.Name = data[i].Name;
            Book.Author= data[i].Author;
            Book.Language= data[i].Language;
            Book.Price = data[i].Price;
        }
    }
    //set customer info
    Customer.Name="SJTU Student";
    Customer.Address= "No.800, Dongchuan Rd.";
    Customer.Email = "sjtu@sjtu.edu.cn";
    Customer.Phone = "13888866666";
    return(
        <div className={"back"}>
            <div className={"confirm"}>Please Confirm Your Purchase</div>
            <div className={"BookInfo"}>
                <h2>Your info:</h2>
                Name: {Customer.Name}<br/>
                Address: {Customer.Address}<br/>
                Email: {Customer.Email}<br/>
                Phone: {Customer.Phone}<br/>
            </div>
            <div className={"CustomerInfo"}>
                <h2>Book info:</h2>
                Name: {Book.Name}<br/>
                Author: {Book.Author}<br/>
                Language: {Book.Language}<br/>
                Price: {(Number(Book.Price)/100).toFixed(2)}<br/>
            </div>
            <div className={"cancel"}>
                <Link className={"linkText"} to={"/booklist"}>Cancel</Link>
            </div>
            <button
                className={"submit"}
                onClick={()=>alert("Unable to purchase yet.")}>
                Submit
            </button>
        </div>
    );
}

class Purchase extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    render(){
        if (!isLogin){
            alert("Please login first")
            this.context.router.history.push('/login');
        }
        return (
            <div>
                <Confirm ID={this.props.location.state.id}/>
            </div>
        )
    }
}

export default withRouter(Purchase);

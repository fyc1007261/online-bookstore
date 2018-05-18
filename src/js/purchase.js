import React, { Component } from 'react';
import '../css/purchase.css';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {isLogin} from '../index';
import $ from "jquery";

let data;

function Confirm(props) {
    let Book = {
        ID: props.ID,
        Name:"",
        Author: "",
        Language: "",
        Price: 0,
        Summary:""
    };
    for (let i=0; i<data.length; i++){
        if (Number(data[i].ID) === Number(Book.ID)) {
            Book.Name = data[i].Name;
            Book.Author= data[i].Author;
            Book.Language= data[i].Language;
            Book.Price = data[i].Price;
            Book.Summary = data[i].Summary;
        }
    }

    let purchase = function (id) {
        $.ajax({ url: "purchase/add_to_cart",
            data: {book_id:id},
            context: document.body,
            async: true,
            type: "post",
            success: function(data){
                if(data === "Succeed")
                    alert("Successfully added to the cart.");
                else if (data === "Not logged in")
                    alert("Please log in first");
                else
                    alert("Error with data or connection.")
            }});
    }

    return(
        <div className={"back"}>
            <div className={"confirm"}>Book Information</div>
            <div className={"CustomerInfo"}>
                <h2>Book info:</h2>
                Name: {Book.Name}<br/>
                Author: {Book.Author}<br/>
                Language: {Book.Language}<br/>
                Price: {(Number(Book.Price)/100).toFixed(2)}<br/>
                Summary: {Book.Summary}<br/>
            </div>
            <div className={"cancel"}>
                <Link className={"linkText"} to={"/booklist"}>Cancel</Link>
            </div>
            <button
                className={"submit"}
                onClick={()=>purchase(Book.ID)}>
                Purchase
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
        $.ajax({ url: "/getBook",
            context: document.body,
            async: false,
            type: "post",
            success: function(value){
                data = $.parseJSON(value);
            }});
        return (
            <div>
                <Confirm ID={this.props.location.state.id}/>
            </div>
        )
    }
}

export default withRouter(Purchase);

import React, { Component } from 'react';
import '../css/purchase.css';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Button} from 'react-bootstrap';

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

        this.context.router.history.push("/cart");
    };

    let comment = function (bookID) {
        let ret = prompt("Add your comment");
        if (ret!==null){
            $.ajax({ url: "purchase/add_comment",
                data: {bookID:bookID, comment:ret},
                context: document.body,
                async: true,
                type: "post",
                success: function(data){
                    if(data === "Success")
                        alert("Successfully added to the cart.");
                    else
                        alert("Error with data or connection.");
                }});
        }
        window.location.reload();
    };

    return(
        <div>
            <div className={"confirm"}>Book Information</div>
            <div className={"BookInfo"}>
                <h2>Book info:</h2>
                Name: {Book.Name}<br/>
                Author: {Book.Author}<br/>
                Language: {Book.Language}<br/>
                Price: {(Number(Book.Price)/100).toFixed(2)}<br/>
                Summary: {Book.Summary}<br/>
            </div>
            <div className={"cancel"}>
                <Link className={"linkText"} to={"/booklist"}>
                    <Button bsSize={"large"}>
                    Cancel
                    </Button>
                </Link>
            </div>
            <Button bsStyle={"primary"} bySize={"large"}
                className={"submit"}
                onClick={()=>purchase(Book.ID)}>
                Purchase
            </Button>
            <Button bsStyle={"info"} bySize={"large"}
                    className={"comment"}
                    onClick={()=>comment(Book.ID)}>
                Comment
            </Button>
        </div>
    );
}

class Comments extends Component{
    constructor(props){
        super(props);
        let data = [];
        $.ajax({ url: "purchase/get_comment",
            data: {bookID: this.props.ID},
            context: document.body,
            async: false,
            type: "post",
            success: function(value){
                if (value === "no comments at present."){
                    data = ["no comments at present."];
                }
                else {
                    data = $.parseJSON(value);
                    data = data["comment"];
                }
            }});

        let buf = [];
        for (let i=0; i<data.length; i++){
            buf.push(<div>Comment {i+1}: {data[i]}</div>);
        }

        this.state={
            comments: data,
            show: buf
        };
    }

    render(){
        let data;
        return(
            <div className="Comments">
                <h2>Comments:</h2>
                {this.state.show}
            </div>
        );
    }
}

class Purchase extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    render(){
        if (!isLogin){
            alert("Please login first");
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
            <div className="back">
                <Confirm ID={this.props.location.state.id}/>
                <Comments ID={this.props.location.state.id}/>
            </div>
        )
    }
}

export default withRouter(Purchase);

import React, { Component } from 'react';
import '../css/indents.css';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {isLogin, setLogin} from '../index';
import $ from "jquery";

class Indents extends Component {
    constructor() {
        super();
        this.state = {
            tableArray: []
        };
        let datajson = [];
        $.ajax({
            url: "/fetch_indents",
            data: {
                book_filter: "",
                author_filter: "",
                time_filter: ""
            },
            context: document.body,
            async: false,
            type: "post",
            success: function (data) {
                datajson = $.parseJSON(data);
            }
        });
        let len = datajson.length;
        for (let i=0; i<len; i++){
            let temp = datajson[i];
            let tbls = this.state.tableArray;
            tbls.push(<tr>
                <td>{temp['OrderID']}</td>
                <td>{temp['Book_name']}</td>
                <td>{temp['Author']}</td>
                <td>{temp['Amount']}</td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Time']}</td>
            </tr>);
            this.setState({tableArray: tbls})
        }
    }

    change_filter(){
        this.setState({tableArray:[]});
        let datajson = [];
        let book_filter = document.getElementById("bookFilter").value;
        let author_filter = document.getElementById("authorFilter").value;
        let time_filter = document.getElementById("timeFilter").value
        $.ajax({
            url: "/fetch_indents",
            data: {
                book_filter: book_filter,
                author_filter: author_filter,
                time_filter: time_filter
            },
            context: document.body,
            async: false,
            type: "get",
            success: function (data) {
                datajson = $.parseJSON(data);
            }
        });
        let len = datajson.length;
        let tbls = [];
        for (let i=0; i<len; i++){
            let temp = datajson[i];
            tbls.push(
                <tr>
                <td>{temp['OrderID']}</td>
                <td>{temp['Book_name']}</td>
                <td>{temp['Author']}</td>
                <td>{temp['Amount']}</td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Time']}</td>
                </tr>);
            console.log(this.state.tableArray);
            this.setState({tableArray: tbls})
        }
        this.render();
    }
    render() {
        let style = {
            "border-radius": "2vmin",
            "width": "25vmin",
            "backgroundColor": "lightgrey", /* Green */
            "border": "yellow",
            "color": "black ",
            "padding": "1vmin 2vmin",
            "align": "center",
            "display": "inline-block",
            "font-size": "3vmin",
        };

        return (
            <div className={"back"}>
                <div className="bookFilter">
                    Book name<input onChange={()=>this.change_filter()} id={"bookFilter"} className="indentFilters"/>
                    Author <input onChange={()=>this.change_filter()} id={"authorFilter"} className="indentFilters"/>
                    Create Time <input  onChange={()=>this.change_filter()} placeholder={"yyyy/mm/dd"} id={"timeFilter"} className="indentFilters"/>
                </div>
                <table className={"indentTableCart"}>
                    <th><button style={style}>Order ID</button></th>
                    <th><button style={style}>Book</button></th>
                    <th><button style={style}>Author</button></th>
                    <th><button style={style}>Amount</button></th>
                    <th><button style={style}>Price</button></th>
                    <th><button style={style}>Time</button></th>
                    <tbody id={"tbody"}>
                    {this.state.tableArray}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default withRouter(Indents);

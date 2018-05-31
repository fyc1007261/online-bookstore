import React, { Component } from 'react';
import '../css/indents.css';
import {withRouter} from 'react-router'
import $ from "jquery";
import {Button, FormControl, ControlLabel, FormGroup, Form} from "react-bootstrap";

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
                <td>{temp['Time'].replace('T', ' ')}</td>
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
                <td>{temp['Time'].replace('T', ' ')}</td>
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
            "border": "yellow",
            "padding": "1vmin 2vmin",
            "align": "center",
            "display": "inline-block",
            "font-size": "3vmin",
        };

        return (
            <div className={"back"}>
                <Form className="bookFilter" inline>
                    <FormGroup>
                        <ControlLabel className="controlLabel">Book name</ControlLabel>
                        {''}
                        <FormControl bsSize={"small"} onChange={()=>this.change_filter()} id={"bookFilter"} className="indentFilters"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel className="controlLabel">Author</ControlLabel>
                        {''}
                        <FormControl onChange={()=>this.change_filter()} id={"authorFilter"} className="indentFilters"/>
                    </FormGroup>
                <FormGroup>
                    <ControlLabel className="controlLabel">Create Time</ControlLabel>
                    {''}
                    <FormControl  onChange={()=>this.change_filter()} placeholder={"yyyy-mm-dd"} id={"timeFilter"} className="indentFilters"/>
                </FormGroup>
                </Form>
                <table className={"indentTableCart"}>
                    <th><Button style={style}>Order ID</Button></th>
                    <th><Button style={style}>Book</Button></th>
                    <th><Button style={style}>Author</Button></th>
                    <th><Button style={style}>Amount</Button></th>
                    <th><Button style={style}>Price</Button></th>
                    <th><Button style={style}>Time</Button></th>
                    <tbody id={"tbody"}>
                    {this.state.tableArray}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default withRouter(Indents);

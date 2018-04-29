import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../css/list.css';
import $ from "jquery";
import Modal from 'react-modal';
import {setLogin} from "../../index";
import PropTypes from "prop-types";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};


let data = [];

function Msg (props) {
    let style = {
        "border-radius": "2vmin",
        "width": "18vmin",
        "backgroundColor": "lightgrey", /* Green */
        "border": "yellow",
        "color": "black ",
        "padding": "1vmin 2vmin",
        "align": "center",
        "display": "inline-block",
        "font-size": "3vmin",
    };
    return (
        <table>
            <th><button style={style} onClick={props.UsernameClick}>Username</button></th>
            <th><button style={style} onClick={props.OrderIDClick}>Order ID</button></th>
            <th><button style={style} onClick={props.NameClick}>Book</button></th>
            <th><button style={style} onClick={props.AuthorClick}>Author</button></th>
            <th><button style={style} onClick={props.CategoryClick}>Category</button></th>
            <th><button style={style} onClick={props.AmountClick}>Amount</button></th>
            <th><button style={style} onClick={props.PriceClick}>Price</button></th>
            <th><button style={style} onClick={props.TimeClick}>Time</button></th>
            <tbody>
            {props.value}
            </tbody>
        </table>
    );
}

class Export extends Component{

    saveJSON(){
        if (!window.confirm("Sure to download JSON？")){
            return;
        }
        let FileSaver = require("file-saver/FileSaver.min");
        let blob = new Blob([JSON.stringify(data)], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Indents.json");
    }

    saveCSV(){
        if (!window.confirm("Sure to download CSV？")){
            return;
        }
        let FileSaver = require("file-saver/FileSaver.min");
        const Json2csvParser = require('json2csv').Parser;
        const fields = ['OrderID','Name', 'Author','Category', 'Amount', 'Price', 'Time'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(data);
        let blob = new Blob([csv], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Indents.csv");
    }
    render(){
        return(
            <a>
                <button className={"savebutAdmin"} onClick={()=>this.saveJSON()}>Export JSON</button>
                <button className={"savebut"} onClick={()=>this.saveCSV()}>Export CSV</button>
            </a>
        );
    }
}

class Tbl extends Component {

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            a : 1,
            tableArray : [],
            inp: ''
        };
        this.Filter = this.Filter.bind(this);
        let len = props.values.length;
        for (let i=0; i<len; i++){
            let temp = props.values[i];
            let tbls = this.state.tableArray;
            tbls.push(<tr>
                <td>{temp['Username']}</td>
                <td>{temp['OrderID']}</td>
                <td>{temp['Name']}</td>
                <td>{temp['Author']}</td>
                <td>{temp['Category']}</td>
                <td>{temp['Amount']}</td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Time']}</td>
            </tr>);
            this.setState({tableArray:tbls});
        }
    }

    sort_string(index) {
        let len = data.length;
        let arr = data;
        if (arr[0][index] > arr[len-1][index]){
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) > (arr[j + 1][index]) ) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        else{
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) < (arr[j + 1][index])) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        data = arr;
        this.render();
    }
    sort_num(index) {
        let len = data.length;
        let arr = data;
        for (let i=0; i<len; i++){
            arr[i][index] = Number(arr[i][index]);
        }
        if (arr[0][index] > arr[len-1][index]){
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) > (arr[j + 1][index]) ) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        else{
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) < (arr[j + 1][index])) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        for (let i=0; i<len; i++){
            arr[i][index] = String(arr[i][index]);
        }
        data = arr;
        this.render();
    }
    OrderIDclick (){
        this.sort_num("OrderID");
        this.Filter(1);
    }
    Usernameclick(){
        this.sort_string("Username");
        this.Filter(1);
    }
    Nameclick () {
        this.sort_string("Name");
        this.Filter(1);
    }
    Categoryclick () {
        this.sort_string("Category");
        this.Filter(1);
    }
    Amountclick(){
        this.sort_num("Amount");
        this.Filter(1);
    }
    Priceclick(){
        this.sort_num("Price");
        this.Filter(1);
    }
    Timeclick(){
        this.sort_string("Time");
        this.Filter(1);
    }
    Authorclick(){
        this.sort_string("Author");
        this.Filter(1);
    }

    check_filter(item, author, username, startTime, endTime, category){
        if (author!=="" &&item['Author']!==author)
            return false;
        if(username!=="" && item['Username']!==username)
            return false;
        if (category!=="" && item['Category']!==category)
            return false;
        if (startTime==="")
            startTime = "0000/00/00 00:00:00";
        if (endTime==="")
            endTime = "9999/00/00 00:00:00";
        return (item['Time']>=startTime && item['Time']<=endTime);
    }

    Filter(from){
        let len = data.length;
        let arr = data;
        let tbls = [];
        let author, username, category, startTime, endTime;
        if (from===0){
             author = document.getElementById("inputAuthor").value;
             username = document.getElementById("inputUsername").value;
             category = document.getElementById("inputCategory").value;
             startTime = document.getElementById("inputStartTime").value;
             endTime = document.getElementById("inputEndTime").value;
        }
        for (let i=0; i<len; i++){
            let temp = data[i];
            console.log(this.check_filter(temp, author, username, startTime, endTime, category));
            if(from !==1 && (!this.check_filter(temp, author, username, startTime, endTime, category)))
                continue;
            tbls.push(
                <tr>
                    <td>{temp['Username']}</td>
                    <td>{temp['OrderID']}</td>
                    <td>{temp['Name']}</td>
                    <td>{temp['Author']}</td>
                    <td>{temp['Category']}</td>
                    <td>{temp['Amount']}</td>
                    <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                    <td>{temp['Time']}</td>
                </tr>);
            this.setState({tableArray: tbls})
        }
        this.render();
    }

    render() {
        return (
            <div className={"back"}>
                <Export/>
                <Msg value={this.state.tableArray} OrderIDClick={()=>this.OrderIDclick()}
                     NameClick={()=>this.Nameclick()} CategoryClick={()=>this.Categoryclick()}
                     PriceClick={()=>this.Priceclick()} AmountClick={()=>this.Amountclick()}
                     TimeClick={()=>this.Timeclick()} UsernameClick={()=>this.Usernameclick()}
                     AuthorClick={()=>this.Amountclick()}
                />
                <button className={"manageBut"} onClick={this.openModal}>Manage</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Indent Stats</h2>
                    <h3>Type in the constraints.</h3>
                    <h3>The table may remain unchanged if none matches the constraints.</h3>
                    <form>
                        <br/>Username<br/><input id={"inputUsername"}/>
                        <br/>Author<br/> <input id={"inputAuthor"}/>
                        <br/>Category<br/> <input id={"inputCategory"}/>
                        <br/>Start time<br/> <input id={"inputStartTime"}/>
                        <br/>End time<br/> <input id={"inputEndTime"}/>
                    </form>
                    <button onClick={()=>this.Filter(0)}>Submit</button>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
    }
}

class IndentsAdmin extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    render(){
        $.ajax({ url: "admin/get_indents",
            context: document.body,
            async: false,
            type: "post",
            success: function(value){
                if (value !== "Not admin")
                    data = $.parseJSON(value);
                else
                    data = value;
            }});
        if (data==="Not admin"){
            alert("Not admin");
            this.context.router.history.goBack();
        }
        return(
            <div>
                <Tbl values={data}/>
            </div>
        )
    }
}

export default IndentsAdmin;

import React, { Component } from 'react';

import '../../css/list.css';
import $ from "jquery";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap';
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
        "width": "18vmin",
        "border": "yellow",
        "color": "black ",
        "padding": "1vmin 2vmin",
        "align": "center",
        "display": "inline-block",
        "font-size": "3vmin",
    };
    return (
        <table>
            <th><Button style={style} onClick={props.UsernameClick}>Username</Button></th>
            <th><Button style={style} onClick={props.OrderIDClick}>Order ID</Button></th>
            <th><Button style={style} onClick={props.NameClick}>Book</Button></th>
            <th><Button style={style} onClick={props.AuthorClick}>Author</Button></th>
            <th><Button style={style} onClick={props.CategoryClick}>Category</Button></th>
            <th><Button style={style} onClick={props.AmountClick}>Amount</Button></th>
            <th><Button style={style} onClick={props.PriceClick}>Price</Button></th>
            <th><Button style={style} onClick={props.TimeClick}>Time</Button></th>
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
                <Button bsStyle="info" className={"savebutAdmin"} onClick={()=>this.saveJSON()}>Export JSON</Button>
                <Button bsStyle="info" className={"savebut"} onClick={()=>this.saveCSV()}>Export CSV</Button>
            </a>
        );
    }
}

class Tbl extends Component {

    openModal() {
        this.setState({showModal: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({showModal: false});
    }

    constructor(props){
        super(props);
        let price = 0, sales = 0;
        let tbls = [];
        let len = props.values.length;
        for (let i=0; i<len; i++){
            let temp = props.values[i];
            price = price + Number((Number(temp['Price'])/100).toFixed(2));
            sales = Number(temp['Amount']) + sales;
            tbls.push(<tr>
                <td>{temp['Username']}</td>
                <td>{temp['OrderID']}</td>
                <td>{temp['Name']}</td>
                <td>{temp['Author']}</td>
                <td>{temp['Category']}</td>
                <td>{temp['Amount']}</td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Time'].replace('T',' ')}</td>
            </tr>);
        }

        this.state = {
            showModal:false,
            tableArray:tbls,
            totSales: sales,
            totPrice: price
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.Filter = this.Filter.bind(this);

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
            startTime = "0000-00-00T00:00:00";
        if (endTime==="")
            endTime = "9999-00-00T00:00:00";
        return (item['Time']>=startTime && item['Time']<=endTime);
    }

    Filter(from){
        let len = data.length;
        let tbls = [];
        let author, username, category, startTime, endTime;
        if (from===0){
             author = document.getElementById("inputAuthor").value;
             username = document.getElementById("inputUsername").value;
             category = document.getElementById("inputCategory").value;
             startTime = document.getElementById("inputStartTime").value.toString();
             endTime = document.getElementById("inputEndTime").value.toString();
             console.log(startTime, endTime);
        }
        let price=0, sales=0;
        for (let i=0; i<len; i++){
            let temp = data[i];
            console.log(this.check_filter(temp, author, username, startTime, endTime, category));
            if(from !==1 && (!this.check_filter(temp, author, username, startTime, endTime, category)))
                continue;
            price = price + Number((Number(temp['Price'])/100).toFixed(2));
            sales = Number(temp['Amount']) + sales;
            tbls.push(
                <tr>
                    <td>{temp['Username']}</td>
                    <td>{temp['OrderID']}</td>
                    <td>{temp['Name']}</td>
                    <td>{temp['Author']}</td>
                    <td>{temp['Category']}</td>
                    <td>{temp['Amount']}</td>
                    <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                    <td>{temp['Time'].replace('T',' ')}</td>
                </tr>);
            this.setState({tableArray: tbls});
            this.setState({totPrice: price, totSales:sales})
        }
        this.render();
    }

    render() {
        return (
            <div className={"back"}>
                <Export/>
                <Button bsStyle={"success"} className={"manageBut"} onClick={this.openModal}>Manage</Button>
                <Msg value={this.state.tableArray} OrderIDClick={()=>this.OrderIDclick()}
                     NameClick={()=>this.Nameclick()} CategoryClick={()=>this.Categoryclick()}
                     PriceClick={()=>this.Priceclick()} AmountClick={()=>this.Amountclick()}
                     TimeClick={()=>this.Timeclick()} UsernameClick={()=>this.Usernameclick()}
                     AuthorClick={()=>this.Amountclick()}
                />

                <div className={"tot"}> Tot Sales:{this.state.totSales} </div>
                <div className={"tot2"}>Tot Price:{this.state.totPrice}</div>
                <Modal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Indents stats
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h4>Type in the constraints.</h4>
                    <h4>The table may remain unchanged if none matches the constraints.</h4>
                    <form>
                        <br/>Username<br/><input id={"inputUsername"}/>
                        <br/>Author<br/> <input id={"inputAuthor"}/>
                        <br/>Category<br/> <input id={"inputCategory"}/>
                        <br/>Start time<br/> <input type={"datetime-local"} placeholder={"yy-mm-dd hh:mm:ss"} id={"inputStartTime"}/>
                        <br/>End time<br/> <input type={"datetime-local"} placeholder={"yy-mm-dd hh:mm:ss"} id={"inputEndTime"}/>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button onClick={()=>this.Filter(0)}>Submit</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
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

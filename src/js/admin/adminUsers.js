import React, { Component } from 'react';

import '../../css/list.css';
import $ from "jquery";
import Modal from 'react-modal';

import {Button} from 'react-bootstrap';

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
        "width": "25vmin",
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
            <th><Button style={style} onClick={props.NameClick}>Real name</Button></th>
            <th><Button style={style} onClick={props.PhoneClick}>Phone</Button></th>
            <th><Button style={style} onClick={props.EmailClick}>Email</Button></th>
            <th><Button style={style} onClick={props.AddressClick}>Address</Button></th>
            <th><Button style={style} onClick={props.ValidClick}>isValid</Button></th>
            <tbody>
            {props.value}
            </tbody>
        </table>
    );
}

function Selection(props){
    return(
        <select onChange={props.onChange} className={"Selector"} id={"selector"}>
            <option>Username</option>
            <option>Real Name</option>
            <option>Phone</option>
            <option>Email</option>
            <option>Address</option>
        </select>
    )

}


class Export extends Component{

    saveJSON(){
        if (!window.confirm("Sure to download JSON？")){
            return;
        }
        let FileSaver = require("file-saver/FileSaver.min");
        let blob = new Blob([JSON.stringify(data)], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Users.json");
    }

    saveCSV(){
        if (!window.confirm("Sure to download CSV？")){
            return;
        }
        let FileSaver = require("file-saver/FileSaver.min");
        const Json2csvParser = require('json2csv').Parser;
        const fields = ['Username','Name', 'Phone', 'Email', 'Address'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(data);
        let blob = new Blob([csv], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Users.csv");
    }
    render(){
        return(
            <a>
                <Button bsStyle="info" className={"savebut"} onClick={()=>this.saveJSON()}>Export JSON</Button>
                <Button bsStyle="info" className={"savebut"} onClick={()=>this.saveCSV()}>Export CSV</Button>
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
                <td>{temp['Name']}</td>
                <td>{temp['Phone']}</td>
                <td>{temp['Email']}</td>
                <td>{temp['Address']}</td>
                <td>{temp['isValid']}</td>
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
    Usernameclick (){
        this.sort_string("Username");
        this.Filter();
    }
    Nameclick () {
        this.sort_string("Name");
        this.Filter();
    }
    Emailclick () {
        this.sort_string("Email");
        this.Filter();
    }
    Phoneclick(){
        this.sort_num("Phone");
        this.Filter();
    }
    Addressclick(){
        this.sort_string("Address");
        this.Filter();
    }
    Filter(){
        let selectorFields = ['Username', 'Name', 'Phone', 'Email', 'Address', 'isValid'];
        let id = document.getElementById("selector").selectedIndex;
        let index = selectorFields[id];
        let s = document.getElementById("inpt").value;
        let len = data.length;
        let arr = data;
        let tbls = [];
        for (let i=0; i<len; i++){
            let temp = arr[i];
            let name = temp[index].toLowerCase();
            if (name.search(s.toLowerCase()) !== -1) {
                tbls.push(<tr>
                    <td>{temp['Username']}</td>
                    <td>{temp['Name']}</td>
                    <td>{temp['Phone']}</td>
                    <td>{temp['Email']}</td>
                    <td>{temp['Address']}</td>
                    <td>{temp['isValid']}</td>
                </tr>);
                this.setState({tableArray: tbls});
            }
        }
        this.render()
    }

    fetchState(){
        let username = document.getElementById("inputUsername").value;
        for (let i=0; i<data.length; i++){
            if (data[i]["Username"] === username){
                let theUser = data[i];
                document.getElementById("inputIsValid").value = theUser["isValid"];
            }
        }
    }

    modifyUser(){
        let username = document.getElementById("inputUsername").value;
        let isValid = document.getElementById("inputIsValid").value;

        let ret;
        $.ajax({ url: "admin/modify_user",
            data: {
                username: username,
                isValid: isValid
            },
            context: document.body,
            async: false,
            type: "post",
            success: function(data){
                ret = data;
                alert(data);
            },
            error: function () {
                alert("Bad connection or invalid inputs");
            }

        });
        if (ret==="Success"){
            window.location.reload();
        }
    }

    render() {
        return (
            <div className={"back"}>
                <Export/>
                <div className="nameFilter"><Selection onChange={()=>this.Filter()}/></div>
                <input className="inputFilter" id={"inpt"}
                       onChange={()=>this.Filter()}/>
                <Msg value={this.state.tableArray} UsernameClick={()=>this.Usernameclick()}
                     AddressClick={()=>this.Addressclick()} PhoneClick={()=>this.Phoneclick()}
                     EmailClick={()=>this.Emailclick()} NameClick={()=>this.Nameclick()}
                />
                <Button bsStyle="info" className={"manageBut"} onClick={this.openModal}>Manage</Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <h2 ref={subtitle => this.subtitle = subtitle}>Manage a user</h2>
                    <h3>Type in the Username to update information.</h3>
                    <h3>Adding a new user is NOT valid.</h3>
                    <form>
                        <br/>Username<br/><input id={"inputUsername"} onChange={()=>this.fetchState()}/>
                        <br/>isValid<br/> <input id={"inputIsValid"}/>
                    </form>
                    <button onClick={()=>this.modifyUser()}>Submit</button>
                    <button onClick={this.closeModal}>close</button>
                </Modal>
            </div>
        );
    }
}

class UserAdmin extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    render(){
        $.ajax({ url: "admin/get_user",
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

export default UserAdmin;

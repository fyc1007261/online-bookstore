import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from 'react-bootstrap';

import '../../css/list.css';
import $ from "jquery";
//import Modal from 'react-modal';
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
        "width": "22vmin",
        "border": "yellow",
        "color": "black ",
        "padding": "1vmin 2vmin",
        "align": "center",
        "display": "inline-block",
        "font-size": "3vmin",
    };
    return (
        <table>
            <th><Button style={style} onClick={props.IDClick}>BookID</Button></th>
            <th><Button style={style} onClick={props.BookClick}>Book</Button></th>
            <th><Button style={style} onClick={props.AuthorClick}>Author</Button></th>
            <th><Button style={style} onClick={props.LangClick}>Language</Button></th>
            <th><Button style={style} onClick={props.CategoryClick}>Category</Button></th>
            <th><Button style={style} onClick={props.PriceClick}>Price</Button></th>
            <th><Button style={style} onClick={props.InventoryClick}>Inventory</Button></th>
            <tbody>
            {props.value}
            </tbody>
        </table>
    );
}

function Selection(props){
    return(
        <select onChange={props.onChange} className={"Selector"} id={"selector"}>
            <option>BookID</option>
            <option>Name</option>
            <option>Author</option>
            <option>Language</option>
            <option>Category</option>
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
        FileSaver.saveAs(blob, "Books.json");
    }

    saveCSV(){
        if (!window.confirm("Sure to download CSV？")){
            return;
        }
        let FileSaver = require("file-saver/FileSaver.min");
        const Json2csvParser = require('json2csv').Parser;
        const fields = ['ID','Name', 'Author', 'Language', 'Category', 'Price', 'Sales', 'Inventory', 'Summary'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(data);
        let blob = new Blob([csv], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Books.csv");
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
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            a : 1,
            tableArray : [],
            showModal:false,
            inp: ''
        };
        this.Filter = this.Filter.bind(this);
        let len = props.values.length;
        for (let i=0; i<len; i++){
            let temp = props.values[i];
            let tbls = this.state.tableArray;
            tbls.push(<tr>
                <td>{temp['ID']}</td>
                <td>{temp['Name']}</td>
                <td>{temp['Author']}</td>
                <td>{temp['Language']}</td>
                <td>{temp['Category']}</td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Inventory']}</td>
            </tr>);
            this.setState({tableArray:tbls});
        }
    }

    add_to_cart(id){
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
    Bookclick (){
        this.sort_string("Name");
        this.Filter();
    }
    Authorclick () {
        this.sort_string("Author");
        this.Filter();
    }
    Languageclick () {
        this.sort_string("Language");
        this.Filter();
    }
    CategoryClick(){
        this.sort_string("Category");
        this.Filter();
    }
    Inventoryclick(){
        this.sort_num("Inventory");
        this.Filter();
    }
    Priceclick(){
        this.sort_num("Price");
        this.Filter();
    }
    IDClick(){
        this.sort_num("ID");
        this.Filter();
    }
    Filter(){
        let selectorFields = ['ID', 'Name', 'Author', 'Language','Category'];
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
                    <td>{temp['ID']}</td>
                    <td>{temp['Name']}</td>
                    <td>{temp['Author']}</td>
                    <td>{temp['Language']}</td>
                    <td>{temp['Category']}</td>
                    <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                    <td>{temp['Inventory']}</td>
                </tr>);
                this.setState({tableArray: tbls});
            }
        }
        this.render()
    }

    fetchState(){
        let id = document.getElementById("inputID").value;
        for (let i=0; i<data.length; i++){
            if (data[i]["ID"] === id){
                let theBook = data[i];
                document.getElementById("inputName").value = theBook["Name"];
                document.getElementById("inputAuthor").value = theBook["Author"];
                document.getElementById("inputLanguage").value = theBook["Language"];
                document.getElementById("inputCategory").value = theBook["Category"];
                document.getElementById("inputPrice").value = (theBook["Price"]/100).toFixed(2);
                document.getElementById("inputInventory").value = theBook["Inventory"];
                document.getElementById("inputSummary").value = theBook["Summary"];
            }
        }
    }

    modifyBook(){
        let name = document.getElementById("inputName").value;
        let author = document.getElementById("inputAuthor").value;
        let language = document.getElementById("inputLanguage").value;
        let book_id = document.getElementById("inputID").value;
        let price = document.getElementById("inputPrice").value;
        let inventory = document.getElementById("inputInventory").value;
        let summary = document.getElementById("inputSummary").value;
        let category = document.getElementById("inputCategory").value;
        let ret;
        $.ajax({ url: "admin/modify_book",
            data: {
                name:name,
                author: author,
                language:language,
                book_id: book_id,
                price: price,
                category:category,
                inventory: inventory,
                summary: summary
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

    deleteBook(){
        let ret;
        $.ajax({ url: "admin/delete_book",
            data: {
                book_id: document.getElementById("inputID").value
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
                <Msg value={this.state.tableArray} BookClick={()=>this.Bookclick()}
                     AuthorClick={()=>this.Authorclick()} LangClick={()=>this.Languageclick()}
                     InventoryClick={()=>this.Inventoryclick()} PriceClick={()=>this.Priceclick()}
                    IDClick={()=>this.IDClick()} CategoryClick={()=>this.CategoryClick()}
                />
                <Button  bsStyle="success" className={"manageBut"} onClick={this.openModal}>Manage</Button>
                <Modal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                        Manage a book
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h4>Type in the book ID to fetch and update information.</h4>
                    <h4>Adding a new book is also valid.</h4>
                    <form>
                        <br/>Book ID<br/><input id={"inputID"} onChange={()=>this.fetchState()}/>
                        <br/> new Name<br/><input id={"inputName"}/>
                        <br/> new Author<br/><input id={"inputAuthor"}/>
                        <br/> new Language<br/><input id={"inputLanguage"}/>
                        <br/> new Category<br/><input id={"inputCategory"}/>
                        <br/> new Price<br/><input id={"inputPrice"}/>
                        <br/> new Inventory<br/><input id={"inputInventory"}/>
                        <br/> new Summary<br/> <input id={"inputSummary"}/>
                    </form>
                    </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>this.modifyBook()}>Submit</Button>
                    <Button bsStyle={"danger"} onClick={()=>this.deleteBook()}>Delete this book</Button>
                    <Button onClick={this.closeModal}>Close</Button>
                </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

class BooklistAdmin extends Component{
    static contextTypes = {
        router: PropTypes.object
    };

    render(){
        $.ajax({ url: "admin/getBook",
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

export default BooklistAdmin;

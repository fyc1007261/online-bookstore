import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button} from 'react-bootstrap';

import '../css/list.css';
import $ from "jquery";


let data = [];

function Msg (props) {
        let style = {
            "border-radius": "0",
            "width": "25vmin",
            "border": "yellow",
            "color": "black ",
            "padding": "1vmin 0vmin",
            "align": "center",
            "display": "inline-block",
            "font-size": "3vmin",
        };
        return (
            <table>
                <th><Button style={style} onClick={props.BookClick}>Book</Button></th>
                <th><Button style={style} onClick={props.AuthorClick}>Author</Button></th>
                <th><Button style={style} onClick={props.LangClick}>Language</Button></th>
                <th><Button style={style} onClick={props.CategoryClick}>Category</Button></th>
                <th><Button style={style} onClick={props.PriceClick}>Price</Button></th>
                <th><Button style={style} onClick={props.SalesClick}>Sales</Button></th>
                <tbody>
                {props.value}
                </tbody>
            </table>
        );
}

function Selection(props){
    return(
        <select onChange={props.onChange} className={"Selector"} id={"selector"}>
            <option>Name</option>
            <option>Author</option>
            <option>Language</option>
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
        const fields = ['Name', 'Author', 'Language','Category', 'Price', 'Sales'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(data);
        let blob = new Blob([csv], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Books.csv");
    }
    render(){
    return(
        <a>
            <Button bsStyle={"info"} className={"savebut"} onClick={()=>this.saveJSON()}>Export JSON</Button>
            <Button bsStyle={"info"} className={"savebut"} onClick={()=>this.saveCSV()}>Export CSV</Button>
        </a>
    );
    }
}

class Tbl extends Component {
    constructor(props){
        super(props);
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
                <td>{temp['Name']}</td>
                <td>{temp['Author']}</td>
                <td>{temp['Language']}</td>
                <td>{temp['Category']}</td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Sales']}</td>
                <td><Button className="viewBut">
                    <Link to={
                        {
                            pathname:"/purchase",
                            state:{id:temp['ID']}
                        }
                    }>View
                    </Link></Button>
                </td>
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
        for (let i = 0; i < len; i++) {
            arr[i][index] = Number(arr[i][index]);
        }
        if (arr[0][index] > arr[len - 1][index]) {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) > (arr[j + 1][index])) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        else {
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
        for (let i = 0; i < len; i++) {
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
    Salesclick(){
        this.sort_num("Sales");
        this.Filter();
    }
    Priceclick(){
        this.sort_num("Price");
        this.Filter();
    }
    Filter(){
        let selectorFields = ['Name', 'Author', 'Language','Category'];
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
                    <td>{temp['Name']}</td>
                    <td>{temp['Author']}</td>
                    <td>{temp['Language']}</td>
                    <td>{temp['Category']}</td>
                    <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                    <td>{temp['Sales']}</td>
                    <td><Button className="viewBut">
                        <Link to={
                            {
                                pathname:"/purchase",
                                state:{id:temp['ID']}
                            }
                        }>View
                        </Link></Button>
                    </td>
                </tr>);
                this.setState({tableArray: tbls});
            }
        }
        this.render()
    }
    render() {
        return (
            <div className={"back"}>

                <Export/>
                <div className="nameFilter"><Selection onChange={()=>this.Filter()}/></div>
                <input className="inputFilter" id={"inpt"}
                        onChange={()=>this.Filter()}/>
                <Msg value={this.state.tableArray} BookClick={()=>this.Bookclick()} CategoryClick={()=>this.CategoryClick()}
                AuthorClick={()=>this.Authorclick()} LangClick={()=>this.Languageclick()}
                SalesClick={()=>this.Salesclick()} PriceClick={()=>this.Priceclick()}/>
            </div>
        );
    }
}

class Booklist extends Component{
    render(){
        $.ajax({ url: "/getBook",
            context: document.body,
            async: false,
            type: "post",
            success: function(value){
                data = $.parseJSON(value);
            }});
        return(
            <div>
                <Tbl values={data}/>
            </div>
        )
    }
}

export default Booklist;

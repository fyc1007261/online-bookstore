import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Booklist.css';
import {originalData} from '../data';


let data = originalData;

function Msg (props) {
        let style = {
            "border-radius": "2vmin",
            "width": "30vmin",
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
                <th><button style={style} onClick={props.BookClick}>Book</button></th>
                <th><button style={style} onClick={props.AuthorClick}>Author</button></th>
                <th><button style={style} onClick={props.LangClick}>Language</button></th>
                <th><button style={style} onClick={props.PriceClick}>Price</button></th>
                <th><button style={style} onClick={props.SalesClick}>Sales</button></th>
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
        const fields = ['Name', 'Author', 'Language', 'Price', 'Sales'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(data);
        let blob = new Blob([csv], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Books.csv");
    }
    render(){
    return(
        <a>
            <button className={"savebut"} onClick={()=>this.saveJSON()}>Export JSON</button>
            <button className={"savebut"} onClick={()=>this.saveCSV()}>Export CSV</button>
        </a>
    );
    }
}

class PopWindow extends Component{

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
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Sales']}</td>
                <td>
                    <Link className={"viewBut"} to={{
                        pathname:"/purchase",
                        state:{id: temp.ID}
                    }}>Purchase</Link>
                </td>
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
        let tbls = [];
        for (let i=0; i<len; i++){
            let temp = arr[i];
            tbls.push(<tr>
                <td>{temp['Name']}</td>
                <td>{temp['Author']}</td>
                <td>{temp['Language']}</td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                <td>{temp['Sales']}</td>
                <td>
                    <Link className={"viewBut"} to={{
                        pathname:"/purchase",
                        state:{id: temp.ID}
                    }}>Purchase</Link>
                </td>
            </tr>);
            this.setState({tableArray:tbls});
        }
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
        let tbls = [];
        for (let i=0; i<len; i++){
            let temp = arr[i];
            tbls.push(
                <tr>
                    <td>{temp['Name']}</td>
                    <td>{temp['Author']}</td>
                    <td>{temp['Language']}</td>
                    <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                    <td>{temp['Sales']}</td>
                    <td>
                        <Link className={"viewBut"} to={{
                            pathname:"/purchase",
                            state:{id: temp.ID}
                        }}>Purchase</Link>
                    </td>
                </tr>);
            this.setState({tableArray:tbls});
        }
        this.render();
    }
    viewBook(event){
        let related;
        for (let i=0; i<data.length; i++){
            if (data[i].ID.toString() === event.target.id.toString()){
                related = data[i];
            }
        }
        alert("图书名称："+related["Name"] + "\n作者："+ related["Author"]
            + "\n语言：" + related["Language"] + "\n售价："
            + (Number(related["Price"])/100).toFixed(2).toString()
            + "\n购买接口暂未开放");
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
    Salesclick(){
        this.sort_num("Sales");
        this.Filter();
    }
    Priceclick(){
        this.sort_num("Price");
        this.Filter();
    }
    Filter(){
        let selectorFields = ['Name', 'Author', 'Language'];
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
                    <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
                    <td>{temp['Sales']}</td>
                    <td>
                        <Link className={"viewBut"} to={{
                            pathname:"/purchase",
                            state:{id: temp.ID}
                        }}>Purchase</Link>
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
                <Msg value={this.state.tableArray} BookClick={()=>this.Bookclick()}
                AuthorClick={()=>this.Authorclick()} LangClick={()=>this.Languageclick()}
                SalesClick={()=>this.Salesclick()} PriceClick={()=>this.Priceclick()}/>
            </div>
        );
    }
}

class Booklist extends Component{
    render(){
        return(
            <div>
                <Tbl values={data}/>
            </div>
        )
    }
}

export default Booklist;

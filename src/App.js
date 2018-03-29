import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let data=[
    {'Name' : '他改变了中国', 'Author': '罗伯特·劳伦斯·库恩', 'Price' : '100.00',
        'Language': 'Traditional Chinese', 'Sales': '100000'},
    {'Name' : 'CS:APP', 'Author': 'Bryant, R.E', 'Price' : '159.95',
        'Language': 'English', 'Sales': '10000'},
    {'Name' : '蛙', 'Author': '莫言', 'Price' : '39.80',
        'Language': 'Simplified Chinese', 'Sales': '1000'},
    {'Name' : '三国演义', 'Author': '罗贯中', 'Price' : '65.00',
        'Language': 'Traditional Chinese', 'Sales': '50000'},
];


function Msg (props) {
        let style = {
            "width": "35vmin",
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
        let FileSaver = require("../node_modules/file-saver/FileSaver.min");
        let blob = new Blob([JSON.stringify(data)], { type: "text/plain; charset=utf-8" });
        FileSaver.saveAs(blob, "Books.json");
    }

    saveCSV(){
        let FileSaver = require("../node_modules/file-saver/FileSaver.min");
        const Json2csvParser = require('json2csv').Parser;
        const fields = ['Name', 'Author', 'Language', 'Price', 'Sales'];
        const json2csvParser = new Json2csvParser({ fields });
        const csv = json2csvParser.parse(data);
        console.log(csv);
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
            tbls.push(<tr><td>{temp['Name']}</td><td>{temp['Author']}</td>
                <td>{temp['Language']}</td><td>{temp['Price']}</td><td>{temp['Sales']}</td></tr>);
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
            tbls.push(<tr><td>{temp['Name']}</td><td>{temp['Author']}</td>
                <td>{temp['Language']}</td><td>{temp['Price']}</td><td>{temp['Sales']}</td></tr>);
            this.setState({tableArray:tbls});
        }
        console.log(this.state.tableArray);
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
            tbls.push(<tr><td>{temp['Name']}</td><td>{temp['Author']}</td>
                <td>{temp['Language']}</td><td>{temp['Price']}</td><td>{temp['Sales']}</td></tr>);
            this.setState({tableArray:tbls});
        }
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
                    <td>{temp['Price']}</td>
                    <td>{temp['Sales']}</td>
                </tr>);
                this.setState({tableArray: tbls});
            }
        }
        this.render()
    }
    render() {
        return (
            <div>

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

class App extends Component{
    render(){
        return(
            <div>
                <h1 align="center">Online Bookstore</h1>
                <Tbl values={data}/>
            </div>
        )
    }
}

export default App;

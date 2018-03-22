import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let data=[
    {Name : 'Book A', Author: 'Author A'},
    {Name : 'Book b', Author: 'Author b'},
    {Name : 'Book d', Author: 'Author d'}
];


function Msg (props) {
        return (
            <table>
                <tbody>
                {props.value}
                </tbody>
            </table>
        );
}

class Tbl extends Component {
    constructor(props){
        super();
        this.state = {
            a : 1,
            tableArray : []
        };
        let len = props.values.length;
        for (let i=0; i<len; i++){
            let temp = props.values[i];
            let tbls = this.state.tableArray;
            tbls.push(<tr><td>{temp.Name}</td><td>{temp.Author}</td></tr>);
            this.setState({tableArray:tbls});
            console.log(this.state.tableArray);
        }
    }
    onclick() {
        console.log(this.state.a);
        this.setState({a:this.state.a+1})
    }
    render() {
        return (
            <Msg value={this.state.tableArray}/>
        );
    }
}

class App extends Component{
    render(){
        return(
            <Tbl values={data}/>
        )
    }
}

export default App;

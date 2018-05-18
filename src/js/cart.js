import React, { Component } from 'react';
import '../css/cart.css';
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'

import $ from "jquery";



class ChangeAmount extends Component{
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props){
        super(props);
        this.state = {
            num : this.props.values['Amount']
        }
    }
    changeAmount(id){
        let obj = document.getElementById(String(this.props.values['Book_id']));
        let new_val = obj.value;
        if(String(new_val).search('.'))
            return;
        if (new_val <= 0){
            // try to delete
            let ret = window.confirm("Sure to delete this item?");
            if(!ret){
                return;
            }
        }
        if (new_val % 1===0){
            this.setState({num: new_val});
            console.log()
            // send post
            $.ajax({ url: "purchase/change_amount",
                data: {order_id: String(this.props.values["Order_id"]), new_amount: String(new_val)},
                context: document.body,
                async: true,
                type: "post",
                success: function(data){
                    if (data.toString()!=="Succeed")
                    {
                        if (data.toString()==="No enough books")
                            alert("No enough books!");
                        else
                            alert("Error changing the amount.");
                    }
                }});
            window.location.reload();

        }


    }
    render(){
        return(
            <input className="inputTag"
                   type={"Number"}
                   id={String(this.props.values['Book_id'])}
                   value={this.state.num}
                   onChange={()=>this.changeAmount(this.props.values['Book_id'])}/>
        );
    }
}



class Cart extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(){
        super();
        this.state = {
            a : 1,
            tableArray : [],
        };
        let datajson = [];
        $.ajax({ url: "purchase/fetch_cart",
            context: document.body,
            async: false,
            type: "post",
            success: function(data){
                datajson = $.parseJSON(data);
            }});

        let len = datajson.length;
        for (let i=0; i<len; i++){
            let temp = datajson[i];
            let tbls = this.state.tableArray;
            tbls.push(<tr>
                <td>{temp['Book_name']}</td>
                <td>{temp['Author']}</td>
                <td> <ChangeAmount values={temp}/>
                </td>
                <td>{(Number(temp['Price'])/100).toFixed(2)}</td>
            </tr>);
            this.setState({tableArray:tbls});
        }
    }

    submitOrder(){
        $.ajax({ url: "/purchase/create_indent",
            context: document.body,
            async: false,
            type: "post",
            success: function(data){
                alert(data);
            }});
        this.context.router.history.push('/indents');
    }

    render() {
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
            <div className={"back"}>
                <table className={"tableCart"}>
                <th><button style={style}>Book</button></th>
                <th><button style={style}>Author</button></th>
                <th><button style={style}>Amount</button></th>
                <th><button style={style}>Total Price</button></th>
                <tbody>
                {this.state.tableArray}
                </tbody>
                </table>
                <br/>
                <button className="submitOrder" onClick={()=>this.submitOrder()}>Submit Order</button>

            </div>
        );
    }
}
export default withRouter(Cart);

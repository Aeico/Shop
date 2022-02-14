import '../App.css';
import React, { Component } from "react";
import axios from 'axios';

/*Allows user to post items to database

*/
export default class ItemForm extends Component {

  state = {
    "item_id": 0,//will be set on backend
    "author_fk": this.props.user,
    "name": "The Moon",
    "description": "The nothing moon can be bought for 1000 nothings!",
    "price": 1000
  }

  nameChanged = event => {
    this.setState({
      "name": event.target.value,
    })
  };

  descChanged = event => {
    this.setState({
      "description": event.target.value,
    })
  };

  priceChanged = event => {
    this.setState({
      "price": event.target.value,
    })
  };

  handleSubmit = event => {
    event.preventDefault();

    const item = {
      "item_id": this.state.item_id,
      "author_fk": this.state.author_fk,
      "name": this.state.name,
      "description": this.state.description,
      "price": this.state.price,
    };

    axios.post("http://127.0.0.1:8000/item/", item)
      .then(res => {
        
      })

  }
  
  render() {
    return (
      <div className={this.props.formClassName}>
        <div className='h-fit w-fit absolute bg-gray-500 rounded-xl'>
          <form onSubmit={this.handleSubmit} className='p-3 '>
            <label>
              Item name:
              <input type="text" name="name" onChange={this.nameChanged} />
              Item description:
              <input type="text" name="description" onChange={this.descChanged} />
              Price:
              <input type="number" name="price" onChange={this.priceChanged} />
            </label>
            <button className='font-bold rounded-3xl bg-gray-300 pb-1 px-2 mt-2 hover:rounded-xl hover:bg-gray-100 transition-all' type="submit">Create</button>
          </form>
        </div>
      </div>
    )
  }
}
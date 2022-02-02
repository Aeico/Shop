import '../App.css';
import React, { Component } from "react";
import axios from 'axios';

/*Allows user to post items to database

*/
export default class ItemForm extends Component {

  state = {
    "item_id": 9,
    "author_fk": 1,
    "name": "The Moon",
    "description": "The nothing moon can be bought for 1000 nothings!",
    "price": 1000
  }

  testChanged = event => {
    this.setState({
    "author_fk": event.target.value,})
  };

  nameChanged = event => {
    this.setState({
    "name": event.target.value,})
  };

  descChanged = event => {
    this.setState({
    "description": event.target.value,})
  };

  priceChanged = event => {
    this.setState({
    "price": event.target.value,})
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

    axios.post("http://127.0.0.1:8000/item/",item)
      .then(res => {
        console.log(res)
        console.log(res.data)
      })

  }

  render() {
    return (
      <div className='h-fit w-48 absolute bg-gray-500'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Author id:
            <input type="number" name="author_fk" onChange={this.testChanged}/>
            Item name:
            <input type="text" name="name" onChange={this.nameChanged}/>
            Item description:
            <input type="text" name="description" onChange={this.descChanged} />
            Price:
            <input type="number" name="price" onChange={this.priceChanged} />
          </label>
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}
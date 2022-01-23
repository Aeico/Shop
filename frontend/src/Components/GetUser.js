import '../App.css';
import axios from "axios";
import React, { Component } from "react";

//http://127.0.0.1:8000/user/1
//https://joakimjlsv.pythonanywhere.com/user/1/

export function GetUser() {
    const [get, setGet] = React.useState(null);

    React.useEffect(() => {
        axios.get('https://joakimjlsv.pythonanywhere.com/user/1/')
            .then((response) => {
                setGet(response.data)
            });
    }, []);

    if (!get) return null;

    return (
        <div>
            <h1>user id: {get.user_id}</h1>
            <h1>name: {get.name}</h1>
        </div>
    )
}

export default GetUser;
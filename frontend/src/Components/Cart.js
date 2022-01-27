import '../App.css';
import axios from "axios";
import React from "react";

export function Cart({CartClass, Text}) {
    return (
      <div className={CartClass}> {Text}

      </div>
    )
  }

export default Cart
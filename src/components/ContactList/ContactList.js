import React, { Component } from "react";
import styleList from "./ContactList.module.css";

class ContactList extends Component {
  deleteContact = () => {    
    this.props.removeContact(this.props.id);
  };
  render() {
    const { name, number } = this.props;
    return (
      <li className={styleList["list_item"]}>
        <p className={styleList["list_item-name"]}>{name}: </p>
        <p className={styleList["list_item-number"]}> {number}</p>
        <button
          onClick={this.deleteContact}
          className={styleList["list_item-button"]}
        >
          &times;
        </button>
      </li>
    );
  }
}

export default ContactList;

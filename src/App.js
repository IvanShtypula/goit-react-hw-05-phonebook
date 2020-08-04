import React, { Component } from "react";
import { uuid } from "uuidv4";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactForm from "./components/ContactForm/ContactForm.js";
import Filter from "./components/Filter/Filter.js";
import ContactList from "./components/ContactList/ContactList.js";
import styleApp from "./App.module.css";
import titleStyle from "./reverseTransition.module.css";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    showTitle: false,
  };

  componentDidMount() {
    const lastContacts = localStorage.getItem("contacts");
    if (lastContacts) {
      this.setState({
        contacts: JSON.parse(lastContacts),
      });
    }
    this.setState({
      showTitle: true,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: uuid(),
      name: name,
      number: number,
    };
    this.setState((prevState) => {
      return {
        contacts: [...prevState.contacts, contact],
      };
    });
  };

  removeContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  contactsFilter = (event) => {
    const filter = event.target.value;
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { contacts, filter, showTitle } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={styleApp.container}>
        <CSSTransition classNames={titleStyle} in={showTitle} timeout={800}>
          <h1 className={styleApp.title}>Phonebook</h1>
        </CSSTransition>

        <ContactForm addContact={this.addContact} contacts={contacts} />

        {contacts.length > 1 && (
          <Filter contactsFilter={this.contactsFilter} value={filter} />
        )}
        <h2>Contacts</h2>
        <TransitionGroup component="ul" className={styleApp.contactsList}>
        {filteredContacts.length > 0 &&
          filteredContacts.map((contact) => (
            <CSSTransition key={contact.id} classNames={titleStyle} timeout={800}>
              <ContactList                
                {...contact}
                removeContact={this.removeContact}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { connect } from 'react-redux';
import { contactsOperations } from '../../redux/contacts';
import s from './App.module.css';
import { CSSTransition } from 'react-transition-group';
import '../../css/animation.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchContacts();
  }
  render() {
    return (
      <>
        <div className={s.container}>
          <CSSTransition
            in={true}
            appear={true}
            classNames="fade"
            timeout={500}
          >
            <h1 className={s.title}>Phonebook</h1>
          </CSSTransition>
          <ContactForm />

          <CSSTransition
            in={true}
            classNames="fade"
            timeout={500}
            unmountOnExit
          >
            <Filter />
          </CSSTransition>

          <CSSTransition
            in={true}
            classNames="fade"
            timeout={250}
            unmountOnExit
          >
            <ContactList />
          </CSSTransition>
        </div>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactsOperations.fetchContact()),
});

export default connect(null, mapDispatchToProps)(App);

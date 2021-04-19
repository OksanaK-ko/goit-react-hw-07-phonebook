import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {contactsOperations, contactsSelectors} from '../../redux/contacts';
import s from './ContactList.module.css'
import { CSSTransition, TransitionGroup } from "react-transition-group";

const ContactList = ({ contacts, onDeleteContact }) => (
    <TransitionGroup component='ul' className={s.ContactList}>
    {contacts.map(({ id, name, number }) =>
      <CSSTransition key={id} timeout={250}
      classNames={s}>
                <li className={s.ContactList_item} >
                {name}: {number}
                <button className={s.button} onClick={() => onDeleteContact(id)}>Delete</button>
        </li>
             </CSSTransition>)}
            </TransitionGroup>
    
        )

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ),
  onDeleteContact: PropTypes.func,
};


const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getVisibleContacts(state)  
})


const mapDispatchToProps = dispatch => ({
  onDeleteContact: (id) => dispatch(contactsOperations.deleteContact(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);


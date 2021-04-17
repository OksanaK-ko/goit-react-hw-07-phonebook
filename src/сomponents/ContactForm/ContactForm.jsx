import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shortid from 'shortid'
import contactsActions from '../../redux/contacts/contacts-actions';
import { CSSTransition } from 'react-transition-group';
import Alert from '../Alert/Alert';
import '../../css/animation.css';
import s from './ContactForm.module.css'

class ContactForm extends Component {
    state = {
    name: "",
    number: "",
    error: false
    }

    nameInputId = shortid.generate();
    numberInputId = shortid.generate();

    handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        const { contacts } = this.props;
        if (contacts.find(item => item.name.toLowerCase() === e.currentTarget.elements[0].value.toLowerCase() )) {
            this.setState(() => {
                return {
                    error: true,
                };
            });

            setTimeout(() => {
                this.setState(() => {
                    return {
                        error: false,
                    };
                });
            }, 2500);
            return;
        }
        this.props.onSubmit(this.state);
        this.reset();
    }
    reset = () => {
        this.setState({ name: "", number: "" })
    }
      render() {
          return (
              <div>
        <CSSTransition
                    in={this.state.error}
                    appear={true}
                    classNames="error"
                    timeout={250}
                    unmountOnExit
                    >
          <Alert />
        </CSSTransition> 
                      < form onSubmit={this.handleSubmit} >
                         <div className={s.form}>
                              <label className={s.label} htmlFor={this.nameInputId}>
                                  Name
              <input className={s.input}
                                      type="text"
                                      name="name"
                                      value={this.state.name}
                                      onChange={this.handleChange}
                                      id={this.nameInputId}
                                  />
                              </label>
                              <label className={s.label} htmlFor={this.numberInputId}>
                                  Number
              <input className={s.input}
                                      type="text"
                                      name="number"
                                      value={this.state.number}
                                      onChange={this.handleChange}
                                      id={this.numberInputId}
                                  />
                              </label>
                              <button className={s.button} type="submit">Add contact</button>
                          </div>
                      </form >
                  </div>
                
        );
    }
}

ContactForm.defaultProps = {
    type: 'text',
    name: null,
};

ContactForm.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
};

const mapStateToProps = (state) => ({
    contacts: state.contacts.items,
})

const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch(contactsActions.addContact(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);



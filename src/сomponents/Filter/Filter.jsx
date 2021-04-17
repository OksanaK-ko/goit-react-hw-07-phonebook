import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as contactsActions from '../../redux/contacts/contacts-actions';
import s from './Filter.module.css';

const Filter = ({ value, onChangeFilter}) => {
  return (
    <div className={s.form}>
          <label className={s.label} >
            Find contacts by name
            <input className={s.input}
              type="text"
              value={value}
              onChange={onChangeFilter}
            ></input>
      </label>
      </div>
     )
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

const mapStateToPtops = (state) => ({
  value: state.contacts.filter,

})

const mapDispatchToProps = dispatch => ({
  onChangeFilter: (e) => dispatch(contactsActions.changeFilter(e.target.value))
})


export default connect(mapStateToPtops,mapDispatchToProps)(Filter);
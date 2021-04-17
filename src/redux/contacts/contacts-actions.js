import shortid from 'shortid';
import { createAction } from '@reduxjs/toolkit';

const addContact = createAction('contacts/Add', data => {
  return {
    payload: {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    },
  };
});

const deleteContact = createAction('contacts/Delete');

const changeFilter = createAction('contacts/changeFilter');

export default { addContact, deleteContact, changeFilter };

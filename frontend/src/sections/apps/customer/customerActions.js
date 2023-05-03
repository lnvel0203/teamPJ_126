// src/actions/customerActions.js

import axios from 'axios';

export const createCustomer = (member) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:8081/members/member', member);

    dispatch({
      type: 'CREATE_CUSTOMER',
      payload: response.data
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

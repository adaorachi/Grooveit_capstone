import { fetchAssoc } from '../actions/index';

const assocReducer = (state = [], action) => {
  switch (action.type) {
    case fetchAssoc:
      return [...state, action.assoc];
    default:
      return state;
  }
};

export default assocReducer;

import { fetchFeatured } from '../actions/index';

const featuredReducer = (state = [], action) => {
  switch (action.type) {
    case fetchFeatured:
      return [...state, action.list];
    default:
      return state;
  }
};

export default featuredReducer;

const updateMusicReducer = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_MUSIC':
      return [...state, action.music];
    default:
      return state;
  }
};

export default updateMusicReducer;

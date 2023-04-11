const initialState = {
  language: null,
  year: null,
  count: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return {
        ...state,
        language: action.payload ?? null
      };
    case 'SET_YEAR':
      return {
        ...state,
        year: action.payload ?? null
      };
    case 'SET_COUNT':
      return {
        ...state,
        count: action.payload ?? null
      };
    default:
      return state;
  }
};

export default reducer;

import { DATE_READ } from "../actions/date";

const initialState = {
  dates: [],
};

const reducer = (state = initialState, action) => {

  let dates = state.dates;

  switch (action.type) {
    case DATE_READ: {
      const { payload } = action
      return {...state, dates : payload};
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
import { BOARD_READ } from "../actions/board";

const initialState = {
  boards: [],
};

export const BOARD_CREATE = "BOARD_CREATE";
export const BOARD_DELETE = "BOARD_DELETE";

export const board_create = (data) => {
  return {
    type: BOARD_CREATE,
    data: data,
  };
};

export const board_delete = (id) => ({
  type: BOARD_DELETE,
  // data: data,
});
const reducer = (state = initialState, action) => {

  let boards = state.boards;

  switch (action.type) {
    case BOARD_CREATE: {
      return {
        ...state,
      };
    }
    case BOARD_READ: {
      const { payload } = action
      return {...state, boards : payload};
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducer;
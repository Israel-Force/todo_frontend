const todoReducer = (state, action) => {
  switch (action.type) {
    case "DELETE":
      return {
        ...state,
        data: action.payload,
        user_id: action.payload[0].user_id,
      };
    case "UPDATE":
      return { ...state, data: action.payload };
    case "LOAD":
      return { ...state, data: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        data: action.payload,
        user_id: action.payload.length ? action.payload[0].user_id : [],
      };
    case "UPDATE_REG":
      return {
        ...state,
        data: action.payload,
        user_id: action.payload.length ? action.payload[0].user_id : [],
      };
    case "UPDATE_ITEM":
      return { ...state, data: action.payload };
    case "RELOAD":
      return {
        ...state,
        data: action.payload,
        user_id: action.payload.length ? action.payload[0].user_id : [],
      };
    case "LOADING":
      return { ...state, loading: action.payload };
    case "DONE_LOADING":
      return { ...state, loading: action.payload };
    case "ITEM":
      return { ...state, todo_id: action.payload };
    default:
      return state;
  }
};

export default todoReducer;

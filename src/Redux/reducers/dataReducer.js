import { LOADING_DATA, SET_DATA, SET_INDEX, SET_INDICES } from "../types";

const initialState = {
  facts: [],
  loading: false,
  index: 0,
  indices: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_DATA:
      return {
        ...state,
        facts: action.payload,
        loading: false,
      };
    case SET_INDEX:
      return {
        ...state,
        index: action.payload,
      };
    case SET_INDICES:
      return {
        ...state,
        indices: action.payload,
      };
    default:
      return state;
  }
}

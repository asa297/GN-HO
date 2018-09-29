import { FETCH_ITEM, FIND_ITEM } from "../actions/type";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_ITEM:
      return action.payload;
    case FIND_ITEM:
      return action.payload;

    default:
      return state;
  }
}

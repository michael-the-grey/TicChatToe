import { FOUND_MATCH } from '../constants/ActionTypes.js';
import { Socket } from '../phoenix';

const initalState = [{
  socket: new Socket('/socket')
}];

export default function ticChat(state = initalState, action ) {
  switch(action.type) {
    default:
      return state;
  }
}

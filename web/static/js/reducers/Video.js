import { GOT_DESC, ADD_SDP, ADD_CANDIDATE, ADD_PEER, ADD_STREAM, LOCAL_VIDEO, STRANGER_VIDEO, START_CALL } from '../constants/ActionTypes.js';
import { RTCPeerConnection } from 'webrtc-adapter';
let config = require('../IceServer.js');
let _ = require('lodash')

const initalState = {
  startCall: false,
  peerConn: new RTCPeerConnection(config),
  you: {
    stream: undefined,
    videoSrc: undefined
  },
  stranger: {
    stream: undefined,
    videoSrc: undefined
  }
};

let peer

export default function Video(state = initalState, action ) {
  switch(action.type) {
    case ADD_STREAM:
      return _.assign(state,
          { you:
            {
              stream: action.stream,
              videoSrc: window.URL.createObjectURL(action.stream)
            }
          })
    case STRANGER_VIDEO:
      return _.assign(state,
          { stranger:
            {
              stream: action.stream,
              videoSrc: window.URL.createObjectURL(action.stream)
            }
          })
    //case START_CALL:
    //  let next_state = { ...state, startCall: action.value }
    //  console.log('Setting startCall value to ', next_state);
    //  return next_state
    case ADD_CANDIDATE:
      let candidate = new RTCIceCandidate(msg.candidate)
      peer = state.peerConn
      peer.addIceCandidate(candidate)
      return {...state, peerConn: peer }
    case ADD_SDP:
      let desc = new RTCSessionDescription(action.sdp)
      peer = state.peerConn
      peer.setRemoteDescription(desc)
      return {...state, peerConn: peer }
    case GOT_DESC:
      peer = state.peerConn
      peer.setLocalDescription(action.desc);
      return {...state, peerConn: peer, startCall: true }
    default:
      return state;
  }
}

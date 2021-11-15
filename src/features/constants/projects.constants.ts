/*
 * Projects Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 */

import { generateActionTypes } from '../../utils/generic-saga'

const root = 'app/Projects/'

const CREATE_PROJECT = generateActionTypes(root, 'CREATE_PROJECT')
const GET_PROJECTS = generateActionTypes(root, 'GET_PROJECTS')
const GENERATE_UPLOAD_TOKEN = generateActionTypes(root, 'GENERATE_UPLOAD_TOKEN')
const GET_UPLOAD_TOKENS_LIST = generateActionTypes(root, 'GET_UPLOAD_TOKENS_LIST!')
const CHANGE_STEP = 'CHANGE_STEP'
const TOGGLE_MODAL = 'TOGGLE_MODAL'
const ADD_VIDEO_TO_PROJECT = 'ADD_VIDEO_TO_PROJECT'

export const STEPPER_STATE = {
  metaData: 0,
  upload: 1,
}
const constants = {
  CREATE_PROJECT,
  GET_PROJECTS,
  TOGGLE_MODAL,
  CHANGE_STEP,
  GENERATE_UPLOAD_TOKEN,
  GET_UPLOAD_TOKENS_LIST,
  ADD_VIDEO_TO_PROJECT
}
export default constants

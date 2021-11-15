/*
 * Auth Constants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 */
import { generateActionTypes } from '../../utils/generic-saga'

const root = 'app/Auth/'

const AUTHENTICATE = generateActionTypes(root, 'AUTHENTICATE')
const REFRESH_TOKEN = generateActionTypes(root, 'REFRESH_TOKEN')

const constants = {
  AUTHENTICATE,
  REFRESH_TOKEN,
}
export default constants

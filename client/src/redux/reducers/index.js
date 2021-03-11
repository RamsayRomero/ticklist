import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import ascents from './ascents';

export default combineReducers({ auth, users, ascents });

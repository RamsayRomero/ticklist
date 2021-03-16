import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import ascents from './ascents';
import areas from './areas';

export default combineReducers({ auth, users, ascents, areas });

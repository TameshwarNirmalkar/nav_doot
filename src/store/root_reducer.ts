import agents from '@redux-store/agents';
import branch_type from '@redux-store/branch_type';
import branches from '@redux-store/branches';
import country_cities from '@redux-store/country_cities';
import customers from '@redux-store/customers';
import drawer from '@redux-store/drawer';
import location from '@redux-store/location';
import main_menu from '@redux-store/main_menu';
import pin_code from '@redux-store/pin_code';
import team from '@redux-store/team';
import users from '@redux-store/users';
import vendors from '@redux-store/vendors';
import zone from '@redux-store/zone';
import { combineReducers } from 'redux';

export default combineReducers({
  users,
  country_cities,
  location,
  drawer,
  branches,
  customers,
  vendors,
  agents,
  zone,
  main_menu,
  branch_type,
  pin_code,
  team,
});

import { combineReducers } from "redux";
import users from "@redux-store/users";
import country_cities from "@redux-store/country_cities";
import location from "@redux-store/location";
import drawer from "@redux-store/drawer";
import branches from "@redux-store/branches";
import customers from "@redux-store/customers";
import vendors from "@redux-store/vendors";
import agents from "@redux-store/agents";
import zone from "@redux-store/zone";
import main_menu from "@redux-store/main_menu";
import branch_type from "@redux-store/branch_type";

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
});

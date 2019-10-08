import { exceptionRes } from './message'
async function validatePermission(req, res, permissionName) {
  if (req["permissions"].indexOf(permissionName) !== -1) {
    res.status(200).send(exceptionRes(403, "Permission Denied", "You don't have a permission"));
    return false;
  }
  return true;

}
export const PERMISSON_NAME = {
  MANAGE_USER: 'MANAGE_USER',
  VIEW_USER: 'VIEW_USER',
  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',


  MANAGE_ROLE: 'MANAGE_ROLE',
  ADD_ROLE: 'ADD_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',

  MANAGE_STORE: 'MANAGE_STORE',
  ADD_STORE: 'ADD_STORE',
  UPDATE_STORE: 'UPDATE_STORE',
  DELETE_STORE: 'DELETE_STORE',

  MANAGE_COUNTER: 'MANAGE_COUNTER',
  GET_ALL_COUNTER: 'GET_ALL_COUNTER',
  CREATE_COUNTER: 'CREATE_COUNTER' ,

  MANAGE_COUNTER_TIME: "MANAGE_COUNTER_TIME",
  GET_ALL_COUNTER_TIME: "GET_ALL_COUNTER_TIME",

  MANAGE_COUNTER_TYPE: "MANAGE_COUNTER_TYPE",
  GET_ALL_COUNTER_TYPE: "GET_ALL_COUNTER_TYPE",


}


export const PERMISSION = [{
  name: PERMISSON_NAME.MANAGE_USER,
  displayName: 'Manage User',
  child: [
    {
      name: PERMISSON_NAME.VIEW_USER,
      displayName: 'View User',
      child: [],
    },
    {
      name: PERMISSON_NAME.ADD_USER,
      displayName: 'Add User',
      child: [],
    },
    {
      name: PERMISSON_NAME.DELETE_USER,
      displayName: 'Delete User',
      child: [],
    },
  ],
},
{
  name: PERMISSON_NAME.MANAGE_ROLE,
  displayName: 'Manage User',
  child: [
    {
      name: PERMISSON_NAME.ADD_ROLE,
      displayName: 'Add Role',
      child: [],
    },
    {
      name: PERMISSON_NAME.UPDATE_ROLE,
      displayName: 'Update Role',
      child: [],
    },
    {
      name: PERMISSON_NAME.DELETE_ROLE,
      displayName: 'Delete Role',
      child: [],
    },
  ],
},
{
  name: PERMISSON_NAME.MANAGE_STORE,
  displayName: 'Manage Store',
  child: [
    {
      name: PERMISSON_NAME.ADD_STORE,
      displayName: 'Add Store',
      child: [],
    },
    {
      name: PERMISSON_NAME.UPDATE_STORE,
      displayName: 'Update Store',
      child: [],
    },
    {
      name: PERMISSON_NAME.DELETE_STORE,
      displayName: 'Delete Store',
      child: [],
    },
  ],
},
{
  name: PERMISSON_NAME.MANAGE_COUNTER,
  displayName: 'Manage Counter',
  child: [
    {
      name: PERMISSON_NAME.GET_ALL_COUNTER,
      displayName: 'Get All Counter',
      child: [],
    },
    {
      name: PERMISSON_NAME.CREATE_COUNTER,
      displayName: 'Create Counter',
      child: [],
    },
    
  ],
},
{
  name: PERMISSON_NAME.MANAGE_COUNTER_TIME,
  displayName: 'Manage Counter Time',
  child: [
    {
      name: PERMISSON_NAME.GET_ALL_COUNTER_TIME,
      displayName: 'Get All Counter Time',
      child: [],
    },
    
  ],
},
{
  name: PERMISSON_NAME.MANAGE_COUNTER_TYPE,
  displayName: 'Manage Counter Type',
  child: [
    {
      name: PERMISSON_NAME.GET_ALL_COUNTER_TYPE,
      displayName: 'Get All Counter Type',
      child: [],
    },
    
  ],
},
]

export { validatePermission } 

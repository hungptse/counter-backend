import { exceptionRes } from "./message";
async function validatePermission(req, res, permissionName) {
  if (req["permissions"].indexOf(permissionName) !== -1) {
    res.status(200).send(exceptionRes(403, "Permission Denied", "You don't have a permission"));
    return false;
  }
  return true;

}
export const PERMISSON_NAME = {
   MANAGE_USER: "MANAGE_USER",
   VIEW_USER: "VIEW_USER",
   ADD_USER: "ADD_USER",
   DELETE_USER: "DELETE_USER",

   MANAGE_ROLE: "MANAGE_ROLE",
   ADD_ROLE: "ADD_ROLE",
   UPDATE_ROLE: "UPDATE_ROLE",
   DELETE_ROLE: "DELETE_ROLE",

   MANAGE_STORE: "MANAGE_STORE",
   ADD_STORE: "ADD_STORE",
   UPDATE_STORE: "UPDATE_STORE",
   DELETE_STORE: "DELETE_STORE",

   MANAGE_PRICE_DETAIL: "MANAGE_PRICE_DETAIL",
   GET_ALL_PRICE_DETAIL: "GET_ALL_PRICE_DETAIL",
   CREATE_PRICE_DETAIL: "CREATE_PRICE_DETAIL",

   MANAGE_PRICE_LIST: "MANAGE_PRICE_LIST",
   GET_ALL_PRICE_LIST: "GET_ALL_PRICE_LIST",
   CREATE_PRICE_LIST: "CREATE_PRICE_LIST",
   GET_A_PRICE_LIST: "GET_A_PRICE_LIST",

   MANAGE_INVOICE: "MANAGE_INVOICE",
   GET_ALL_INVOICE: "GET_ALL_INVOICE",
   CREATE_INVOICE: "CREATE_INVOICE",
   GET_AN_INVOICE: "GET_AN_INVOICE",

   MANAGE_USER_STORE: "MANAGE_USER_STORE",
   GET_ALL_USER_STORE: "GET_ALL_USER_STORE",
   CREATE_USER_STORE: "CREATE_USER_STORE",

   MANAGE_ACTIVE_PRICE_LIST: "MANAGE_ACTIVE_PRICE_LIST",
   GET_ACTIVE_PRICE_LIST_FOR_STORE: "GET_ACTIVE_PRICE_LIST_FOR_STORE",
   CREATE_ACTIVE_PRICE_LIST: "CREATE_ACTIVE_PRICE_LIST",

   MANAGE_COUNTER: "MANAGE_COUNTER",
   GET_ALL_COUNTER: "GET_ALL_COUNTER",
   CREATE_COUNTER: "CREATE_COUNTER",

   MANAGE_COUNTER_TIME: "MANAGE_COUNTER_TIME",
   GET_ALL_COUNTER_TIME: "GET_ALL_COUNTER_TIME",

   MANAGE_COUNTER_TYPE: "MANAGE_COUNTER_TYPE",
   GET_ALL_COUNTER_TYPE: "GET_ALL_COUNTER_TYPE"
};

export const PERMISSION = [
   {
      name: PERMISSON_NAME.MANAGE_USER,
      displayName: "Manage User",
      child: [
         {
            name: PERMISSON_NAME.VIEW_USER,
            displayName: "View User",
            child: []
         },
         {
            name: PERMISSON_NAME.ADD_USER,
            displayName: "Add User",
            child: []
         },
         {
            name: PERMISSON_NAME.DELETE_USER,
            displayName: "Delete User",
            child: []
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_ROLE,
      displayName: "Manage User",
      child: [
         {
            name: PERMISSON_NAME.ADD_ROLE,
            displayName: "Add Role",
            child: []
         },
         {
            name: PERMISSON_NAME.UPDATE_ROLE,
            displayName: "Update Role",
            child: []
         },
         {
            name: PERMISSON_NAME.DELETE_ROLE,
            displayName: "Delete Role",
            child: []
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_STORE,
      displayName: "Manage Store",
      child: [
         {
            name: PERMISSON_NAME.ADD_STORE,
            displayName: "Add Store",
            child: []
         },
         {
            name: PERMISSON_NAME.UPDATE_STORE,
            displayName: "Update Store",
            child: []
         },
         {
            name: PERMISSON_NAME.DELETE_STORE,
            displayName: "Delete Store",
            child: []
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_PRICE_DETAIL,
      displayName: "Manage Price Detail",
      child: [
         {
            name: PERMISSON_NAME.GET_ALL_PRICE_DETAIL,
            displayName: "View Price Detail",
            child: []
         },
         {
            name: PERMISSON_NAME.CREATE_PRICE_DETAIL,
            displayName: "Add Price Detail",
            child: []
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_PRICE_LIST,
      displayName: "Manage Price List",
      child: [
         {
            name: PERMISSON_NAME.GET_ALL_PRICE_LIST,
            displayName: "View all Price Lists",
            child: []
         },
         {
            name: PERMISSON_NAME.GET_A_PRICE_LIST,
            displayName: "View one Price List",
            child: []
         },
         {
            name: PERMISSON_NAME.CREATE_PRICE_LIST,
            displayName: "Add Price List"
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_INVOICE,
      displayName: "Manage Invoice",
      child: [
         {
            name: PERMISSON_NAME.GET_ALL_INVOICE,
            displayName: "View all Invoices",
            child: []
         },
         {
            name: PERMISSON_NAME.GET_AN_INVOICE,
            displayName: "View one Invoice",
            child: []
         },
         {
            name: PERMISSON_NAME.CREATE_INVOICE,
            displayName: "Add Invoice"
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_USER_STORE,
      displayName: "Manage User Store",
      child: [
         {
            name: PERMISSON_NAME.GET_ALL_USER_STORE,
            displayName: "View all User Store",
            child: []
         },
         {
            name: PERMISSON_NAME.CREATE_USER_STORE,
            displayName: "Add User Store"
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_PRICE_LIST,
      displayName: "Manage Active Price List",
      child: [
         {
            name: PERMISSON_NAME.GET_ACTIVE_PRICE_LIST_FOR_STORE,
            displayName: "View Store's Active Price List",
            child: []
         },
         {
            name: PERMISSON_NAME.CREATE_ACTIVE_PRICE_LIST,
            displayName: "Add Active Price List",
            child: []
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_COUNTER,
      displayName: "Manage Counter",
      child: [
         {
            name: PERMISSON_NAME.GET_ALL_COUNTER,
            displayName: "Get All Counter",
            child: []
         },
         {
            name: PERMISSON_NAME.CREATE_COUNTER,
            displayName: "Create Counter",
            child: []
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_COUNTER_TIME,
      displayName: "Manage Counter Time",
      child: [
         {
            name: PERMISSON_NAME.GET_ALL_COUNTER_TIME,
            displayName: "Get All Counter Time",
            child: []
         }
      ]
   },
   {
      name: PERMISSON_NAME.MANAGE_COUNTER_TYPE,
      displayName: "Manage Counter Type",
      child: [
         {
            name: PERMISSON_NAME.GET_ALL_COUNTER_TYPE,
            displayName: "Get All Counter Type",
            child: []
         }
      ]
   }
];

export { validatePermission };

import express from "express";
import store from "@controllers/store.controller";

const router = express.Router();

/**
* @swagger
* /loginUser:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Logs in a user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/User'
*           type: object
*           properties:
*             username:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Bad username, not found in db
*       403:
*         description: Username and password don't match
*/
router.route("/").get(store.getAllStore).post(store.createStore);
router.route("/:id").get(store.getStoreByID).delete(store.deleteStore).put(store.updateStore);
// router.route("/").post(store.createStore);



export default router;
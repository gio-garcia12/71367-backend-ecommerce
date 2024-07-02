const express = require ('express')
const router = express.Router()
const userController = require("../controllers/user.controller")
const auth = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAsdmin')

//Get users
router.get ("/users", userController.getUsers)

router.post("/users", userController.postUser)

router.delete("/users/:id",[auth,isAdmin], userController.deleteUser)

router.put("/users/:id", auth, userController.updateUser)

router.get("/users/:id", userController.getUserById)

router.post("/login",userController.login)

module.exports = router
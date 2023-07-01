const router = require('express').Router();

const {
    getAllUsers,  
    getUserById, 
    createNewUser,
    updateUser, 
    deleteUser, 
    removeFriend,
    addFriend
} = require('../../controllers/usersController');

router.route("/").get(getAllUsers).post(createNewUser);

router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)
;

router.route("/:userId/friends/:friendId").delete(removeFriend);
router.route("/:userId/friends").post(addFriend);

module.exports = router;

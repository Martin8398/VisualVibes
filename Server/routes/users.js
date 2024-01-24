import express from "express";
import { getUser, getUserFriends, addRemoveFriends} from  "../controllers/users.js";
import { verifiedToken, VerifyToken } from "../middleware/auth.js";

const router = express.Router();

// Read

router.get("/:id", VerifyToken, getUser);
router.get("/:id/friends", verifiedToken, getUserFriends);

// Update

router.patch("/:id/:friendId", verifiedToken, addRemoveFriends);

export default router;
import { read } from "fs";
import Jwt from "jsonwebtoken";

export const verifiedToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization")

        if (!token) {
            return res.status(403).semd("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, tokens.length).trimLeft();
        }

        const verified = jwt.verify(token, procces.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
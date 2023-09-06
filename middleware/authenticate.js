import { decodeToken } from "../utils/tokens.js"

function authenticate(req, res, next) {
    try {
        let tokenHeader = req.headers.authorization;

        // check token integrity
        if (!tokenHeader || !tokenHeader.startsWith("Bearer")) {
            return res.status(401).json({ message: "You're not authorized to do this action!" });
        }

        tokenHeader = tokenHeader.split(' ')[1];
        // console.log(tokenHeader);

        // verify token & store user_id in request to use it in the next controller
        const { user_id } = decodeToken(tokenHeader);
        req.user = { user_id };

        next();
    } catch (error) {
        return res.status(401).json({ message: "You're not authorized to do this action!" });
    }
}

export default authenticate;
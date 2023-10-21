"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymousStrategy = exports.jwtStrategy = void 0;
const user_model_1 = require("../models/user.model");
const passport_jwt_1 = require("passport-jwt");
const passport_anonymous_1 = require("passport-anonymous");
const JWT_SECRET = process.env.JWT_SECRET;
exports.jwtStrategy = new passport_jwt_1.Strategy({
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
}, async (payload, done) => {
    try {
        const user = await user_model_1.User.findById(payload.id);
        if (!user)
            return done(null, false);
        done(null, user.toJSON());
    }
    catch (e) {
        return done(e);
    }
});
exports.anonymousStrategy = new passport_anonymous_1.Strategy();
//# sourceMappingURL=passport.js.map
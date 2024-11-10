import { TUser, User } from "../models/User";

export class UserService {
    // use login
    static async login(user: TUser) {
        // check already registered
        const exists = await User.findOne({ email: user.email });
        if (exists) {
            return exists;
        }
        return await new User(user).save();
    }
}
import User from '../models/User';

class UserController {
    async read(req, res) {
        const user = await User.findOne({ where: { email: req.body.email } });

        return res.json(user);
    }
}

export default new UserController();

import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                },
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.password_hash);
    }
}

export default User;

import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import DeliveryMan from '../app/models/DeliveryMan';
import Delivery from '../app/models/Delivery';

const models = [User, Recipient, DeliveryMan, Delivery];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models.forEach((model) => model.init(this.connection));

        models.forEach((model) => {
            return model.associate && model.associate(this.connection.models);
        });
    }
}

export default new Database();

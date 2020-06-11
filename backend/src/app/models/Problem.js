import Sequelize, { Model } from 'sequelize';

class Problem extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.VIRTUAL,
                    primaryKey: true,
                },
                delivery_id: {
                    type: Sequelize.INTEGER,
                },
                description: Sequelize.STRING,
            },
            {
                sequelize,
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Delivery, {
            foreignKey: 'delivery_id',
        });
    }
}

export default Problem;

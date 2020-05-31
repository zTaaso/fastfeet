import Sequelize, { Model } from 'sequelize';

class DeliveryMan extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
            },
            {
                sequelize,
                freezeTableName: true,
                tableName: 'delivery_men',
            }
        );
    }

    // static associate(models) {
    //     console.log(models);
    //     this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    // }
}

export default DeliveryMan;

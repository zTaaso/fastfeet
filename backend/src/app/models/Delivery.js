import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
    static init(sequelize) {
        super.init(
            {
                recipient_id: Sequelize.INTEGER,
                deliveryman_id: Sequelize.INTEGER,
                signature_id: Sequelize.INTEGER,
                product: Sequelize.STRING,
                canceled_at: Sequelize.DATE,
                start_date: Sequelize.DATE,
                end_date: Sequelize.DATE,
                status: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        if (!this.canceled_at) {
                            if (!this.start_date && !this.end_date)
                                return 'pending';

                            if (this.start_date && !this.end_date)
                                return 'retired';

                            if (this.start_date && this.end_date)
                                return 'delivered';
                        }

                        return 'canceled';
                    },
                },
            },
            {
                sequelize,
                tableName: 'delivery',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Recipient, {
            foreignKey: 'recipient_id',
            as: 'recipient',
        });
        this.belongsTo(models.DeliveryMan, {
            foreignKey: 'deliveryman_id',
            as: 'deliveryman',
        });
        this.belongsTo(models.File, {
            foreignKey: 'signature_id',
            as: 'signature',
        });
        this.hasOne(models.Problem, {
            foreignKey: 'delivery_id',
            as: 'problem',
        });
    }
}

export default Delivery;

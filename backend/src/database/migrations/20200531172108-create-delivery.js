module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('delivery', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            recipient_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'recipients', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            deliveryman_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'delivery_men', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            signature_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: { model: 'files', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            product: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            canceled_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            start_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('delivery');
    },
};

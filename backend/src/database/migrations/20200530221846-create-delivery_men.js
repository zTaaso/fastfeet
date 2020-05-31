module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable(
            'delivery_men',
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                avatar_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: { model: 'files', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'SET NULL',
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
            },
            {
                freezeTableName: true,
                tableName: 'delivery_men',
            }
        );
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('delivery_men');
    },
};

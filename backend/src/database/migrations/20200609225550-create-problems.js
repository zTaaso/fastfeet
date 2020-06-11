module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('problems', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                unique: true,
                autoIncrement: true,
            },
            delivery_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                unique: false,
                references: { model: 'delivery', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
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

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('problems');
    },
};

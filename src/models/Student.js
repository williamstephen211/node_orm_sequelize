import Sequelize from 'sequelize'


export default class Student extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				isDeleted: {
					type: Sequelize.BOOLEAN,
					defaultValue: false,
				},
				createdAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
				updatedAt: {
					type: Sequelize.DATE,
					allowNull: false,
					defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
					onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
				},
			},
			{
				sequelize,
			},
		)
	}

	static associate(models) {
		
		
		// this.hasMany(models.Books, {
		// 	foreignKey: 'bId',
		// 	as: 'books',
		// })
	}

	
	toJSON() {
		const object = Object.assign({}, this.dataValues)

		
		// delete object.createdAt
		delete object.updatedAt
		delete object.isDeleted
		return object
	}
}
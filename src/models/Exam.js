import Sequelize from 'sequelize'


export default class Exam extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				
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
		
		this.belongsTo(models.Student, {
			foreignKey: 'sId',
			as: 'student',
		})
		this.belongsTo(models.Books, {
			foreignKey: 'bId',
			as: 'books',
		})
		// this.hasMany(models.SocialChannel, {
		// 	foreignKey: 'userId',
		// 	as: 'socialChannels',
		// })
		
		
	}

	
	toJSON() {
		const object = Object.assign({}, this.dataValues)

		
		// delete object.createdAt
		delete object.updatedAt
		return object
	}
}
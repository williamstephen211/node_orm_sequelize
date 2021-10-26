import Sequelize from 'sequelize'

// import Student from './Student'

export default class Books extends Sequelize.Model {
	static init(sequelize) {
		return super.init(
			{
				title:{
                    type: Sequelize.STRING,
                    allowNull: false
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
		
        
		this.belongsTo(models.Student,{
			foreignKey:"sId",
			as: "student"
		})
		
        
	}

	
	toJSON() {
		const object = Object.assign({}, this.dataValues)

		
		// delete object.createdAt
		delete object.updatedAt
		return object
	}
}
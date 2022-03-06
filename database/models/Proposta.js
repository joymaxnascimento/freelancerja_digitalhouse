module.exports = (sequelize, DataType) => {
  const Proposta = sequelize.define('Proposta', {
    idproposta: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor_proposto_freelancer: {
      type: DataType.FLOAT(10, 2),
      allowNull: false
    },
    aceite_cliente: {
      type: DataType.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'proposta',
    timestamps: false,
    indexes: [
      {
        name: 'unique_idservico_idusuariofreelancer',
        unique: true,
        fields: ['idservico', 'idusuario_freelancer']
      }
    ]
  })

  Proposta.associate = (model) => {
    Proposta.belongsTo(model.Servico, {
      foreignKey: 'idservico'
    })

    Proposta.belongsTo(model.Usuario, {
      foreignKey: 'idusuario_freelancer'
    })
  }

  return Proposta
}
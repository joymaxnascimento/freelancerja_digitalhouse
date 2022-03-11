module.exports = (sequelize, DataType) => {
  const Servico = sequelize.define('Servico', {
    idservico: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descricao: {
      type: DataType.TEXT('long'),
      allowNull: false
    },
    valor_a_pagar: {
      type: DataType.FLOAT(10, 2),
      allowNull: false
    },
    data_entrega: {
      type: DataType.DATE,
      allowNull: false
    }
  }, {
    tableName: 'servico',
    timestamps: false
  })

  Servico.associate = (model) => {
    Servico.belongsTo(model.TipoServico, {
      foreignKey: {
        name: 'idtipo_servico',
        allowNull: false
      }
    })

    Servico.belongsTo(model.Usuario, {
      foreignKey: {
        name: 'idusuario_cliente',
        allowNull: false
      }
    })

    Servico.hasMany(model.Proposta, {
      foreignKey: {
        name: 'idservico',
        allowNull: false
      }
    })
  }

  return Servico
}
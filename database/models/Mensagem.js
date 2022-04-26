module.exports = (sequelize, DataType) => {
    const Mensagem = sequelize.define('Mensagem', {
      idmensagem: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      mensagem: {
        type: DataType.TEXT('long'),
        allowNull: false
      }
    }, {
      tableName: 'mensagem',
      timestamps: false
    })
  
    Mensagem.associate = (model) => {
        Mensagem.belongsTo(model.Proposta, {
        foreignKey: {
          name: 'idproposta',
          allowNull: false
        }
      })
  
      Mensagem.belongsTo(model.Usuario, {
        foreignKey: {
          name: 'idusuario',
          allowNull: false
        }
      })

      Mensagem.hasOne(model.Mensagem, {
        foreignKey: {
          name: 'idmensagem_resposta',
          allowNull: true
        }
      })

      Mensagem.belongsTo(model.Mensagem, {
        foreignKey: {
          name: 'idmensagem_resposta',
          allowNull: true
        }
      })
    }
  
    return Mensagem
  }
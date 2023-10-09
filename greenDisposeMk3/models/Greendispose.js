const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Greendispose = db.define('Greendispose', {
    name:{
        type: DataTypes.STRING,
        require:true
    },
    email:{
        type: DataTypes.STRING,
        require:true
    },
    senha:{
        type: DataTypes.STRING,
        require:true
    }
})

module.exports = Greendispose
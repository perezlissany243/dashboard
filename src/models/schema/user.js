const mongoose =require('mongoose')
const Schema =mongoose.Schema

const userSchema = new Schema({
    name: String,
    password: String,
    email: {
        type: String,
        unique: true
    },
    rol: {
        type: String,
        enum: ['user_admin','user_supervisor','user_collaborator'],
        default: 'user_collaborator'
    },
    parent_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },
    create_date: {
        type: Date,
        default: Date.now
    }
})

module.exports =mongoose.model("user",userSchema)
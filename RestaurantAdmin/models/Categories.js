const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
    categories: {
        type: String,
        required: true
    }
    

}, { timestamps: true })

const Categories = mongoose.model("Categories", CategoriesSchema, "categories")

module.exports = Categories;
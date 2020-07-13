const mongoose = require('mongoose');
const marked = require('marked')
const slugify = require('slugify')
//mongoose/model config
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: "Title Here"
    },
    description: {
        type: String,
        default: "Description Here"
    },
    markdown: {
        type: String,
        required: true,
        default: "markdown Here"
    },
    created: {
        type: Date,
        default: Date.now
    },
    //url slug
    //put in db bc we dont want to calculate it evrytime
    slug: {
        type: String,
        required: true,
        unique: true
    }
})
//in order to calculate slug before saving into database
//run fundtion before we do anyhing to the article
//and execute next
articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    next()
})
module.exports = mongoose.model("Article", articleSchema)
//all things in here relative to "/articles" route
const express = require('express');
const router = express.Router()
const Article = require('./../models/article');
const {
    response
} = require('express');

router.get("/new", (req, res) => {
    //pass something default so that it can display in the form first
    res.render('articles/new', {
        article: new Article()
    })
})

router.get("/:slug", async (req, res) => {
    const article = await Article.findOne({
        slug: req.params.slug
    });
    if (article == null) redirect('/')
    res.render('articles/show', {
        article: article
    })
})

//create route
router.post("/", async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try {
        article = await article.save()
        res.redirect(`articles/${article.slug}`);
        console.log("success");

    } catch (e) {
        //if there is some problem in the saving, redirect user to the new page 
        //and prefill the article with previous input
        console.log(e);
        res.render('articles/new', {
            article: article
        })
    }

});

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
})
module.exports = router
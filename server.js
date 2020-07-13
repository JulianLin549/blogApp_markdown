const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const articleRouter = require('./routes/articles');
const Article = require('./models/article')
mongoose.connect("mongodb://localhost:27017/blog_app_markdown", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public")); //去public找東西
app.use(methodOverride("_method"));
app.set('view engine', 'ejs'); //ejs設訂為預設檔案。//create and update



app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    created: 'desc'
  })
  res.render("articles/index", {
    articles: articles
  })
})
app.use('/articles', articleRouter)

const server = app.listen(3000, () => {
  console.log('Listening on port 3000');
});
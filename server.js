const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
const port= 5000

mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.get('/api/customers',(req,res)=>{
  const customers=[
    {id:1,firstName:"shivam",lastName:"arora"},
    {id:2,firstName:"shubham",lastName:"arora"},
    {id:3,firstName:"ed",lastName:"sheeran"}

  ]
  res.json(customers)
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(port,()=>console.log(`Server is running at ${port}`))
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')


beforeAll(async () => {
    await Blog.remove({})
    
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
})


test('id of a blog is called id', async() => {
    const response = await api.get('/api/blogs')
    const data = response.body
    const ids = data.map(blog => blog.id)
    for(i = 0; i < data.length; i++) {        
        expect(data[i].id).toBeDefined()
    }
})

test('a blog can be added', async () => {
    const newBlog = {
        id: "5a422a851b54a676234d17f7",
      title: "The New Blog",
      author: "Ykä",
      url: "https://reactpatterns.com/new",
      likes: 100,
      __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    const contents = response.body.map(r => r.content)

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
})

test('if likse not initialized, likes equals 0', async () => {
    await Blog.remove({})

    const newBlog = {
        
      title: "The Blog",
      author: "Ykäkö",
      url: "https://reactpatterdddns.com/new",
      
      
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        

    const response = await api.get('/api/blogs')
    
    const body = response.body

    expect(body[0].likes).toBe(0)

})  

test('if doesnt contain title or url, response 400', async () => {
    await Blog.remove({})

    const newBlog1 = {
        title: "Superblog",
        author: "Joku"
    }

    const newBlog2 = {
        author: "Hassan",
        url: "https://sqrrrrt"
    }

    await api
        .post('/api/blogs')
        .send(newBlog1)
        .expect(400)
    
    await api
        .post('/api/blogs')
        .send(newBlog2)
        .expect(400)  
})

afterAll(() => {
    mongoose.connection.close()
})
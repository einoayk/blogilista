const HashMap = require('hashmap')

const dummy = (blogs) => {
    const one = 1
    return one
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item
    }
    const total = blogs.map(blog => blog.likes).reduce(reducer, 0)

    return total    
}

const favoriteBlog = (blogs) => {
    var length = blogs.length
    var max = 0
    console.log(`length is ${length}` )
    for(var x = 0; x < length; x++) {
      if( blogs[x].likes > blogs[max].likes) {
          console.log(`x is ${x}`)
          console.log(`amount of likes ${blogs[x].likes}`)
        max = x
      }  
    }

    const favorite = {
      title: blogs[max].title,
      author: blogs[max].author,
      likes: blogs[max].likes
    }

    return favorite
}

const mostBlogs = (blogs) => {
  var map = new HashMap()

  for(var x = 0; x < blogs.length; x++) {
    if(map.has(blogs[x].author)) {
      console.log(`map has value ${blogs[x].author}`)
      const current = map.get(blogs[x].author)
      console.log(`current is ${current}`)
      map.delete(blogs[x].author)
      map.set(blogs[x].author, current+1)
    } else {
      map.set(blogs[x].author, 1)
    }
  }
  console.log(`map is ${map.keys()} ${map.values()}`)

  const values = map.values()
  console.log(values)
  var maxValue = 0

  for(var x = 0; x < values.length; x++) {
    if(values[x] > maxValue) {
      maxValue = values[x]
    }
  }

  const mostblogs = {
    author: map.search(maxValue),
    blogs: maxValue
  }

  console.log(mostblogs)
  return mostblogs
}
  
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
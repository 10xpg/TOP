const { PrismaClient } = require('@prisma/client')
const client = new PrismaClient()

const users = {
  createUser: async (email, hashedPwd, fname, lname) => {
    const newUser = await client.user.create({
      data: {
        email: email,
        firstname: fname,
        lastname: lname,
        hashedpwd: hashedPwd
      }
    })
    return newUser
  },

  getUserByEmail: async (email) => {
    const user = await client.user.findUnique({
      where: {
        email: email
      }
    })
    return user
  },

  getUserById: async (userId) => {
    const user = await client.user.findUnique({
      where: {
        id: userId
      }
    })
    return user
  },

  promoteToAuthor: async (email) => {
    const user = await client.user.update({
      where: {
        email: email,
        role: {
          equals: 'VIEWER'
        }
      },
      data: {
        role: 'AUTHOR'
      }
    })
    return user
  },

  deleteUser: async (email) => {
    const user = await client.user.delete({
      where: {
        email: email
      }
    })
    return { message: `User with email ${email} has been removed`, details: user }
  }
}

const posts = {
  createPost: async (userId, title, body) => {
    const post = await client.post.create({
      include: {
        author: true
      },
      data: {
        author: { connect: { id: userId } },
        title: title,
        content,
        body
      }
    })
    return post
  },

  getAllPosts: async () => {
    const posts = await client.post.findMany()
    return posts
  },

  getPostsBySingleUser: async (userId) => {
    const posts = await client.post.findMany({
      where: {
        authorId: userId
      }
    })
    return posts
  },

  getSinglePost: async (postId) => {
    const post = await client.post.findUnique({
      where: {
        id: postId
      }
    })
    return post
  },

  editPostContent: async (postId, title, body) => {
    const post = await client.post.update({
      where: {
        id: postId
      },
      data: {
        title: title,
        content: body
      }
    })
    return post
  },
  publishPost: async (postId) => {
    const post = await client.post.update({
      where: {
        id: postId
      },
      data: {
        published: true
      }
    })
    return post
  },

  deleteSinglePost: async (postId) => {
    const post = await client.post.delete({
      where: {
        id: postId
      }
    })
    return { message: `Post with postId ${postId} has been removed`, details: post }
  }
}

const comments = {
  createComment: async (postId, commenterId, comment) => {
    const comment = await client.comment.create({
      include: { commenter: true, post: true },
      data: {
        comment: comment,
        post: {
          connect: {
            id: postId
          }
        },
        commenter: {
          connect: {
            id: commenterId
          }
        }
      }
    })
  },

  getAllCommentsLinkedToPost: async (postId) => {
    const comments = await client.comment.findMany({
      include: { post: true },
      where: {
        postId: postId
      }
    })
    return comments
  },

  getCommentLinkedToPost: async (postId, commentId) => {
    const comment = await client.comment.findUnique({
      include: { post: true },
      where: {
        id: commentId,
        postId: postId
      }
    })
    return comment
  },

  editComment: async (postId, commentId, updatedComment) => {
    const comment = await client.comment.update({
      where: {
        id: commentId,
        postId: postId
      },
      data: {
        comment: updatedComment
      }
    })
    return comment
  },

  deleteComment: async (postId, commentId) => {
    const comment = await client.comment.delete({
      where: {
        id: commentId,
        postId: postId
      }
    })
    return { message: `Comment with ${commentId} on post with postId ${postId} has been removed`, details: comment }
  }
}

module.exports = { client, users, posts, comments }

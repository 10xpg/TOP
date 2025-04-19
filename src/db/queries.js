const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const users = {
  // -> Create
  addUser: async (fname, lname, email, hashedPwd) => {
    const user = await prisma.user.create({
      data: {
        firstName: fname,
        lastName: lname,
        email: email,
        pwdHash: hashedPwd
      }
    })
    return user
  },

  // -> Read
  findUserByEmail: async (email) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return user
  },

  findUserById: async (id) => {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return user
  },

  findAllUsers: async () => {
    const users = await prisma.user.findMany()
    return users
  }
}

module.exports = {
  prisma,
  users
}

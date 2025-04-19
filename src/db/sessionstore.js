const session = require('express-session')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')
const { prisma } = require('./queries')

const prismaStore = new PrismaSessionStore(prisma, {
  checkPeriod: 24 * 60 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined
})

module.exports = prismaStore

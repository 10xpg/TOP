const queries = require('./queries')

async function main() {
  // console.log(await queries.users.findUserByEmail('jdoe@email.com'))
  // console.log(await queries.users.findUserById('46d7f123-8b54-45ac-a90f-8017182037a4'))
  // console.log(await queries.users.findAllUsers())
  // console.log(await queries.folders.getSingleDirectory('b4a65c73-6d63-456c-81a9-7df6b58473ab', 'root'))
  const dirId = await queries.folders.getDirectoryId('b4a65c73-6d63-456c-81a9-7df6b58473ab', 'root')
  console.log(typeof dirId)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await queries.prisma.$disconnect()
  })

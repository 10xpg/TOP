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

const files = {
  // -> Create
  uploadFile: async (ownerId, filename, ext, filesize, ogname, mimetype, dirname = 'root') => {
    const file = await prisma.file.create({
      data: {
        directory: {
          connectOrCreate: {
            where: {
              ownerId_dirname: {
                ownerId: ownerId,
                dirname: dirname
              }
            },
            create: {
              dirname: dirname,
              owner: {
                connect: { id: ownerId }
              }
            }
          }
        },
        owner: {
          connect: {
            id: ownerId
          }
        },
        name: filename,
        originalname: ogname,
        extension: ext,
        mimetype: mimetype,
        size: filesize
      }
    })
    return file
  },

  // -> Read
  getAllFiles: async () => {
    const files = await prisma.file.findMany()
    return files
  },

  getSingleFile: async (ogname) => {
    const file = await prisma.file.findFirst({
      where: {
        originalname: ogname
      }
    })
    return file
  }
}

const folders = {
  // -> Create
  createDirectory: async (ownerId, dirname, parentId = null) => {
    const dir = await prisma.directory.create({
      data: {
        dirname: dirname,
        owner: {
          connect: { id: ownerId }
        },
        parent: parentId ? { connect: { id: parentId } } : undefined // no parent => root directory
      }
    })
    return dir
  },

  // -> Read
  getAllDirectories: async () => {
    const dirs = await prisma.directory.findMany({ include: { files: true, children: true } })
    return dirs
  },

  getSingleDirectory: async (ownerId, dirname) => {
    const dir = await prisma.directory.findFirst({
      include: { files: true, children: true },
      where: {
        ownerId: ownerId,
        AND: {
          dirname: dirname
        }
      }
    })
    return dir
  },

  getDirectoryId: async (ownerId, dirname) => {
    const dir = await prisma.directory.findFirst({
      include: { files: true },
      where: {
        ownerId: ownerId,
        AND: {
          dirname: dirname
        }
      }
    })
    return dir.id
  },

  // -> Update
  updateSingleDirectory: async (ownerId, dirname, newDirName) => {
    const dir = await prisma.directory.update({
      where: {
        ownerId_dirname: {
          dirname: dirname,
          ownerId: ownerId
        }
      },
      data: {
        dirname: newDirName
      }
    })
    return dir
  },

  //-> Delete
  deleteAllDirectories: async () => {
    await prisma.directory.deleteMany()
    return { message: 'All directories deleted successfully' }
  },

  deleteSingleDirectory: async (ownerId, dirname) => {
    await prisma.directory.delete({
      where: {
        ownerId_dirname: {
          ownerId: ownerId,
          dirname: dirname
        }
      }
    })
    return { message: `Deleted directory ${dirname} successfully` }
  }
}

module.exports = {
  prisma,
  users,
  files,
  folders
}

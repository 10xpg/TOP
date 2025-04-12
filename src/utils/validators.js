const { body } = require('express-validator')

const validateRegister = [
  body('firstname')
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 1, max: 50 })
    .withMessage('Length must be greater than 1 and less than 50 characters')
    .toLowerCase(),
  body('lastname')
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 1, max: 50 })
    .withMessage('Length must be greater than 1 and less than 50 characters')
    .toLowerCase(),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 1, max: 50 })
    .withMessage('Length must be greater than 1 and less than 50 characters')
    .toLowerCase(),
  body('password1')
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Length must be at least 8 characters long')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W_]{8,}$/)
    .withMessage('Must contain an uppercase letter,a lowercase letter,a number and a special character'),

  body('password2')
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Length must be at least 8 characters long')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W_]{8,}$/)
    .withMessage('Must contain an uppercase letter,a lowercase letter,a number and a special character')
    .custom((value, { req }) => {
      return value === req.body.password1
    })
    .withMessage('Passwords do not match!')
]

const validateLogin = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 1, max: 50 })
    .withMessage('Length must be greater than 1 and less than 50 characters')
    .toLowerCase(),
  body('password')
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Length must be at least 8 characters long')
]

const validateMemberReq = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 1, max: 50 })
    .withMessage('Length must be greater than 1 and less than 50 characters')
    .toLowerCase(),
  body('secretcode')
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 6, max: 6 })
    .withMessage('Length must be 6 characters long')
]
const validateAdminReq = [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 1, max: 50 })
    .withMessage('Length must be greater than 1 and less than 50 characters')
    .toLowerCase(),

  body('passcode')
    .notEmpty()
    .withMessage('This field cannot be empty')
    .isLength({ min: 6, max: 6 })
    .withMessage('Length must be 6 characters long')
]

module.exports = { validateRegister, validateLogin, validateMemberReq, validateAdminReq }

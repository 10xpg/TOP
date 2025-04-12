const { body } = require('express-validator')

const validateRegister = () => {
  const validator = [
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
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W_]$/),
    body('password2')
      .notEmpty()
      .withMessage('This field cannot be empty')
      .isLength({ min: 8 })
      .withMessage('Length must be at least 8 characters long')
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W_]$/)
  ]
  return validator
}

const validateLogin = () => {
  const validator = [
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
  return validator
}

module.exports = { validateRegister, validateLogin }

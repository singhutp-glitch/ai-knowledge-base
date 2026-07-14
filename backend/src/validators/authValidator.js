import {body} from 'express-validator'

const registerValidator = [
    body('name')
    .trim()
  .isLength({min:3})
  .withMessage("name must be at least 3 character long"),
    body("email")
  .trim()
  .notEmpty()
  .withMessage("email is required")
  .isEmail()
  .withMessage("email must be a valid email"),
    body("password")
  .trim()
  .isLength({ min: 6 })
  .withMessage("password must be at least 6 characters long")
];

export default registerValidator;
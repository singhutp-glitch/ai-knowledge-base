import {body} from 'express-validator'

const loginValidator = [
    body("email")
  .isEmail()
  .withMessage("email must be a valid email"),
    body("password")
  .notEmpty()
  .withMessage("password must not be empty")
];

export default loginValidator;
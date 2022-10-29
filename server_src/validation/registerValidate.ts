import validator from "validator";
import isEmpty from "../helpers/isEmpty";

const validateRegistrationInputs = (data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  interface Errors {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }
  const errors: Errors = {};

  data.username = isEmpty(data.username) ? "" : data.username;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.confirmPassword = isEmpty(data.confirmPassword)
    ? ""
    : data.confirmPassword;

  //---------------------------------------------|
  //           validate username
  //---------------------------------------------|
  if (!validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Username value must be between 3 and 20 charchter";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  //---------------------------------------------|
  //           validate email
  //---------------------------------------------|
  if (!validator.isEmail(data.email)) {
    errors.email = "Insert valid email";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //---------------------------------------------|
  //           validate password
  //---------------------------------------------|
  if (!validator.isLength(data.password, { min: 4, max: 20 })) {
    errors.password = "Password value must be between 4 and 20 charchter";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  //---------------------------------------------|
  //           validate confirmPassword
  //---------------------------------------------|
  if (validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "ConfirmPassword is required";
  }

  if (!validator.equals(data.confirmPassword, data.password)) {
    errors.confirmPassword = "Confirm password doesn't match";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export default validateRegistrationInputs;

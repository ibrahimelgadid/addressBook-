import validator from "validator";
import isEmpty from "../helpers/isEmpty";

const validateLoginInputs = (data: { email: string; password: string }) => {
  interface Errors {
    email?: string;
    password?: string;
  }
  const errors: Errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  //---------------------------------------------|
  //           validate email
  //---------------------------------------------|
  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  //---------------------------------------------|
  //           validate password
  //---------------------------------------------|
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};
export default validateLoginInputs;

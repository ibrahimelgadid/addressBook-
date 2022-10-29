import validator from "validator";
import isEmpty from "../helpers/isEmpty";

const validateTaskInputs = (data: { name: string; phone: string }) => {
  interface Errors {
    name?: string;
    phone?: string;
  }
  const errors: Errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;
  data.phone = isEmpty(data.phone) ? "" : data.phone;

  //---------------------------------------------|
  //           validate name
  //---------------------------------------------|
  if (!validator.isLength(data.name, { min: 3, max: 20 })) {
    errors.name = "name value must be between 3 and 20 charchter";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "name is required";
  }

  //---------------------------------------------|
  //           validate phone
  //---------------------------------------------|
  if (!validator.isLength(data.phone, { min: 8, max: 50 })) {
    errors.phone = "phone value must be between 11 and 20 numbers";
  }
  if (!validator.isNumeric(data.phone)) {
    errors.phone = "phone value must be numbers only";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "phone is required";
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};
export default validateTaskInputs;

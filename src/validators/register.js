import * as yup from "yup";

const noSpecialCharacters = /^[a-zA-Z\s]+$/;
const passwordComplexity =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const registerValidation = yup.object().shape({
  firstname: yup
    .string()
    .matches(
      noSpecialCharacters,
      "First Name should not contain special characters or numbers",
    )
    .required("First Name is required"),
  lastname: yup
    .string()
    .matches(
      noSpecialCharacters,
      "Last Name should not contain special characters or numbers",
    )
    .required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      passwordComplexity,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .required("Password is required"),
});

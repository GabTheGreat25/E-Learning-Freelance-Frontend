import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// Add custom method for mobile number validation
yup.addMethod(yup.string, "mobileNumber", function () {
  return this.test("mobileNumber", "Invalid mobile number", function (value) {
    const { path, createError } = this;

    if (!value) return true;

    const mobileNumber = parsePhoneNumberFromString(value);

    if (mobileNumber && mobileNumber.isValid()) return true;

    return createError({ path, message: "Invalid mobile number" });
  });
});

export const updateProfileValidation = yup.object().shape({
  firstname: yup.string().required("First Name is required"),
  lastname: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  mobileNumber: yup
    .string()
    .mobileNumber()
    .required("Mobile number is required"),
  birthDate: yup
    .date()
    .typeError("Invalid date format")
    .required("Birth Date is required"),
  bio: yup.string(),
  gender: yup
    .object()
    .shape({
      value: yup.string().required("Gender value is required"),
      label: yup.string().required("Gender label is required"),
    })
    .nullable()
    .default(null)
    .required("Gender is required"),
  address: yup.string().required("Address is required"),
  country: yup
    .object()
    .shape({
      value: yup.string().required("Country value is required"),
      label: yup.string().required("Country label is required"),
    })
    .nullable()
    .default(null)
    .required("Country is required"),
  province: yup
    .mixed()
    .test(
      "is-object-or-string",
      "Province must be a valid object or string",
      (value) => {
        return typeof value === "object" && value !== null
          ? value.label && value.value
          : typeof value === "string";
      },
    )
    .nullable()
    .default(null)
    .required("Province is required"),
  city: yup
    .mixed()
    .test(
      "is-object-or-string",
      "City must be a valid object or string",
      (value) => {
        return typeof value === "object" && value !== null
          ? value.label && value.value
          : typeof value === "string";
      },
    )
    .nullable()
    .default(null)
    .required("City is required"),
  avatar: yup.string().nullable(),
});

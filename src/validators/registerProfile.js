import * as yup from "yup";
import { parsePhoneNumberFromString } from "libphonenumber-js";

yup.addMethod(yup.string, "mobileNumber", function () {
  return this.test("mobileNumber", "Invalid mobile number", function (value) {
    const { path, createError } = this;

    if (!value) return true;

    const mobileNumber = parsePhoneNumberFromString(value);

    if (mobileNumber && mobileNumber.isValid()) return true;

    return createError({ path, message: "Invalid mobile number" });
  });
});

export const registerProfileValidation = yup.object().shape({
  mobileNumber: yup
    .string()
    .mobileNumber()
    .required("Mobile number is required"),
  birthDate: yup
    .date()
    .typeError("Invalid date format")
    .required("Birth Date is required"),
  country: yup
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
    .object()
    .shape({
      value: yup.string().required("Province value is required"),
      label: yup.string().required("Province label is required"),
    })
    .nullable()
    .default(null)
    .required("Province is required"),
  city: yup
    .object()
    .shape({
      value: yup.string().required("City value is required"),
      label: yup.string().required("City label is required"),
    })
    .nullable()
    .default(null)
    .required("City is required"),
});

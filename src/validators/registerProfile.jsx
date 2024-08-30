import * as yup from "yup";
import { parsePhoneNumberFromString, isValidNumber } from "libphonenumber-js";

yup.addMethod(yup.string, "phoneNumber", function () {
  return this.test("phoneNumber", "Invalid phone number", function (value) {
    const { path, createError } = this;

    if (!value) return true;

    const phoneNumber = parsePhoneNumberFromString(value);

    if (phoneNumber && isValidNumber(phoneNumber.number)) return true;

    return createError({ path, message: "Invalid phone number" });
  });
});

export const registerProfileValidation = yup.object().shape({
  phoneNumber: yup.string().phoneNumber().required("Phone number is required"),
  birthdate: yup.date().required("Birthdate is required"),
  address: yup.string().required("Address is required"),
  country: yup
    .object()
    .shape({
      value: yup.string().required("Country is required"),
      label: yup.string().required("Country label is required"),
    })
    .nullable()
    .transform((value) => value || null)
    .required("Country is required"),
  province: yup
    .object()
    .shape({
      value: yup.string().required("Province is required"),
      label: yup.string().required("Province label is required"),
    })
    .nullable()
    .transform((value) => value || null)
    .required("Province is required"),
  city: yup
    .object()
    .shape({
      value: yup.string().required("City is required"),
      label: yup.string().required("City label is required"),
    })
    .nullable()
    .transform((value) => value || null)
    .required("City is required"),
});

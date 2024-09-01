import * as yup from "yup";

export const verificationValidation = yup.object().shape({
  otp: yup.string().required("Otp is required"),
});

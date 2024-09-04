import React from "react";
import { useNavigate } from "react-router-dom";
import { LockImg, VerifiedImg } from "@assets";
import { MyCarousel } from "@components";

export function SendResetLink() {
  const navigate = useNavigate();

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2 bg-dark-default text-light-default">
      <MyCarousel />
      <div className="relative flex items-center justify-center p-6 lg:p-10 xl:p-32">
        <div className="w-full max-w-lg mt-20 xl:mt-8 lg:mt-16">
          <h1 className="mb-1 text-3xl font-semibol d lg:text-4xl">
            Reset Password
          </h1>
          <p className="mb-2 text-lg">
            Check your email for reset password instruction
          </p>

          <div className="flex items-center justify-center">
            <img src={VerifiedImg} alt="VerifiedImg" className="pt-12 pb-16" />
          </div>

          <button
            type="submit"
            onClick={() => navigate("/resetPassword")}
            className="w-full py-3 mb-6 text-lg rounded-md bg-dark-secondary text-light-default"
          >
            Continue
          </button>

          <div className="flex items-end justify-center gap-x-3">
            <img src={LockImg} alt="LockImg" />
            <h1 className="text-sm text-light-tertiary">
              Your Info is safely secured
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

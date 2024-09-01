import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Test,
  Home,
  Login,
  ForgotPassword,
  SendResetLink,
  ResetPassword,
  Register,
  RegisterProfile,
  Verification,
  Verified,
} from "@/pages";
import { AdminLayout, HomeLayout, NotFound, RootLayout } from "@/layouts";
import { PrivateRoute, PublicRoute } from "@/components";

export default function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route element={<HomeLayout />}>
                  <Route index element={<Login />} />
                  <Route path="forgotPassword" element={<ForgotPassword />} />
                  <Route path="sendResetLink" element={<SendResetLink />} />
                  <Route path="resetPassword" element={<ResetPassword />} />
                  <Route path="register" element={<Register />} />
                  <Route path="registerProfile" element={<RegisterProfile />} />
                  <Route path="verification" element={<Verification />} />
                  <Route path="verified" element={<Verified />} />
                </Route>
              </Route>
              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="dashboard" element={<AdminLayout />}>
                  <Route index element={<Home />} />
                  {/* <Route index element={<Test />} /> */}
                </Route>
              </Route>
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>,
          ),
        )}
      />
    </>
  );
}

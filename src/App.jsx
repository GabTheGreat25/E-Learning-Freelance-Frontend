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
  Register,
  RegisterProfile,
  Verification,
  Verified,
} from "@/pages";
import { AdminLayout, HomeLayout, NotFound, RootLayout } from "@/layouts";

export default function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
              {/* Public Route */}
              <Route element={<HomeLayout />}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="registerProfile" element={<RegisterProfile />} />
                <Route path="verification" element={<Verification />} />
                <Route path="verified" element={<Verified />} />
              </Route>
              {/* Private Route */}
              <Route element={<AdminLayout />}>
                <Route index element={<Home />} />
                {/* <Route index element={<Test />} /> */}
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

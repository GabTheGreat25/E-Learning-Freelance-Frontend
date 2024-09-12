import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  Test,
  Login,
  ForgotPassword,
  SendResetLink,
  ResetPassword,
  Register,
  RegisterProfile,
  Verification,
  Verified,
  Home,
  Analytics,
  ViewAnalytics,
  Courses,
  AddCourses,
  Videos,
  AddVideos,
  ViewVideos,
  Promotions,
  AddPromotions,
  Setting,
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
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="analytics/:id" element={<ViewAnalytics />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="courses/create" element={<AddCourses />} />
                  <Route path="promotions" element={<Promotions />} />
                  <Route path="promotions/create" element={<AddPromotions />} />
                  <Route path="videos" element={<Videos />} />
                  <Route path="videos/create" element={<AddVideos />} />
                  <Route path="videos/view" element={<ViewVideos />} />
                  <Route path="settings" element={<Setting />} />
                  <Route path="test" element={<Test />} />
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

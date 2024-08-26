import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Test, Home } from "@/pages";
import { HomeLayout, NotFound, RootLayout } from "@/layouts";

export default function App() {
  return (
    <>
      <RouterProvider
        router={createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<RootLayout />}>
              {/* Public Route */}
              {/* Private Route */}
              <Route element={<HomeLayout />}>
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

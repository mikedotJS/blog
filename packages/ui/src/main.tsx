import { ChakraProvider } from "@chakra-ui/react";
import { Refine } from "@refinedev/core";
import dataProvider, { axiosInstance } from "@refinedev/simple-rest";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import PostCreate from "./routes/admin/post-create";
import PostList from "./routes/admin/post-list";
import Blog from "./routes/blog";
import PostView from "./routes/post-view";
import Root from "./routes/root";

const API_URL = "http://localhost:3000/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Blog />,
  },
  { path: "/posts/:id", element: <PostView /> },
  {
    path: "/admin",
    element: <Root />,
    children: [
      { path: "/admin/posts", element: <PostList /> },
      { path: "/admin/posts/create", element: <PostCreate /> },
    ],
  },
]);

const API_TOKEN = "civcivim";

axiosInstance.interceptors.request.use((config) => {
  config.headers.setAuthorization(`Bearer ${API_TOKEN}`);

  return config;
});

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <Refine dataProvider={dataProvider(API_URL)}>
        <RouterProvider router={router} />
      </Refine>
    </ChakraProvider>
  </StrictMode>
);

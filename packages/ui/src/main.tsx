import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Root from "./routes/root";
import PostList from "./routes/post-list";
import { Refine } from "@refinedev/core";
import dataProvider, { axiosInstance } from "@refinedev/simple-rest";
import PostCreate from "./routes/post-create";

const API_URL = "http://localhost:3000/api";

const router = createBrowserRouter([
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

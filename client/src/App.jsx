import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NoteForm from "./components/NoteForm";
import NoteCTA from "./components/NoteCTA";
import Notes from "./pages/Notes";
import Archive from "./pages/Archive";

const queryClient = new QueryClient({
  queries: {
    staleTime: 0,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <AppLayout />, 
    children: [
      {
        path: "/notes", // 
        element: <Notes />, 
        children: [
          {
            path: ":noteId",
            element: <NoteForm />,
          },
        ],
      },

      {path:'/archive',element:<Archive/>}
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <RouterProvider router={router} />

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
           
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

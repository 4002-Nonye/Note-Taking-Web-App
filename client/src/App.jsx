import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import Settings from "./pages/Settings";
import ColorTab from "./components/ColorTab";
import FontTab from "./components/FontTab";
import { FontProvider } from "./contexts/FontContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Tags from "./pages/Tags";
import NoteList from "./components/NoteList";
import FilteredTags from "./components/FilteredTags";
import { NoteProvider } from "./contexts/NoteContext";
import TaggedNotes from "./pages/TaggedNotes";
import SearchTab from "./pages/SearchTab";
import ChangePassword from "./components/ChangePassword";

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
        path: "/notes",
        element: <Notes />,
        children: [
          {
            path: ":noteId",
            element: <NoteForm />, // Single note view/edit
          },
        ],
      },
      {
        path: "/archive",
        element: <Archive />,
        children: [
          {
            path: ":noteId",
            element: <NoteForm isArchive={true} />, // Archived note view/edit
          },
        ],
      },
      {
        path: "/tags/:tag",
        element: <TaggedNotes />,
        children: [
          {
            path: "/tags/:tag/:id",
            element: <NoteForm />,
          },
        ],
      },

      {
        path: "/tags",
        element: <Tags />,
        children: [],
      },
      {
        path: "/account/settings",
        element: <Settings />,
        children: [
          {
            path: "color-theme",
            element: <ColorTab />,
          },
          {
            path: "font-theme",
            element: <FontTab />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "/search",
        element: <SearchTab />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <NoteProvider>
        <FontProvider>
          <ThemeProvider>
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
                  textAlign: "center",
                  backgroundColor: "#fff",
                  color: "#000",
                },
                className: "toast",
              }}
            />
          </ThemeProvider>
        </FontProvider>
      </NoteProvider>
    </QueryClientProvider>
  );
}

export default App;

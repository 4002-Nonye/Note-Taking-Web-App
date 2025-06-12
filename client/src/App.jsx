import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import ChangePassword from './components/ChangePassword';
import ColorTab from './components/ColorTab';
import FontTab from './components/FontTab';
import NoteForm from './components/NoteForm';
import ProtectedRoute from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import { FontProvider } from './contexts/FontContext';
import { ModalProvider } from './contexts/ModalContext';
import { NoteProvider } from './contexts/NoteContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Archive from './pages/Archive';
import LoginPage from './pages/LoginPage';
import Notes from './pages/Notes';
import RegisterPage from './pages/RegisterPage';
import SearchTab from './pages/SearchTab';
import Settings from './pages/Settings';
import TaggedNotes from './pages/TaggedNotes';
import Tags from './pages/Tags';

import './index.css'

const queryClient = new QueryClient({
  queries: {
    staleTime: 0,
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/notes',
        element: <Notes />,
        children: [
          {
            path: ':noteId',
            element: <NoteForm />, // Single note view/edit
          },
          {
            path: 'new',
            element: <NoteForm />, // create new note
          },
        ],
      },
      {
        path: '/archive',
        element: <Archive />,
        children: [
          {
            path: ':noteId',
            element: <NoteForm isArchive={true} />, // Archived note view/edit
          },
        ],
      },
      {
        path: '/tags/:tag',
        element: <TaggedNotes />,
        children: [
          {
            path: '/tags/:tag/:noteId',
            element: <NoteForm />,
          },
        ],
      },

      {
        path: '/tags',
        element: <Tags />,
        children: [],
      },
      {
        path: '/account/settings',
        element: <Settings />,
        children: [
          {
            path: 'color-theme',
            element: <ColorTab />,
          },
          {
            path: 'font-theme',
            element: <FontTab />,
          },
          {
            path: 'change-password',
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: '/search',
        element: <SearchTab />,
        children: [
          {
            path: ':noteId',
            element: <NoteForm />, // Single note view/edit
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ModalProvider>
        <NoteProvider>
          <FontProvider>
            <ThemeProvider>
              <RouterProvider router={router} />

              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{
                  margin: '8px',
                }}
                toastOptions={{
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 3000,
                  },
                  style: {
                    fontSize: '14px',
                    maxWidth: '500px',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    color: '#000',
                  },
                  className: 'toast',
                }}
              />
            </ThemeProvider>
          </FontProvider>
        </NoteProvider>
      </ModalProvider>
    </QueryClientProvider>
  );
}

export default App;

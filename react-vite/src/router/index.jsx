import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import SongDetail from '../components/SongDetail'
import AddASong from '../components/AddASong'
import UpdateASong from '../components/UpdateASong';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "song/:song_id",
        // path: "songs",
        element: <SongDetail />,
      },
    
      {
        path: "songs/new",
        element: <AddASong />,
      },
      {
        path: "songs/:song_id/update",
        element: <UpdateASong />,
      }
    ],
  },
]);
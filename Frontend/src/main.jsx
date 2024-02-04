import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.jsx';
import SignUp from './routes/SignUp.jsx';
import Navbar from './components/Navbar.jsx';
import LogIn from './routes/LogIn.jsx';
// import LogOut from './routes/LogOut.jsx';
import { useState, useEffect } from 'react'
// import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/error-page.jsx';
import CreateNote from './routes/Notes/CreateNote.jsx';
import Notes from './routes/Notes/Notes.jsx';
import ViewNotes from './routes/Notes/ViewNotes.jsx';
import EditNotes from './routes/Notes/EditNotes.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
  // {
  //   path: '/logout',
  //   element: <LogOut />,
  //   errorElement: <ErrorPage />
  // }
  {
    path: "/new",
    element: <CreateNote />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/notes',
    element: <Notes />,
    errorElement: <ErrorPage />
  },
  {
    path: '/view/:id',
    element: <ViewNotes />,
    errorElement: <ErrorPage />
  },
  {
    path: '/edit/:id',
    element: <EditNotes />,
    errorElement: <ErrorPage />
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Navbar /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)

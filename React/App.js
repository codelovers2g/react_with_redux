import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import Layout from "./components/layout/layout";
import MainBackground from "./assets/mainBackground.svg";
import { useGetOrganisationNamesQuery } from "./store/services/organisationNameApi";
import { useDispatch } from "react-redux";
import { setToken } from "./store/slices/authSlice";
import { setTenent } from "./store/slices/tenentSlice";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import createOrgRouts from "./routings/routings.jsx";
import Message from "./pages/message/message";
import PageNotFound from "./pages/error404/error404";
import Interview from "./pages/interview/landing/interview";
import Subscription from "./pages/subscription/subscription";
import InterviewQuestions from "./pages/interview/interviewQuestions/interviewQuestions";

function App() {
  const [routes, setRoutes] = useState([
    { path: "*", element: <PageNotFound /> },
    { path: `/`, element: <Layout /> },
    { path: `/signup`, element: <Signup /> },
    { path: `/subscription`, element: <Subscription /> },
    {
      path: `/signupSuccessful/:name`,
      element: <Message message="Register successfully" />,
    },
  ]);
  const [sasRouter, setSasRouter] = useState(createBrowserRouter(routes));

  const token = useSelector((state) => state.auth.token);
  const tenents = useSelector((state) => state.tenent.tenent);
  const { data, error, isLoading } = useGetOrganisationNamesQuery();
  const orgName = window.location.pathname.split("/")[1];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(sessionStorage.getItem("token")));
  });

  const findValue = (array) => {
    return array.filter((item) => item.Name === orgName);
  };

  useEffect(() => {
    dispatch(setTenent(data?.data?.organisation));
  });

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setRoutes(createOrgRouts(decodedToken));
    } else if (tenents?.length > 0) {
      if ((findValue(tenents).length = !0)) {
        if (tenents) {
          tenents.forEach((element) => {
            setRoutes((prevRoutes) => [
              ...prevRoutes,
              {
                path: `/${element.Name}`,
                children: [
                  { path: `login`, element: <Login /> },
                  { path: `interview/:interviewId`, element: <Interview /> },
                  {
                    path: `interviewstarted/:interviewId`,
                    element: <InterviewQuestions />,
                  },
                ],
              },
            ]);
          });
        }
      }
    }
  }, [tenents, token]);

  useEffect(() => {
    setSasRouter(createBrowserRouter(routes));
  }, [routes]);

  return (
    <>
      {data && (
        <div
          className="root-main"
          style={{
            backgroundImage: `url(${MainBackground})`,
            backgroundPosition: "top left",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            height: "99.9%",
            overflow: "auto",
            overflowY: "auto",
          }}
        >
          <RouterProvider router={sasRouter} />
        </div>
      )}
    </>
  );
}

export default App;

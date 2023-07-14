import React from "react";
import UserProfile from "../pages/userProfile/userProfile";
import EmployeeAddEdit from "../pages/employees/addEdit/employeeAddEdit";
import Employee from "../pages/employees/listing/employees";
import Departments from "../pages/departments/listing/departments";
import Layout from "../components/layout/layout";
import Login from "../pages/login/login";
import Dashboard from "../pages/dashboard/dashboard";
import AiMatching from "../pages/jobFeed/aiMatching/aiMatching";
import JobFeed from "../pages/jobFeed/listing/jobFeed";
import Analytics from "../pages/analytics/analytics";
import Tasks from "../pages/tasks/listing/tasks";
import Settings from "../pages/settings/settings";
import Candidates from "../pages/candidates/listing/candidates";
import Calendar from "../pages/calendar/calendar";
import Roles from "../pages/roles/listing/roles";
import SaveRole from "../pages/roles/saveRole/saveRole";
import SaveDepartment from "../pages/departments/saveDepartment/saveDepartment";
import PageNotFound from "../pages/error404/error404";
import SaveTask from "../pages/tasks/saveTask/saveTask";
import SaveJobFeed from "../pages/jobFeed/saveJobFeed/saveJobFeed";
import SaveCandidate from "../pages/candidates/save/saveCandidate";
import CandidateProfile from "../pages/candidates/candidateProfile/candidateProfile";
import DepartmentView from "../pages/departments/departmentView/departmentView";

const routings = (decodedToken) => {
  return [
    { path: "*", element: <PageNotFound /> },
    { path: `/`, element: <Layout /> },
    {
      path: `/${decodedToken.OrganisationName}`,
      element: <Layout />,
      children: [
        {
          path: `dashboard`,
          element: <Dashboard />,
        },
        {
          path: `employees`,
          children: [
            { index: true, element: <Employee /> },
            {
              path: `profile/:userId`,
              element: <UserProfile />,
            },
            {
              path: `add`,
              element: <EmployeeAddEdit />,
            },
            {
              path: `edit/:userId`,
              element: <EmployeeAddEdit />,
            },
          ],
        },
        {
          path: `departments`,
          children: [
            { index: true, element: <Departments /> },
            {
              path: `add`,
              element: <SaveDepartment />,
            },
            {
              path: `edit/:departmentId`,
              element: <SaveDepartment />,
            },
            {
              path: `view/:id`,
              element: <DepartmentView />,
            },
            {
              path: `employees/profile/:userId`,
              element: <UserProfile />
            },
          ],
        },
        {
          path: `jobfeed`,
          children: [
            { index: true, element: <JobFeed /> },
            { path: `add`, element: <SaveJobFeed /> },
            { path: `edit/:id`, element: <SaveJobFeed /> },
            { path: `aiMatching`, element: <AiMatching /> },
          ],
        },
        {
          path: `analytics`,
          element: <Analytics />,
        },
        {
          path: `tasks`,
          children: [
            { index: true, element: <Tasks /> },
            {
              path: `add`,
              element: <SaveTask />,
            },
            {
              path: `edit/:taskId`,
              element: <SaveTask />,
            },
          ],
        },
        {
          path: `settings`,
          element: <Settings />,
        },
        {
          path: `candidates`,
          element: <Candidates />,
        },
        {
          path: `candidates`,
          children: [
            { index: true, element: <Candidates /> },
            {
              path: `add`,
              element: <SaveCandidate />,
            },
            {
              path: `profile/:id`,
              element: <CandidateProfile />,
            },
            {
              path: `edit/:id`,
              element: <SaveCandidate />,
            },
          ],
        },

        {
          path: `calendar`,
          element: <Calendar />,
        },
        {
          path: `roles`,
          children: [
            {
              index: true,
              element: <Roles />,
            },
            {
              path: `addRole`,
              element: <SaveRole />,
            },
          ],
        },
      ],
    },
  ];
};

export default routings;

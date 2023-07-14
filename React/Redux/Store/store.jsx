import { configureStore } from "@reduxjs/toolkit";
import { organisationNames } from "./services/organisationNameApi";
import { organisationTypes } from "./services/organisationTypeApi";
import { getAllUsers } from "./services/userApi";
import { register } from "./services/registrationApi";
import { login } from "./services/loginApi";
import { getEthnicities } from "./services/ethinicityApi";
import { gender } from "./services/genderApi";
import { roles } from "./services/roleApi";
import { getDepartments } from "./services/departmentApi";
import { getSkills } from "./services/skillsApi";
import { tasks } from "./services/taskApi";
import { jobFeeds } from "./services/jobFeedApi";
import { interviewSchedule } from "./services/interviewScheduleApi";
import { candidates } from "./services/candidateApi";

import authReducer from "./slices/authSlice";
import tenentReducer from "./slices/tenentSlice";
import employeeSavedReducer from "./slices/saveEmployeeSlice";
import saveJobSliceReducer from "./slices/saveJobSlice";
import jobSliceReducer from "./slices/jobsSlice";
import candidateSliceReducer from "./slices/saveCandidateSlice";
import jobFeedSliceReducer from "./slices/jobFeedSlice";
import candidateStatusSliceReducer from "./slices/candidateStatusSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tenent: tenentReducer,
    employeeSaved: employeeSavedReducer,
    jobSaved: saveJobSliceReducer,
    jobs: jobSliceReducer,
    candidateSaved: candidateSliceReducer,
    job: jobFeedSliceReducer,
    status: candidateStatusSliceReducer,
    [tasks.reducerPath]: tasks.reducer,
    [organisationTypes.reducerPath]: organisationTypes.reducer,
    [getAllUsers.reducerPath]: getAllUsers.reducer,
    [organisationNames.reducerPath]: organisationNames.reducer,
    [register.reducerPath]: register.reducer,
    [login.reducerPath]: login.reducer,
    [getEthnicities.reducerPath]: getEthnicities.reducer,
    [gender.reducerPath]: gender.reducer,
    [roles.reducerPath]: roles.reducer,
    [getDepartments.reducerPath]: getDepartments.reducer,
    [getSkills.reducerPath]: getSkills.reducer,
    [jobFeeds.reducerPath]: jobFeeds.reducer,
    [candidates.reducerPath]: candidates.reducer,
    [interviewSchedule.reducerPath]: interviewSchedule.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      organisationTypes.middleware,
      getAllUsers.middleware,
      organisationNames.middleware,
      register.middleware,
      login.middleware,
      getEthnicities.middleware,
      gender.middleware,
      roles.middleware,
      getDepartments.middleware,
      getSkills.middleware,
      tasks.middleware,
      jobFeeds.middleware,
      candidates.middleware,
      interviewSchedule.middleware
    ),
});

export default store;

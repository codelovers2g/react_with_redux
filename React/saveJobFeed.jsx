import React, { useEffect, useMemo, useState } from "react";
import ThemeCard from "../../../components/themeCard/themeCard";
import { Container, Grid, MenuItem } from "@mui/material";
import FormWrapper from "../../../components/UI/formWrapper/formWrapper";
import TypographyField from "../../../components/UI/typographyField/typographyField";
import InputFields from "../../../components/UI/inputField/inputField";
import SelectField from "../../../components/UI/selectField/selectField";
import ThemePrimaryBtn from "../../../components/themeButtons/ThemePrimaryBtn";
import { useFormik } from "formik";
import { jobFeedSchema } from "../../../components/validations/jobFeedValidations/jobFeedvalidations";
import FormDateTimePicker from "../../../components/UI/formDateTimePicker/formDateTimePicker";
import { useGetAllDepartmentsQuery } from "../../../store/services/departmentApi";
import { useAddJobsMutation } from "../../../store/services/jobFeedApi";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../../components/UI/errorPopup";
import { setJobSaved } from "../../../store/slices/saveJobSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const SaveJobFeed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMassege, setErrorMassege] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [schedule, setSchedule] = useState(null);
  const [jobFeedTitle, setJobFeedTitle] = useState("Add JobFeed");
  const { data: departments, refetch: refetchDepartments  } = useGetAllDepartmentsQuery();
  const [createJob] = useAddJobsMutation();

  const initialValues = {
    title: "",
    schedule: "",
    department: "",
    location: "",
    description: "",
    goals: "",
    expectedHiring: "",
  };

  const [scheduleValidError, setScheduleValidError] = useState(null);

  const scheduleErrorMassege = useMemo(() => {
    switch (scheduleValidError) {
      case "disablePast": {
        return "Please select future date and time";
      }

      case "invalidDate": {
        return "Date/Time is not valid";
      }

      case "invalidLabel": {
        return "Please enter your schedule";
      }

      default: {
        return "";
      }
    }
  }, [scheduleValidError]);

  useEffect(() => {
    refetchDepartments();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: jobFeedSchema,

    onSubmit: (values) => {
      const valuesTobeSubmited = {
        Title: values.title,
        Schedule: schedule ? dayjs(schedule).format("YYYY-MM-DD HH:mm") : null,
        Department: selectedDepartment.id,
        Location: values.location,
        Description: values.description,
        Goals: values.goals,
        ExpectedHiring: values.expectedHiring,
      };
      createJob(valuesTobeSubmited).then((x) => {
        if (x.data) {
          dispatch(setJobSaved(true));
          navigate(`../`);
        } else {
          setErrorMassege(x?.error?.data?.message);
          setErrorOpen(true);
        }
      });
    },
  });

  return (
    <>
      <ErrorPopup
        open={errorOpen}
        message={errorMassege}
        handleClose={() => {
          setErrorOpen(false);
        }}
      />
      <ThemeCard title={jobFeedTitle}>
        <Container>
          <FormWrapper
            heading=""
            action=""
            method="POST"
            id="jobFeedForm"
            onSubmit={formik.handleSubmit}
          >
            <Grid container>
              <Grid item xs={6} md={6} lg={4}>
                <TypographyField name="Title *" />
              </Grid>
              <Grid item xs={6} md={6} lg={6} marginBottom={5}>
                <InputFields
                  type="text"
                  name="title"
                  variant="filled"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.title}
                  touch={formik.touched.title ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4}>
                <TypographyField name="Schedule" />
              </Grid>
              <Grid item xs={6} md={6} lg={6} marginBottom={5}>
                <FormDateTimePicker
                  onError={(event) => setScheduleValidError(event)}
                  disablePast={true}
                  requiredError={true}
                  name="schedule"
                  value={schedule}
                  onChange={(date) => {
                    setSchedule(date);
                  }}
                  errorMessage={scheduleErrorMassege}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4}>
                <TypographyField name="Department *" />
              </Grid>
              <Grid item xs={6} md={6} lg={6} marginBottom={5}>
                <SelectField
                  type="select"
                  name="department"
                  onBlur={formik.handleBlur}
                  error={formik.errors.department}
                  touch={formik.touched.department ? true : false}
                  requiredText={false}
                  onChange={(event) => {
                    setSelectedDepartment(event.target.value);
                    formik.handleChange(event);
                  }}
                  value={selectedDepartment}
                >
                  {departments?.data?.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option.Name}
                    </MenuItem>
                  ))}
                </SelectField>
              </Grid>
              <Grid item xs={6} md={6} lg={4}>
                <TypographyField name="Location *" />
              </Grid>
              <Grid item xs={6} md={6} lg={6} marginBottom={5}>
                <InputFields
                  type="text"
                  value={formik.values.location}
                  name="location"
                  variant="filled"
                  multiline={true}
                  rows={2}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.location}
                  touch={formik.touched.location ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4}>
                <TypographyField name="Description" />
              </Grid>
              <Grid item xs={6} md={6} lg={6} marginBottom={5}>
                <InputFields
                  type="text"
                  value={formik.values.description}
                  name="description"
                  variant="filled"
                  multiline={true}
                  rows={2}
                  requiredText={false}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.description}
                  touch={formik.touched.description ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4}>
                <TypographyField name="Goals" />
              </Grid>
              <Grid item xs={6} md={6} lg={6} marginBottom={5}>
                <InputFields
                  type="text"
                  value={formik.values.goals}
                  name="goals"
                  variant="filled"
                  multiline={true}
                  rows={2}
                  requiredText={false}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.goals}
                  touch={formik.touched.goals ? true : false}
                />
              </Grid>
              <Grid item xs={6} md={6} lg={4}>
                <TypographyField name="Expected Hiring *" />
              </Grid>
              <Grid item xs={6} md={6} lg={6} marginBottom={5}>
                <InputFields
                  type="number"
                  value={formik.values.expectedHiring}
                  name="expectedHiring"
                  min={{ min: 0 }}
                  variant="filled"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.expectedHiring}
                  touch={formik.touched.expectedHiring ? true : false}
                />
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                mt={2}
                pb={2}
              >
                <Grid item xs={1} marginTop={1}>
                  <ThemePrimaryBtn
                    type="submit"
                    variant="contained"
                    size="large"
                  >
                    Submit
                  </ThemePrimaryBtn>
                </Grid>
              </Grid>
            </Grid>
          </FormWrapper>
        </Container>
      </ThemeCard>
    </>
  );
};

export default SaveJobFeed;

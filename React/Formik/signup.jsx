import React, { useEffect, useState } from "react";
import "../signup/signup.scss";
import InputField from "../../components/UI/inputField/inputField";
import FormWrapper from "../../components/UI/formWrapper/formWrapper";
import FormSubmitButton from "../../components/themeButtons/ThemePrimaryBtn";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import SelectField from "../../components/UI/selectField/selectField";
import { signupSchema } from "../../components/validations/signupValidations/signupSchema";
import { useGetOrganisationTypesQuery } from "../../store/services/organisationTypeApi";
import { useRegisterOrganisationMutation } from "../../store/services/registrationApi";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/UI/errorPopup";
import { setToken } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const initialValues = {
  Name: "",
  Type: "",
  Purpose: "",
  OwnerFirstName: "",
  OwnerLastName: "",
  Email: "",
  Password: "",
  confirmPassword: "",
  Website: "",
  Address: "",
  Pin: "",
  City: "",
  State: "",
  Country: "",
  Revenue: "",
  TotalEmployees: "",
  ExpectedHiring: "",
  CompanyGoal: "",
  BriefDescription: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const [organizationExistError, setOrganizationExistError] = useState(false);

  useEffect(() => {
    dispatch(setToken(null));
    sessionStorage.removeItem("token");
  }, []);
  const navigate = useNavigate();

  const { data } = useGetOrganisationTypesQuery();

  const [registerOrganisation] = useRegisterOrganisationMutation();

  const organisationType = data?.data.organisationType;

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMassege, setErrorMassege] = useState("");

  const [selectedOption, setSelectedOption] = React.useState("");

  const onChangeType = (event) => {
    setSelectedOption(event.target.value);
    handleChange(event);
  };

  const handleClose = () => {
    setErrorOpen(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signupSchema,

      onSubmit: (values) => {
        const registerData = {
          Name: values.Name.replaceAll(" ", "_").toString(),
          Type: values.Type.OrganisationType.toString(),
          Purpose: values.Purpose.toString(),
          OwnerFirstName: values.OwnerFirstName.toString(),
          OwnerLastName: values.OwnerLastName.toString(),
          Email: values.Email.toString(),
          Password: values.Password.toString(),
          Website: values.Website.toString(),
          Address: values.Address.toString(),
          Pin: values.Pin.toString(),
          City: values.City.toString(),
          State: values.State.toString(),
          Country: values.Country.toString(),
          Revenue: values.Revenue.toString(),
          ExpectedHiring: values.ExpectedHiring.toString(),
          CompanyGoal: values.CompanyGoal.toString(),
          BriefDescription: values.BriefDescription.toString(),
          IsActive: true.toString(),
        };
        registerOrganisation(registerData).then((x) => {
          if (x.data?.data?.Name) {
            navigate(
              `../signupSuccessful/${registerData.Name.replaceAll(" ", "_")}`
            );
          } else {
            setErrorMassege(x?.error?.data?.message);
            setErrorOpen(true);
            setOrganizationExistError(true);
          }
        });
      },
    });

  useEffect(() => {
    if (formErrors)
      if (Object.keys(formErrors).length === 0 && isSubmit) {
      }
  }, [formErrors]);

  return (
    <>
      <Container sx={{ flexGrow: 1 }}>
        <Card className="card-margin">
          <CardContent>
            <FormWrapper
              heading="Register Organization"
              action=""
              method="POST"
              id="registrationForm"
              onSubmit={handleSubmit}
              // onChange={handleOnChange}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}></Grid>

                {/* Name of organisation */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Name"
                    onChange={handleChange}
                    value={values.Name}
                    label="Organisation Name"
                    onBlur={handleBlur}
                    error={errors.Name}
                    touch={touched.Name ? true : false}
                    requiredText={true}
                  />
                  {organizationExistError && (
                    <div style={{ color: "#d32f2f" }}>
                      Organization already exists
                    </div>
                  )}
                </Grid>

                {/* type of organisation */}
                <Grid item lg={4} sm={6} xs={12}>
                  <SelectField
                    type="select"
                    name="Type"
                    onChange={onChangeType}
                    label="Organisation Type"
                    value={selectedOption}
                    // options={organisationType}
                    onBlur={handleBlur}
                    error={errors.Type}
                    touch={touched.Type ? true : false}
                    requiredText={true}
                  >
                    {organisationType?.map((option) => (
                      <MenuItem key={option.Id} value={option}>
                        {option.OrganisationType}
                      </MenuItem>
                    ))}
                  </SelectField>
                </Grid>

                {/* Purpose of organisation */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Purpose"
                    onChange={handleChange}
                    label="Organisation Purpose"
                    value={values.Purpose}
                    onBlur={handleBlur}
                    error={errors.Purpose}
                    touch={touched.Purpose ? true : false}
                    requiredText={false}
                  />
                </Grid>

                {/* Admin first name */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="OwnerFirstName"
                    onChange={handleChange}
                    label="Admin First Name"
                    value={values.OwnerFirstName}
                    onBlur={handleBlur}
                    error={errors.OwnerFirstName}
                    touch={touched.OwnerFirstName ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Admin last name */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="OwnerLastName"
                    onChange={handleChange}
                    label="Admin Last Name"
                    value={values.OwnerLastName}
                    onBlur={handleBlur}
                    error={errors.OwnerLastName}
                    touch={touched.OwnerLastName ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Email address */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Email"
                    onChange={handleChange}
                    label="Email address"
                    value={values.Email}
                    onBlur={handleBlur}
                    error={errors.Email}
                    touch={touched.Email ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Password */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="password"
                    name="Password"
                    onChange={handleChange}
                    label="Password"
                    value={values.Password}
                    onBlur={handleBlur}
                    error={errors.Password}
                    touch={touched.Password ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Confirm Password */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onBlur={handleBlur}
                    error={errors.confirmPassword}
                    touch={touched.confirmPassword ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Website */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Website"
                    onChange={handleChange}
                    label="Website"
                    value={values.Website}
                    onBlur={handleBlur}
                    error={errors.Website}
                    touch={touched.Website ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Address of organisation */}
                <Grid item lg={8} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Address"
                    onChange={handleChange}
                    label="Organisation Address"
                    value={values.Address}
                    onBlur={handleBlur}
                    error={errors.Address}
                    touch={touched.Address ? true : false}
                    // multiline={true}
                    // rows={1}
                    requiredText={true}
                  />
                </Grid>

                {/* Pin */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Pin"
                    onChange={handleChange}
                    label="Pin"
                    value={values.Pin}
                    onBlur={handleBlur}
                    error={errors.Pin}
                    touch={touched.Pin ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* City */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="City"
                    onChange={handleChange}
                    label="City"
                    value={values.City}
                    onBlur={handleBlur}
                    error={errors.City}
                    touch={touched.City ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* State */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="State"
                    onChange={handleChange}
                    label="State"
                    value={values.State}
                    onBlur={handleBlur}
                    error={errors.State}
                    touch={touched.State ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Country */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Country"
                    onChange={handleChange}
                    label="Country"
                    value={values.Country}
                    onBlur={handleBlur}
                    error={errors.Country}
                    touch={touched.Country ? true : false}
                    requiredText={true}
                  />
                </Grid>

                {/* Revenue */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="text"
                    name="Revenue"
                    onChange={handleChange}
                    label="Revenue"
                    requiredText={false}
                  />
                </Grid>

                {/* Total employees */}
                {/* <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="number"
                    name="TotalEmployees"
                    onChange={handleChange}
                    label="Total Employees"
                    requiredText={false}
                  />
                </Grid> */}

                {/* Expected hiring */}
                <Grid item lg={4} sm={6} xs={12}>
                  <InputField
                    type="number"
                    name="ExpectedHiring"
                    min={{ min: 0 }}
                    onChange={handleChange}
                    value={values.ExpectedHiring}
                    onBlur={handleBlur}
                    error={errors.ExpectedHiring}
                    touch={touched.ExpectedHiring ? true : false}
                    label="Expected Hiring"
                    requiredText={false}
                  />
                </Grid>

                {/* Company goals */}
                <Grid item lg={12} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="CompanyGoal"
                    onChange={handleChange}
                    label="Company Goals"
                    multiline={true}
                    rows={2}
                    requiredText={false}
                  />
                </Grid>

                {/* Brief description */}
                <Grid item lg={12} sm={12} xs={12}>
                  <InputField
                    type="text"
                    name="BriefDescription"
                    onChange={handleChange}
                    label="Brief Description"
                    multiline={true}
                    rows={2}
                    requiredText={false}
                  />
                </Grid>

                <Grid
                  item
                  lg={12}
                  sm={12}
                  xs={12}
                  justifyContent={"right"}
                  display={"flex"}
                >
                  <FormSubmitButton type="submit" variant="contained">
                    Submit
                  </FormSubmitButton>
                </Grid>
              </Grid>
            </FormWrapper>
          </CardContent>
        </Card>
      </Container>
      <ErrorPopup
        open={errorOpen}
        message={errorMassege}
        handleClose={handleClose}
      />
      ;
    </>
  );
};
export default Signup;

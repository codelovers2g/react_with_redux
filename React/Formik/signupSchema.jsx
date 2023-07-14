import * as Yup from "yup";

export const signupSchema = Yup.object({
  Name: Yup.string()
    .matches(
      /^(?![0-9\s]*$)[a-zA-Z0-9\s]*$/,
      "Special character is not allowed in Organisation name"
    )
    .required("Please enter name of Organisation"),

  Type: Yup.object().required("Please select type of Organisation"),

  purposeOfOrganisation: Yup.string().matches(
    /^(?![0-9\s]*$)[a-zA-Z0-9\s]*$/,
    "Purpose should be in character"
  ),

  OwnerFirstName: Yup.string()
    .matches(/^(?![0-9]*$)[a-zA-Z0-9]*$/, "First name should be in character")
    .required("Please enter First Name"),

  OwnerLastName: Yup.string()
    .matches(
      /^(?![0-9\s]*$)[a-zA-Z0-9\s]*$/,
      "Last name should be in character"
    )
    .required("Please enter Last Name"),

  Email: Yup.string()
    .email("Please enter a valid Email")
    .required("Please Enter Email"),

  Password: Yup.string()
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
    )
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Please enter Password"),

  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("Password"), null], "Password must match"),

  Website: Yup.string()
    .matches(
      // /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
      /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
      "Please enter correct Website"
    )
    .required("Please Enter website"),

  Address: Yup.string().required("Please enter organisation address"),

  Pin: Yup.string()
    .min(5)
    .max(6)
    .matches(/^[0-9]*$/, "Pin should be in number")
    .required("Please enter Pin code"),

  City: Yup.string()
    .matches(
      /^(?![0-9\s]*$)[a-zA-Z0-9\s]*$/,
      "City name should be in character"
    )
    .required("Please enter City"),

  State: Yup.string()
    .matches(
      /^(?![0-9\s]*$)[a-zA-Z0-9\s]*$/,
      "State name should be in character"
    )
    .required("Please enter state"),

  Country: Yup.string()
    .matches(
      /^(?![0-9\s]*$)[a-zA-Z0-9\s]*$/,
      "Country name should be in character"
    )
    .required("Please enter Country"),

  ExpectedHiring: Yup.string().matches(
    /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/,
    "Allow only positive number"
  ),
});

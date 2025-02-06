export const homePath = "/";
export const profilePath = "/Profile";
export const loginPath = "/login";

export const inputErrTxt = "This field is required *";

///______________________________REGEX_________________________////

export const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

// Constants.JSX
export const validString = (str) => {
  return typeof str === "string" && str.trim().length > 0;
};

export const validEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//  *********************************  //

export const CONSTANTS = {
  PROJECT_NAME: "TechJen",
  PROJECT_SUB_NAME: "Web Services",

  // Profile
  PROFILE_SLUG: "JG",
  AUTH_DATA: "authData",
  IS_LOGGED_IN: "is-logged-in",

  HR: "HR",
  ADMIN: "Admin",
  USER: "User",
};

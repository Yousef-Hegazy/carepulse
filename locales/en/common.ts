const common = {
  failed: "Action failed",
  success: "Action completed successfully",
  indexPage: {
    copyright: "{{year}} CarePulse. All rights reserved.",
    admin: "Administrator"
  },
  auth: {
    login: "Login",
    register: "Create account",
    password: "Password",
    passwordMinError: "Password must be at least 6 characters long",
    passwordUppercaseError: "Password must contain at least one uppercase letter",
    passwordLowercaseError: "Password must contain at least one lowercase letter",
    passwordNumberError: "Password must contain at least one number",
    passwordSpecialError: "Password must contain at least one special character",
    email: "Email address",
    emailRequired: "Email address is required",
    emailInvalid: "Please enter a valid email address",
    loginError: "Login failed. Please check your details and try again.",
    dontHaveAnAccount: "Don't have an account?",
    alreadyHaveAnAccount: "Do you already have an account?",
    registerError: "Account creation failed. Please check your details and try again."
  },
  patientForm: {
    title: "Hi there",
    patientSubtitle: "Book your first appointment",
    doctorSubtitle: "Manage your appointments easily",
    name: "Name",
    nameError: "Name must be at least 2 letters long",
    phone: "Phone",
    phoneError: "Phone number must be at least 6 digits long",
    submit: "Get started now",
    successMessage: "Appointment scheduled successfully!",
    errorMessage: "Appointment scheduling failed. Please try again.",
    doctorDisabledMessage: "Doctor's choice is currently unavailable.",
    patient: "Patient",
    doctor: "Doctor"
  },
  languageSwitcher: {
    label: "Language"
  },
  oauthSuccess: {
    redirectMessage: "Please wait while you are redirected...",
    errorMessage: "Failed to verify user file. Please try again."
  }
} as const;

export default common;

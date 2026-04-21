const registerPatientForm = {
  registerPatientForm: {
    steps: {
      personalInfo: {
        title: "Personal Information"
      },
      medicalInfo: {
        title: "Medical Information"
      },
      identification: {
        title: "Identity and Verification"
      }
    },
    fields: {
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      dateOfBirth: "Date of Birth",
      address: "Address",
      occupation: "Occupation",
      emergencyContactName: "Emergency Contact Name",
      emergencyContactPhone: "Emergency Contact Phone",
      gender: "Gender",
      primaryCarePhysician: "Primary Care Physician",
      insuranceProvider: "Insurance Provider",
      insurancePolicyNumber: "Insurance Policy Number",
      allergies: "Allergies",
      currentMedication: "Current Medications",
      familyMedicalHistory: "Family Medical History",
      pastMedicalHistory: "Past Medical History",
      identificationType: "Identification Type",
      identificationNumber: "Identification Number",
      scannedIdentification: "Scanned Copy of Identification",
      privacyConsent: "I acknowledge that I have reviewed and agreed to the Privacy Policy"
    },
    genderOptions: {
      male: "Male",
      female: "Female",
      other: "Other"
    },
    actions: {
      continue: "Continue",
      back: "Back",
      submit: "Submit"
    },
    validation: {
      nameRequired: "Please enter your name",
      emailRequired: "Please enter your email address",
      emailInvalid: "Please enter a valid email address",
      phoneRequired: "Please enter your phone number",
      birthDateRequired: "Please select your date of birth",
      genderRequired: "Please select your gender",
      addressRequired: "Please enter your address",
      occupationRequired: "Please enter your occupation",
      emergencyContactNameRequired: "Please enter the name of your emergency contact",
      emergencyContactPhoneRequired: "Please enter your emergency contact's phone number",
      primaryCarePhysicianRequired: "Please select your primary care physician",
      insuranceProviderRequired: "Please select your insurance provider",
      insurancePolicyNumberRequired: "Please enter your insurance policy number",
      identificationTypeRequired: "Please select your identification type",
      identificationNumberRequired: "Please enter your identification number",
      scannedIdentificationRequired: "Please upload your ID.",
      privacyConsentRequired: "You must agree to the privacy policy"
    },
    notifications: {
      incompleteForms: "Please ensure all forms are completed and data entered is correct.",
      personalInfoInvalid: "Please ensure all personal information is correct.",
      medicalInfoInvalid: "Please ensure all medical information is correct.",
      identificationInvalid: "Please verify and confirm your identity information.",
      submitSuccess: "Your information has been successfully submitted!",
      submitError: "An error occurred while submitting your information. Please try again."
    }
  }
} as const;

export default registerPatientForm;

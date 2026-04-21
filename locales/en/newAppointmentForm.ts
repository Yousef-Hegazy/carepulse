const newAppointmentForm = {
  newAppointmentForm: {
    title: "New Appointment",
    subtitle: "Book Your Appointment Now",
    fields: {
      scheduleDate: "Appointment Date",
      scheduleTime: "Appointment Time",
      primaryPhysician: "Attending Physician",
      reason: "Reason",
      notes: "Notes"
    },
    actions: {
      submit: "Submit"
    },
    validation: {
      scheduleDateRequired: "Please select an appointment date",
      scheduleTimeRequired: "Please select an appointment time",
      primaryPhysicianRequired: "Please select an attending physician",
      reasonRequired: "Please enter the reason for the appointment"
    },
    notifications: {
      invalidForm: "Please ensure all fields are completed correctly.",
      submitSuccess: "Your appointment has been scheduled successfully!",
      submitError: "An error occurred while scheduling your appointment. Please try again."
    }
  }
} as const;

export default newAppointmentForm;

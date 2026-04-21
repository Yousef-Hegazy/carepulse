const newAppointmentForm = {
  newAppointmentForm: {
    title: "موعد جديد",
    subtitle: "احجز موعدك الان",
    fields: {
      scheduleDate: "تاريخ الموعد",
      scheduleTime: "وقت الموعد",
      primaryPhysician: "الطبيب المعالج",
      reason: "السبب",
      notes: "ملاحظات"
    },
    actions: {
      submit: "إرسال"
    },
    validation: {
      scheduleDateRequired: "يرجى اختيار تاريخ الموعد",
      scheduleTimeRequired: "يرجى اختيار وقت الموعد",
      primaryPhysicianRequired: "يرجى اختيار الطبيب المعالج",
      reasonRequired: "يرجى إدخال سبب الموعد"
    },
    notifications: {
      invalidForm: "يرجى التأكد من تعبئة جميع الحقول بشكل صحيح.",
      submitSuccess: "تم جدولة موعدك بنجاح!",
      submitError: "حدث خطأ أثناء جدولة موعدك. يرجى المحاولة مرة أخرى."
    }
  }
} as const;

export default newAppointmentForm;

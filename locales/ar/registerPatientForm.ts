const registerPatientForm = {
  registerPatientForm: {
    steps: {
      personalInfo: {
        title: "المعلومات الشخصية"
      },
      medicalInfo: {
        title: "المعلومات الطبية"
      },
      identification: {
        title: "الهوية والتحقق"
      }
    },
    fields: {
      fullName: "الاسم الكامل",
      emailAddress: "عنوان البريد الإلكتروني",
      phoneNumber: "رقم الهاتف",
      dateOfBirth: "تاريخ الميلاد",
      address: "العنوان",
      occupation: "المهنة",
      emergencyContactName: "اسم جهة الاتصال في الطوارئ",
      emergencyContactPhone: "هاتف جهة الاتصال في الطوارئ",
      gender: "الجنس",
      primaryCarePhysician: "الطبيب المعالج",
      insuranceProvider: "شركة التأمين",
      insurancePolicyNumber: "رقم وثيقة التأمين",
      allergies: "الحساسية",
      currentMedication: "الأدوية الحالية",
      familyMedicalHistory: "التاريخ المرضي للعائلة",
      pastMedicalHistory: "التاريخ المرضي السابق",
      identificationType: "نوع الهوية",
      identificationNumber: "رقم الهوية",
      scannedIdentification: "نسخة ممسوحة من وثيقة الهوية",
      privacyConsent: "أقرّ بأنني راجعت سياسة الخصوصية وأوافق عليها"
    },
    genderOptions: {
      male: "ذكر",
      female: "أنثى",
      other: "آخر"
    },
    actions: {
      continue: "متابعة",
      back: "رجوع",
      submit: "إرسال"
    },
    validation: {
      nameRequired: "يرجى إدخال اسمك",
      emailRequired: "يرجى إدخال بريدك الإلكتروني",
      emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
      phoneRequired: "يرجى إدخال رقم هاتفك",
      birthDateRequired: "يرجى اختيار تاريخ الميلاد",
      genderRequired: "يرجى اختيار الجنس",
      addressRequired: "يرجى إدخال عنوانك",
      occupationRequired: "يرجى إدخال مهنتك",
      emergencyContactNameRequired: "يرجى إدخال اسم جهة الاتصال في الطوارئ",
      emergencyContactPhoneRequired: "يرجى إدخال هاتف جهة الاتصال في الطوارئ",
      primaryCarePhysicianRequired: "يرجى اختيار الطبيب المعالج",
      insuranceProviderRequired: "يرجى إدخال شركة التأمين",
      insurancePolicyNumberRequired: "يرجى إدخال رقم وثيقة التأمين",
      identificationTypeRequired: "يرجى اختيار نوع الهوية",
      identificationNumberRequired: "يرجى إدخال رقم الهوية",
      scannedIdentificationRequired: "يرجى رفع وثيقة الهوية",
      privacyConsentRequired: "يجب الموافقة على سياسة الخصوصية"
    },
    notifications: {
      incompleteForms: "يرجى التأكد من تعبئة جميع النماذج وإدخال بيانات صحيحة",
      personalInfoInvalid: "يرجى التأكد من صحة جميع المعلومات الشخصية.",
      medicalInfoInvalid: "يرجى التأكد من صحة جميع المعلومات الطبية.",
      identificationInvalid: "يرجى التأكد من صحة معلومات الهوية والتحقق.",
      submitSuccess: "تم إرسال معلوماتك بنجاح!",
      submitError: "حدث خطأ أثناء إرسال معلوماتك. يرجى المحاولة مرة أخرى."
    }
  }
} as const;

export default registerPatientForm;

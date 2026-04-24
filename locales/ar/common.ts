const common = {
  failed: "فشل الإجراء",
  success: "تم الإجراء بنجاح",
  indexPage: {
    copyright: "{{year}} كير بالس. جميع الحقوق محفوظة.",
    admin: "المسؤول",
    passkeyTitle: "التحقق من صلاحية المسؤول",
    passkeyDescription: "للوصول إلى صفحة المسؤول، يرجى إدخال مفتاح المرور.",
    passkeyError: "مفتاح المرور غير صحيح. يرجى المحاولة مرة أخرى.",
    passkeyButton: "أدخل مفتاح المرور"
  },
  auth: {
    login: "تسجيل الدخول",
    register: "إنشاء حساب",
    password: "كلمة المرور",
    passwordMinError: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
    passwordUppercaseError: "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل",
    passwordLowercaseError: "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل",
    passwordNumberError: "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل",
    passwordSpecialError: "يجب أن تحتوي كلمة المرور على حرف خاص واحد على الأقل",
    email: "البريد الإلكتروني",
    emailRequired: "البريد الإلكتروني مطلوب",
    emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    loginError: "فشل تسجيل الدخول. يرجى التحقق من بياناتك والمحاولة مرة أخرى.",
    dontHaveAnAccount: "ليس لديك حساب؟",
    alreadyHaveAnAccount: "هل لديك حساب بالفعل؟",
    registerError: "فشل إنشاء الحساب. يرجى التحقق من بياناتك والمحاولة مرة أخرى."
  },
  patientForm: {
    title: "مرحباً",
    patientSubtitle: "احجز موعدك الأول",
    doctorSubtitle: "ادارة مواعيدك بسهولة",
    name: "الاسم",
    nameError: "يجب أن يتكون الاسم من حرفين على الأقل",
    phone: "الهاتف",
    phoneError: "يجب أن يتكون رقم الهاتف من 6 أرقام على الأقل",
    submit: "ابدأ الآن",
    successMessage: "تم جدولة الموعد بنجاح!",
    errorMessage: "فشل في جدولة الموعد. يرجى المحاولة مرة أخرى.",
    doctorDisabledMessage: "خيار الطبيب غير متاح حالياً.",
    patient: "مريض",
    doctor: "طبيب"
  },
  languageSwitcher: {
    label: "اللغة"
  },
  oauthSuccess: {
    redirectMessage: "يرجى الانتظار أثناء إعادة توجيهك...",
    errorMessage: "فشل في التحقق من ملف المستخدم. يرجى المحاولة مرة أخرى."
  }
} as const;

export default common;

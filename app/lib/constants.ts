import type z from "zod";
import { zGender } from "../../generated/zod.gen";

export const IdentificationTypes = [
  {
    nameEn: "Birth Certificate",
    nameAr: "شهادة الميلاد",
  },
  {
    nameEn: "Driver's License",
    nameAr: "رخصة قيادة",
  },
  {
    nameEn: "Medical Insurance Card/Policy",
    nameAr: "بطاقة / وثيقة التأمين الطبي",
  },
  {
    nameEn: "Military ID Card",
    nameAr: "بطاقة الهوية العسكرية",
  },
  {
    nameEn: "National Identity Card",
    nameAr: "بطاقة الهوية الوطنية",
  },
  {
    nameEn: "Passport",
    nameAr: "جواز السفر",
  },
  {
    nameEn: "Resident Alien Card (Green Card)",
    nameAr: "بطاقة الإقامة (البطاقة الخضراء)",
  },
  {
    nameEn: "Social Security Card",
    nameAr: "بطاقة الضمان الاجتماعي",
  },
  {
    nameEn: "State ID Card",
    nameAr: "بطاقة هوية الولاية",
  },
  {
    nameEn: "Student ID Card",
    nameAr: "بطاقة هوية الطالب",
  },
  {
    nameEn: "Voter ID Card",
    nameAr: "بطاقة الناخب",
  },
];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    nameEn: "John Green",
    nameAr: "جون جرين",
  },
  {
    image: "/assets/images/dr-cameron.png",
    nameEn: "Leila Cameron",
    nameAr: "ليلى كاميرون",
  },
  {
    image: "/assets/images/dr-livingston.png",
    nameEn: "David Livingston",
    nameAr: "ديفيد ليفينغستون",
  },
  {
    image: "/assets/images/dr-peter.png",
    nameEn: "Evan Peter",
    nameAr: "إيفان بيتر",
  },
  {
    image: "/assets/images/dr-powell.png",
    nameEn: "Jane Powell",
    nameAr: "جاين باور",
  },
  {
    image: "/assets/images/dr-remirez.png",
    nameEn: "Alex Ramirez",
    nameAr: "أليكس راميريز",
  },
  {
    image: "/assets/images/dr-lee.png",
    nameEn: "Jasmine Lee",
    nameAr: "ياسمين لي",
  },
  {
    image: "/assets/images/dr-cruz.png",
    nameEn: "Alyana Cruz",
    nameAr: "أليانا كروز",
  },
  {
    image: "/assets/images/dr-sharma.png",
    nameEn: "Hardik Sharma",
    nameAr: "هاردك شارما",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

export const enum QUERY_KEYS {
  PROFILE = "profile",
}

export const GendersList = [
  {
    value: zGender.enum.Female,
    labelEn: zGender.enum.Female,
    labelAr: "أنثى",
  },
  {
    value: zGender.enum.Male,
    labelEn: zGender.enum.Male,
    labelAr: "ذكر",
  },
  {
    value: zGender.enum.Other,
    labelEn: zGender.enum.Other,
    labelAr: "آخر",
  },
]
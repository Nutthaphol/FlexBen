const dayjs = require("dayjs");

const HeadlthCheck = [
  {
    id: 1101,
    userId: 1,
    time: [
      {
        year: 2020,
        dateTest: dayjs(new Date(2020, 10, 11, 9, 30)),
        testResult: [
          {
            category: 1,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: "ความเข้มข้นของเลือดปกติ ไม่พบภาวะโลหิตจาง",
            result: [
              {
                section: "Hb",
                value: 15.2,
                unit: "g/dL",
              },
              {
                section: "Hct",
                value: 44.1,
                unit: "%",
              },
              {
                section: "RBC_Count",
                value: 5.07,
                unit: "mm3L",
              },
              {
                section: "RDW",
                value: 12.6,
                unit: "%",
              },
              {
                section: "RBC_Morph",
                value: "Normal",
                unit: "",
              },
              {
                section: "MCV",
                value: 87,
                unit: "fL",
              },
              {
                section: "MCH",
                value: 24,
                unit: "pg",
              },
              {
                section: "MCHC",
                value: 32.35,
                unit: "g/dL",
              },
              {
                section: "Plt_Count",
                value: 293,
                unit: "mm3",
              },
              {
                section: "MPV",
                value: 6.0,
                unit: "fL",
              },
            ],
          },
          {
            category: 2,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: "จำนวนเม็ดเลือดขาวอยู่ในเกณฑ์ปกติ",
            result: [
              {
                section: "WBC",
                value: 5000,
                unit: "mm3",
              },
              {
                section: "Netrophil",
                value: 42.5,
                unit: "%",
              },
              {
                section: "Neutrophils",
                value: 2422,
                unit: "mm3",
              },
              {
                section: "Lymphocyte",
                value: 48.9,
                unit: "%",
              },
              {
                section: "Lymphocytes",
                value: 2968,
                unit: "mm3",
              },
              {
                section: "Eosinophil",
                value: 3.1,
                unit: "%",
              },
              {
                section: "Eosinophils",
                value: 141,
                unit: "mm3",
              },
              {
                section: "Monocyte",
                value: 7.4,
                unit: "%",
              },
              {
                section: "Monocytes",
                value: 449,
                unit: "mm3",
              },
              {
                section: "Basophil",
                value: 1.1,
                unit: "%",
              },
              {
                section: "Basophils",
                value: 42,
                unit: "mm3",
              },
              {
                section: "Blast",
                value: 1,
                unit: "%",
              },
              {
                section: "Blast",
                value: 1,
                unit: "mm3",
              },
            ],
          },
          {
            category: 3,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: "ระดับน้ำตาลในเลือดปกติ",
            result: [
              {
                section: "FBS",
                value: 99,
                unit: "mg/dL",
              },
            ],
          },
          {
            category: 4,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: "ผลการทำงานของไตปกติ",
            result: [
              {
                section: "BUN",
                value: 11,
                unit: "mg/dL",
              },
              {
                section: "Creatinine",
                value: 0.87,
                unit: "",
              },
            ],
          },
          {
            category: 5,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: "ผลการตรวจเอ็นไซม์การทำงานของตับอยู่ใรเกณฑ์ปกติ",
            result: [
              {
                section: "SGOT",
                value: 41,
                unit: "U/L",
              },
              {
                section: "SGPT",
                value: 29,
                unit: "U/L",
              },
              {
                section: "Alk_Phosphatase",
                value: "NA",
                unit: "",
              },
            ],
          },
          {
            category: 6,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: "ผลการตรวจเอ็นไซม์การทำงานของตับอยู่ใรเกณฑ์ปกติ",
            result: [
              {
                section: "Cholesterol",
                value: 201,
                unit: "mg/dL",
              },
              {
                section: "Triglyceride",
                value: 69,
                unit: "mg/dL",
              },
              {
                section: "HDL_Cholesterol",
                value: 76,
                unit: "mg/dL",
              },
              {
                section: "LDL_Cholesterol",
                value: 111,
                unit: "mg/dL",
              },
            ],
          },
          {
            category: 7,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: "ผลการตรวจปัสสาวะอยู่ในเกณฑ์ปกติ",
            result: [
              {
                section: "Color",
                value: "Yellow",
                unit: "",
              },
              {
                section: "Apperance",
                value: "Clear",
                unit: "",
              },
              {
                section: "Sp_Gr",
                value: 1.02,
                unit: "",
              },
              {
                section: "pH",
                value: 7,
                unit: "",
              },
              {
                section: "WBC",
                value: "0-1",
                unit: "",
              },
              {
                section: "RBC",
                value: "0-1",
                unit: "",
              },
              {
                section: "Ertthrocytes",
                value: "Negative",
                unit: "",
              },
              {
                section: "Glucose",
                value: "Negative",
                unit: "",
              },
              {
                section: "Protein",
                value: "Negative",
                unit: "",
              },
              {
                section: "Ketone",
                value: "Negative",
                unit: "",
              },
              {
                section: "Bilirubin",
                value: "Negative",
                unit: "",
              },
              {
                section: "Squa_Epi",
                value: "0-1",
                unit: "",
              },
            ],
          },
          {
            category: 8,
            doctor: "ดร.โทนี่ ช็อปเปอร์",
            resultText: " ไม่พบสารเสพติด",
            result: [
              {
                section: "Amphetamine",
                value: "Negative",
                unit: "",
              },
            ],
          },
        ],
      },
    ],
  },
];

module.exports = HeadlthCheck;

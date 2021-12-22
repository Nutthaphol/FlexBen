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
            Hb: 15.2,
            Hct: 44.1,
            RBC_Count: 5.07,
            RDW: 12.6,
            RBC_Morph: "Normal",
            MCV: 87,
            MCH: 24,
            MCHC: 32.35,
            Plt_Count: 293,
            MPV: 6.0,
          },
          {
            category: 2,
            WBC: 5000,
            Netrophil: 42.5,
            Neutrophils: 2422,
            Lymphocyte: 48.9,
            Lymphocytes: 2968,
            Eosinophil: 3.1,
            Eosinophils: 141,
            Monocyte: 7.4,
            Monocytes: 449,
            Basophil: 1.1,
            Basophils: 42,
            Blast: 1,
            Blast_Num: 1,
          },
          {
            category: 3,
            FBS: 99,
          },
          {
            category: 4,
            BUN: 11,
            Creatinine: 0.87,
          },
          {
            category: 5,
            SGOT: 41,
            SGPT: 29,
            Alk_Phosphatase: "NA",
          },
          {
            category: 6,
            Cholesterol: 201,
            Triglyceride: 69,
            HDL_Cholesterol: 76,
            LDL_Cholesterol: 111,
          },
          {
            category: 7,
            Color: "Yellow",
            Apperance: "Clear",
            Sp_Gr: 1.02,
            pH: 7,
            WBC: "0-1",
            RBC: "0-1",
            Ertthrocytes: "Negative",
            Glucose: "Negative",
            Protein: "Negative",
            Ketone: "Negative",
            Bilirubin: "Negative",
            Squa_Epi: "0-1",
          },
          {
            category: 8,
            Amphetamine: "Negative",
          },
        ],
      },
    ],
  },
];

module.exports = HeadlthCheck;

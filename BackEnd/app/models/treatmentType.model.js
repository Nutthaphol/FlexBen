const TreatmentType = [
  {
    type: 1,
    name: "OPD",
    fullName: "OUT-PATIENT-DEPARTMENT",
  },
  {
    type: 2,
    name: "IPD",
    fullName: "IN-PATIENT-DEPARTMENT",
    subtitle: [
      {
        id: 1,
        detail: "ค่ารักษาแบบค้างคืน",
      },
      {
        id: 2,
        detail: "ค่าห้อง + ค่าอาหาร",
      },
      {
        id: 3,
        detail: "ค่าห้อง ICU",
      },
      {
        id: 4,
        detail: "ค่าบำบัดโรค",
      },
      {
        id: 5,
        detail: "ค่าศัลยกรรม",
      },
    ],
  },
  {
    type: 3,
    name: "dental",
    fullName: "DENTAL",
  },
];

module.exports = TreatmentType;

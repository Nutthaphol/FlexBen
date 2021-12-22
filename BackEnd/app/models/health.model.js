const dayjs = require("dayjs");

const HealthData = [
  {
    id: 1001,
    userId: 1,
    birthDate: dayjs(new Date(1995, 10, 1)),
    healthStatus: {
      family: ["พ่อแม่เป็นความดัน"],
      myself: ["-"],
    },
    treatment: [
      {
        id: 1,
        type: 1,
        right: "employee",
        date: dayjs(new Date(2021, 11, 2)),
        section: "ปวดกล้ามเนื้อ",
        expenss: 1500,
        note: "",
      },
      {
        id: 2,
        type: 1,
        right: "family",
        date: dayjs(new Date(2021, 11, 15)),
        section: "ปวดกล้ามเนื้อ",
        expenss: 1500,
        note: "",
      },
      {
        id: 3,
        type: 2,
        right: "family",
        dateStart: dayjs(new Date(2021, 12, 1)),
        dateEnd: dayjs(new Date(2021, 12, 5)),
        section: "COVID - 19",
        expenss: 10000,
        note: "",
      },
      {
        id: 4,
        type: 3,
        right: "employee",
        date: dayjs(new Date(2021, 11, 30)),
        section: "ถอนฟันครุด 2 ซี่",
        expenss: 10000,
        note: "",
      },
    ],
    exercise: [
      {
        date: dayjs(new Date(2021, 12)),
        weight: 64,
        height: 172,
        time: 34,
      },
    ],
  },
];

module.exports = HealthData;

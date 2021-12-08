const dayjs = require("dayjs");

const History = [
  {
    id: 1,
    userId: 1,
    list: [
      {
        id: 2001,
        type: "LifeStyle",
        number: 1,
        date: dayjs(new Date(2021, 10, 12, 10, 12)),
      },
      {
        id: 2006,
        type: "LifeStyle",
        number: 2,
        date: dayjs(new Date(2021, 10, 5, 10, 12)),
      },
      {
        id: 3001,
        type: "Travel",
        number: 1,
        date: dayjs(new Date(2021, 10, 2, 10, 12)),
      },
      {
        id: 1001,
        type: "Insurance",
        number: 1,
        date: dayjs(new Date(2021, 9, 25, 10, 12)),
      },
      {
        id: 1002,
        type: "Insurance",
        number: 1,
        date: dayjs(new Date(2021, 9, 24, 10, 12)),
      },
    ],
  },
];

module.exports = History;

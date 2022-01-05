const dayjs = require("dayjs");

const Notification = [
  {
    sender: 30,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2022, 0, 4, 11, 50)),
    section: "ซ้อมอัคคีภัย",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: true,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: false,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: false,
      },
    ],
  },
  {
    sender: 29,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2021, 11, 10, 11, 50)),
    section: "ซ้อมกินจุ",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: false,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: true,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: false,
      },
    ],
  },
  {
    sender: 28,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2021, 11, 10, 11, 50)),
    section: "ซ้อมว่ายน้ำ",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: false,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: true,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: false,
      },
    ],
  },
  {
    sender: 27,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2021, 11, 10, 11, 50)),
    section: "กวาดออฟฟิต",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: false,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: false,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: true,
      },
    ],
  },
  {
    sender: 26,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2021, 11, 10, 11, 50)),
    section: "ถูพื้น",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: false,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: false,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: true,
      },
    ],
  },
  {
    sender: 25,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2021, 11, 10, 11, 50)),
    section: "ไปกินข้าว",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: false,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: false,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: true,
      },
    ],
  },
  {
    sender: 25,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2021, 11, 10, 11, 50)),
    section: "ไปกินข้าว",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: false,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: false,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: true,
      },
    ],
  },
  {
    sender: 25,
    to: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    date: dayjs(new Date(2021, 11, 10, 11, 50)),
    section: "ไปกินข้าว",
    detail: "ไม่มีอะไรสำคัญ นี่เป็นรายละเอียดสำหรับทดสอบ",
    class: [
      {
        name: "สำคัญมาก",
        color: "red",
        use: false,
      },
      {
        name: "ทั่วไป",
        color: "orange",
        use: false,
      },
      {
        name: "ไม่สำคัญ",
        color: "green",
        use: true,
      },
    ],
  },
];

module.exports = Notification;

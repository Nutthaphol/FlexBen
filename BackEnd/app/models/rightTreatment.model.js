const rightTreatment = [
  {
    id: 1201,
    userid: 1,
    right: [
      {
        type: 1,
        employee: [
          {
            detail: "การรักษาแบบไม่ค้างคืน",
            category: "OPD",
            maxCost: 1200,
            unit: "บาท/ครั้ง",
            quantity: 30,
          },
        ],
        family: [
          {
            detail: "การรักษาแบบไม่ค้างคืน",
            category: "OPD",
            maxCost: 900,
            unit: "บาท/ครั้ง",
            quantity: 15,
          },
        ],
      },
      {
        type: 2,
        employee: [
          {
            detail: "ค่ารักษาแบบค้างคืน",
            category: "IPD",
            type: 1,
            maxCost: 500000,
            unit: "บาท/ปี",
            quantity: "-",
          },
          {
            detail: "ค่าห้อง + ค่าอาหาร",
            category: "IPD",
            type: 2,
            maxCost: 2500,
            unit: "บาท/วัน",
            quantity: "-",
          },
          {
            detail: "ค่าห้อง ICU",
            category: "IPD",
            type: 3,
            maxCost: 5000,
            unit: "บาท/วัน",
            quantity: "-",
          },
          {
            detail: "ค่าบำบัดโรค",
            category: "IPD",
            type: 4,
            maxCost: "เบิกตามจริง",
            unit: "-",
            quantity: "-",
          },
          {
            detail: "ค่าศัลยกรรม",
            category: "IPD",
            type: 5,
            maxCost: "เบิกตามจริง",
            unit: "-",
            quantity: "-",
          },
        ],
        family: [
          {
            detail: "ค่ารักษาแบบค้างคืน",
            category: "IPD",
            type: 1,
            maxCost: 100000,
            unit: "บาท/ปี",
            quantity: "-",
          },
          {
            detail: "ค่าห้อง + ค่าอาหาร",
            category: "IPD",
            type: 2,
            maxCost: 1500,
            unit: "บาท/ปี",
            quantity: "-",
          },
          {
            detail: "ค่าห้อง ICU",
            category: "IPD",
            type: 3,
            maxCost: 3500,
            unit: "บาท/ปี",
            quantity: "-",
          },
          {
            detail: "ค่าบำบัดโรค",
            category: "IPD",
            type: 4,
            maxCost: "เบิกตามจริง",
            unit: "บาท/ปี",
            quantity: "-",
          },
          {
            detail: "ค่าศัลยกรรม",
            category: "IPD",
            type: 5,
            maxCost: "เบิกตามจริง",
            unit: "บาท/ปี",
            quantity: "-",
          },
        ],
      },
      {
        type: 3,
        employee: [
          {
            detail: "ค่ารักษาทันตกรรม",
            category: "OPD",
            maxCost: 10000,
            unit: "บาท/ครั้ง",
            quantity: 3,
          },
        ],
        family: [
          {
            detail: "ค่ารักษาทันตกรรม",
            category: "OPD",
            maxCost: 6000,
            unit: "บาท/ครั้ง",
            quantity: 2,
          },
        ],
      },
    ],
  },
];

module.exports = rightTreatment;

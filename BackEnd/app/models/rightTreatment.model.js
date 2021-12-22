const rightTreatment = [
  {
    id: 1201,
    userid: 1,
    right: [
      {
        type: 1,
        employee: {
          maxCost: 1200,
          quantity: 30,
        },
        family: {
          maxCost: 1200,
          quantity: 15,
        },
      },
      {
        type: 2,
        employee: [
          {
            detail: "ค่ารักษาแบบค้างคืน",
            maxCost: 500000,
          },
          {
            detail: "ค่าห้อง + ค่าอาหาร",
            maxCost: 2500,
          },
          {
            detail: "ค่าห้อง ICU",
            maxCost: 5000,
          },
          {
            detail: "ค่าบำบัดโรค",
            maxCost: "เบิกตามจริง",
          },
          {
            detail: "ค่าศัลยกรรม",
            maxCost: "เบิกตามจริง",
          },
        ],
        family: [
          {
            detail: "ค่ารักษาแบบค้างคืน",
            maxCost: 100000,
          },
          {
            detail: "ค่าห้อง + ค่าอาหาร",
            maxCost: 1500,
          },
          {
            detail: "ค่าห้อง ICU",
            maxCost: 3500,
          },
          {
            detail: "ค่าบำบัดโรค",
            maxCost: "เบิกตามจริง",
          },
          {
            detail: "ค่าศัลยกรรม",
            maxCost: "เบิกตามจริง",
          },
        ],
      },
      {
        type: 3,
        employee: {
          maxCost: 10000,
          quantity: 3,
        },
        family: {
          maxCost: 6000,
          quantity: 2,
        },
      },
    ],
  },
];

module.exports = rightTreatment;

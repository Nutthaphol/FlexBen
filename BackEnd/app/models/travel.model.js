const Travel = [
  {
    id: 3001,
    name: "Sri Panwa",
    detail:
      "ศรีพันวา ภูเก็ต วิลล่าตากอากาศชื่อดังที่ตั้งอยู่ปลายแหลมพันวาของเกาะภูเก็ต เป็นหนึ่งในรีสอร์ทที่เห็นผ่านตาบ่อยๆจากคนที่ไปพักและลงรูปผ่าน Instagram โดยเฉพาะสระว่ายน้ำ Infinity Edge Pool ของวิลล่าแต่ละหลังกับวิวบรรยากาศของทะเลอันดามัน ที่โคตรคูลล",
    category: 2,
    facilities: [1, 2, 3, 4],
    location: {
      houseNO: "88",
      road: "ศักดิเดช",
      subDistrict: "วิชิต",
      district: "เมือง",
      province: "ภูเก็ต",
      code: "83000",
      country: "ไทย",
    },
    nearby: ["-"],
    price: 1000,
    discount: 0,
    netPrice: 1000,
    type: "travel",
    image: [
      "/travel/SriPanwa1.png",
      "/travel/SriPanwa2.png",
      "/travel/SriPanwa3.png",
    ],
    count: 10000,
  },

  // {
  //   id: 3001,
  //   name: "Sri Panwa, Phuket",
  //   type: "Travel",
  //   category: 2,
  //   highLights: "หรูสุดในภูเก็ต",
  //   description:
  //     "ศรีพันวา ภูเก็ต วิลล่าตากอากาศชื่อดังที่ตั้งอยู่ปลายแหลมพันวาของเกาะภูเก็ต เป็นหนึ่งในรีสอร์ทที่เห็นผ่านตาบ่อยๆจากคนที่ไปพักและลงรูปผ่าน Instagram โดยเฉพาะสระว่ายน้ำ Infinity Edge Pool ของวิลล่าแต่ละหลังกับวิวบรรยากาศของทะเลอันดามัน ที่โคตรคูลล",
  //   rating: 4.9,
  //   price: 7000,
  //   count: 1000,
  //   image: "/travel/sri.png",
  // },
  // {
  //   id: 3002,
  //   name: "Four Seasons Resort Chiang Mai",
  //   type: "Travel",
  //   category: 2,
  //   highLights: "หรูแบบไทยๆ สไตล์เชียงใหม่",
  //   description:
  //     "โฟร์ซีซั่น เชียงใหม่ ตั้งอยู่ที่แม่ริม ที่ล้อมรอบด้วยทุ่งนา ทะเลสาปและภูเขาอันเขียวขจี คือแกจะฟินกับความธรรมชาติล้อมรอบตัวกับรีสอร์ทอันหรูหราแบบล้านนาสไตล์ ที่หาไม่ได้ในรีสอร์ทอื่นๆในเชียงใหม่เลยทีเดียวล่ะ",
  //   rating: 4.7,
  //   price: 6000,
  //   count: 200,
  //   image: "/travel/fsr.png",
  // },
  // {
  //   id: 3003,
  //   name: "Mandarin Oriental Bangkok",
  //   type: "Travel",
  //   category: 1,
  //   highLights: "หรูแบบ Mandarin",
  //   description:
  //     "แมนดาริน โอเรียนเต็ล กรุงเทพ ขอยกให้เป็นโรงแรมระดับโลกอันดับหนึ่งในกรุงเทพเลย ไม่น่าเชื่อว่าโรงแรมแห่งนี้มีอายุมากกว่า 140 ปีแล้ว ถือเป็นโรงแรมระดับหรูหราแห่งแรกในเมืองไทยก็ว่าได้ คือไม่มีอะไรบรรยายกับที่นี่ เพราะที่นี่คือที่สุดของการบริการระดับเวิลด์คลาสแล้ววว",
  //   rating: 4.7,
  //   price: 7000,
  //   count: 1000,
  //   image: "/travel/mob.png",
  // },
  // {
  //   id: 3004,
  //   name: "Keemala Hotel, Phuket",
  //   type: "Travel",
  //   category: 2,
  //   highLights: "ธรรมชาติจัดๆ ",
  //   description:
  //     "กีมาลา ภูเก็ต ที่พักวิลล่าสุดอลังการที่จำลองคล้ายเหมือนอยู่ในหนังโลกอวาตาร ซึ่งคอนเซ็ปดีไซน์ได้รับแรงบันดาลใจมาจากสี่เผ่าท้องถิ่นในภูเก็ต ตั้งอยู่แถวหาดกมลา อันนี้นั่งยันนอนยัน ว่ายังไงก็ต้องไปซักครั้งในชีวิตเลยทีเดียว",
  //   rating: 4.3,
  //   price: 7000,
  //   count: 1000,
  //   image: "/travel/kr.png",
  // },
  // {
  //   id: 3005,
  //   name: "The Okura Prestige Bangkok",
  //   type: "Travel",
  //   category: 1,
  //   highLights: "ว้าวๆๆๆ ",
  //   description:
  //     "โรงแรมหรูในไทยแห่งนี้เป็นโรงแรมสไตล์ญี่ปุ่น ตั้งอยู่บนถนนวิทยุในย่านที่พักอาศัยหรูหราหมาเห่าที่สุดในกรุงเทพฯ คอนเซ็ปต์ของโรงแรมโอกุระเป็นการผสมผสานวัฒนธรรมของญี่ปุ่นและไทยเข้าด้วยกัน ทำให้แขกได้รู้สึกถึงความลงตัว ความโล่งสบาย และความเรียบหรูสไตล์เอเชีย",
  //   rating: 3,
  //   price: 4000,
  //   count: 1000,
  //   image: "/travel/top.png",
  // },
];

module.exports = Travel;

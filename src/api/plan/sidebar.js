const children1 = [
  {key: "/lcl", title: "国内零担运输"}
];

const children2 = [
  {key: "/1", title: "跨境租柜出口运输"},
  {key: "/2", title: "跨境吨车出口运输"},
  {key: "/3", title: "中港柜车进口运输"},
  {key: "/4", title: "跨境吨车出口运输"},
  {key: "/5", title: "跨境吨车出口运输"},
  {key: "/6", title: "跨境吨车出口运输"},
  {key: "/7", title: "跨境吨车出口运输"},
  {key: "/8", title: "跨境吨车出口运输"},
  {key: "/9", title: "跨境吨车出口运输"},
  {key: "/10", title: "跨境吨车出口运输"}
];

let items = [
  {key: "/transport/ch", title: "国内运输", icon: '/default.png', isFolder: true, children: children1},
  {key: "/transport/hk", title: "中港运输", icon: '/default.png', isFolder: true, children: children2}
];

export default items;

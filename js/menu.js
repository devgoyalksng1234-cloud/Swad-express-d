// SWAAD EXPRESS MENU DATA
// One line per dish. Fields: id, category, name, emoji (stands in for the photo), price.
// RULE 1: every price is text that starts with the rupee sign, for example "₹249".
// (CR1 later adds one more field to every dish: veg: true or veg: false.)
const MENU = [
  { id: 1,  category: "Thali",    name: "Indori Veg Thali",      emoji: "🍛", price: "₹249", veg: true  },
  { id: 2,  category: "Thali",    name: "Maharaja Thali",        emoji: "🍽️", price: "₹349", veg: true  },
  { id: 3,  category: "Thali",    name: "Kadhai Paneer Thali",   emoji: "🍛", price: "₹279", veg: true  },
  { id: 4,  category: "Biryani",  name: "Chicken Biryani",       emoji: "🍚", price: "₹329", veg: false },
  { id: 5,  category: "Biryani",  name: "Veg Dum Biryani",       emoji: "🍚", price: "₹279", veg: true  },
  { id: 6,  category: "Biryani",  name: "Mutton Biryani",        emoji: "🍖", price: "₹429", veg: false },
  { id: 7,  category: "Snacks",   name: "Poha Jalebi Combo",     emoji: "🥣", price: "₹99",  veg: true  },
  { id: 8,  category: "Snacks",   name: "Samosa (2 pcs)",        emoji: "🥟", price: "₹60",  veg: true  },
  { id: 9,  category: "Snacks",   name: "Chicken Seekh Kebab",   emoji: "🍢", price: "₹259", veg: false },
  { id: 10, category: "Snacks",   name: "Paneer Tikka",          emoji: "🧀", price: "₹229", veg: true  },
  { id: 11, category: "Sweets & Drinks", name: "Gulab Jamun (2 pcs)", emoji: "🍮", price: "₹80", veg: true },
  { id: 12, category: "Sweets & Drinks", name: "Masala Chaas",   emoji: "🥛", price: "₹50",  veg: true  },
  { id: 13, category: "Thali",    name: "Dal Bati Churma",       emoji: "🍛", price: "₹299", veg: true  }
];

if (typeof module !== "undefined") module.exports = MENU;

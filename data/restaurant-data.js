/**
 * XEWALI - Panchalii | Centralized Application Data
 * Fictional demo data for GitHub portfolio architecture.
 */

const RestaurantConfig = {
    name: "XEWALI",
    location: "Pabhoi Panchalii, Biswanath Chariali, Assam",
    taxRate: 0.05,
    currency: "₹",
    openingHours: { lunch: "11:00", lunchEnd: "15:30", dinner: "17:00", dinnerEnd: "22:00" },
    socials: { fb: "#", ig: "#", tw: "#" }
};

// Exhaustive 50+ item menu demonstrating diverse Indian categorization and Assamese authenticity
const MenuData = [
    // 1. Signature Assamese (Authentic representations[span_14](start_span)[span_14](end_span))
    { id: 1, name: "Masor Tenga", cat: "Assamese", reg: "Assam", desc: "Traditional sour fish curry prepared with tomatoes and elephant apple (Ou Tenga). Light, tangy, and deeply comforting.", price: 280, veg: false, spice: 1, pop: true, img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8dd?auto=format&fit=crop&w=400&q=80" },
    { id: 2, name: "Gahori Banhgaj", cat: "Assamese", reg: "Assam", desc: "Prime cuts of pork slow-cooked with pungent fermented bamboo shoot and indigenous spices.", price: 320, veg: false, spice: 3, pop: true, img: "https://images.unsplash.com/photo-1627308595229-7830f5c90683?auto=format&fit=crop&w=400&q=80" },
    { id: 3, name: "Omita Khar", cat: "Assamese", reg: "Assam", desc: "A classic palate cleanser made from raw papaya and alkaline water filtered through sun-dried banana peels.", price: 150, veg: true, spice: 0, pop: false, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80" },
    { id: 4, name: "Haah Kumura", cat: "Assamese", reg: "Assam", desc: "Rich duck meat traditionally braised with ash gourd and crushed whole black pepper.", price: 450, veg: false, spice: 2, pop: true, img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" },
    { id: 5, name: "Xewali Teeta Bhaat", cat: "Assamese", reg: "Assam", desc: "A delicacy of pre-cooked rice lightly fried with medicinal night-flowering jasmine (Xewali) for a subtle bitter note.", price: 180, veg: true, spice: 0, pop: false, [span_7](start_span)[span_7](end_span)img: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=400&q=80" },
    { id: 6, name: "Mati Mahor Dali", cat: "Assamese", reg: "Assam", desc: "Earthy black lentil dal, slow-cooked and tempered generously with ginger and mustard oil.", price: 160, veg: true, spice: 1, pop: false, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=400&q=80" },
    { id: 7, name: "Aloo Pitika", cat: "Assamese", reg: "Assam", desc: "Mashed potatoes blended with raw mustard oil, chopped onions, green chilies, and fresh coriander.", price: 90, veg: true, spice: 2, pop: false, img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=400&q=80" },
    
    // 2. North-East India
    { id: 8, name: "Pork Momos", cat: "North-East", reg: "North-East", desc: "Hand-pleated steamed dumplings filled with seasoned minced pork. Served with a fiery chili dip.", price: 190, veg: false, spice: 2, pop: true, img: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80" },
    { id: 9, name: "Chicken Thukpa", cat: "North-East", reg: "North-East", desc: "Hearty Tibetan-style noodle soup with shredded chicken, winter greens, and a clear bone broth.", price: 220, veg: false, spice: 2, pop: false, img: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=400&q=80" },
    { id: 10, name: "Smoked Pork Salad", cat: "North-East", reg: "Nagaland", desc: "Smoked pork tossed with local herbs, tomatoes, and potent king chili.", price: 340, veg: false, spice: 4, pop: false, img: "https://images.unsplash.com/photo-1627308595229-7830f5c90683?auto=format&fit=crop&w=400&q=80" },

    // 3. North Indian
    { id: 11, name: "Murgh Makhani", cat: "North India", reg: "North India", desc: "Authentic butter chicken. Roasted chicken simmered in a velvety tomato and fenugreek gravy.", price: 380, veg: false, spice: 1, pop: true, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=80" },
    { id: 12, name: "Dal Makhani", cat: "North India", reg: "North India", desc: "Whole black lentils slow-cooked overnight over charcoal, finished with cream and white butter.", price: 260, veg: true, spice: 1, pop: true, img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80" },
    { id: 13, name: "Chole Bhature", cat: "North India", reg: "North India", desc: "Spicy, tart chickpea curry served alongside two fluffy, deep-fried breads.", price: 220, veg: true, spice: 2, pop: false, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80" },
    { id: 14, name: "Paneer Tikka Masala", cat: "North India", reg: "North India", desc: "Charcoal-grilled cottage cheese cubes in a spiced, robust onion-tomato gravy.", price: 310, veg: true, spice: 2, pop: true, img: "https://images.unsplash.com/photo-1599487405270-8e12eb200fac?auto=format&fit=crop&w=400&q=80" },
    { id: 15, name: "Tandoori Chicken (Half)", cat: "North India", reg: "North India", desc: "Classic clay-oven roasted chicken marinated in yogurt and traditional ground spices.", price: 350, veg: false, spice: 3, pop: true, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80" },

    // 4. South Indian
    { id: 16, name: "Ghee Roast Masala Dosa", cat: "South India", reg: "South India", desc: "Crispy fermented rice and lentil crepe, roasted in pure ghee, filled with spiced potato mash.", price: 180, veg: true, spice: 1, pop: true, img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=400&q=80" },
    { id: 17, name: "Hyderabadi Dum Biryani", cat: "South India", reg: "Andhra/Telangana", desc: "Aromatic basmati rice layered with marinated chicken, saffron, and fried onions, cooked on dum.", price: 360, veg: false, spice: 3, pop: true, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80" },
    { id: 18, name: "Idli Sambar", cat: "South India", reg: "South India", desc: "Soft, steamed rice cakes served with a tangy lentil and vegetable stew.", price: 120, veg: true, spice: 2, pop: false, img: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=400&q=80" },
    { id: 19, name: "Chicken Chettinad", cat: "South India", reg: "Tamil Nadu", desc: "A fiery, aromatic curry made with roasted coriander seeds, red chilies, and fresh coconut.", price: 370, veg: false, spice: 4, pop: false, img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80" },

    // 5. West & East Indian
    { id: 20, name: "Mumbai Vada Pav", cat: "West India", reg: "Maharashtra", desc: "The iconic street snack. Spiced potato dumpling battered and fried, served inside a soft bun with garlic chutney.", price: 90, veg: true, spice: 3, pop: false, img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80" },
    { id: 21, name: "Pav Bhaji", cat: "West India", reg: "Maharashtra", desc: "A thick, heavily spiced mashed vegetable curry served with butter-soaked bread rolls.", price: 170, veg: true, spice: 2, pop: true, img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=400&q=80" },
    { id: 22, name: "Luchi Aloo Dum", cat: "East India", reg: "Bengal", desc: "Deep-fried refined flour flatbreads served alongside a robust, mildly sweet and spicy potato curry.", price: 160, veg: true, spice: 2, pop: true, img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80" },
    { id: 23, name: "Kosha Mangsho", cat: "East India", reg: "Bengal", desc: "Intensely flavorful, slow-cooked dry mutton curry with dark roasted spices.", price: 440, veg: false, spice: 3, pop: true, img: "https://images.unsplash.com/photo-1544025162-87208d132338?auto=format&fit=crop&w=400&q=80" },

    // 6. Continental, Pizza, Burger & Kids
    { id: 24, name: "Classic Margherita", cat: "Continental", reg: "Modern", desc: "Thin crust pizza topped with San Marzano tomato sauce, fresh mozzarella, and basil leaves.", price: 320, veg: true, spice: 0, pop: true, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=80" },
    { id: 25, name: "Penne Arrabbiata", cat: "Continental", reg: "Modern", desc: "Al dente penne pasta tossed in a spicy, garlic-infused tomato basil sauce.", price: 290, veg: true, spice: 2, pop: false, img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=400&q=80" },
    { id: 26, name: "Crispy Chicken Burger", cat: "Continental", reg: "Modern", desc: "Panko-crusted chicken breast, crisp lettuce, jalapeños, and house mayo in a toasted brioche bun.", price: 240, veg: false, spice: 1, pop: true, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80" },
    { id: 27, name: "Kids Mac & Cheese", cat: "Kids", reg: "Modern", desc: "Simple, creamy, and mild macaroni baked with a blend of three cheeses.", price: 180, veg: true, spice: 0, pop: false, img: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=400&q=80" },
    { id: 28, name: "French Fries", cat: "Snacks", reg: "Modern", desc: "Crispy, double-fried potato batons, salted and served with ketchup.", price: 120, veg: true, spice: 0, pop: true, img: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=400&q=80" },

    // 7. Desserts
    { id: 29, name: "Assamese Payox", cat: "Desserts", reg: "Assam", desc: "Traditional rice pudding simmered in thick milk, flavored with bay leaf and cardamom.", price: 130, veg: true, spice: 0, pop: true, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80" },
    { id: 30, name: "Hot Gulab Jamun", cat: "Desserts", reg: "North India", desc: "Two deep-fried milk solid dumplings soaked in a warm, rose-scented sugar syrup.", price: 110, veg: true, spice: 0, pop: true, img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80" },
    { id: 31, name: "Sizzling Brownie", cat: "Desserts", reg: "Continental", desc: "Warm walnut brownie served on a hot sizzler plate with vanilla ice cream and molten chocolate.", price: 220, veg: true, spice: 0, pop: true, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80" }
];

const EventData = [
    { title: "Assamese Food Evening", date: "Every Friday", desc: "A curated 7-course traditional Assamese thali experience featuring live folk instrumental music." },
    { title: "Bihu Celebration Feast", date: "April 14 - 16", desc: "Special festive menu featuring Pitha, Laru, and an array of celebratory heritage dishes." },
    { title: "Regional Biryani Festival", date: "Last Weekend of Month", desc: "Explore 5 distinct styles of Indian Biryani, from Lucknow to Hyderabad to Kolkata." },
    { title: "Acoustic Sundays", date: "Every Sunday, 7 PM", desc: "Unwind in our green outdoor seating with live acoustic performances and specialized mocktails." }
];

const OfferData = [
    { title: "Student Comfort Deal", desc: "Show your college ID between 2 PM - 5 PM for a 15% discount on all Continental items and snacks." },
    { title: "Family Table Package", desc: "Pre-book a table for 5+ guests and receive complementary Assamese Payox for the entire table." }
];

const ReviewData = [
    { name: "Ananya B.", type: "Local Professional", rating: 5, text: "The Masor Tenga transported me straight to my grandmother's kitchen. The balance of tanginess was perfect. Beautiful, peaceful ambiance!" },
    { name: "Rahul S.", type: "Tourist", rating: 5, text: "We visited Assam for the first time and stopped at Xewali. The integration of nature into the dining space is breathtaking. The Pork Bamboo Shoot is a must-try." },
    { name: "Megha T.", type: "Student", rating: 4, text: "Great place to hang out. The pizza and burgers are surprisingly good for a place that focuses on traditional food. Very affordable." },
    { name: "Dr. Sharma", type: "Family Visitor", rating: 5, text: "Hosted my parents' anniversary here. The staff was incredibly hospitable, and the pan-Indian menu ensured everyone had exactly what they wanted." }
];

const FAQData = [
    { q: "Where is Xewali located?", a: "We are located in Pabhoi Panchalii, Biswanath Chariali, Assam. We are easily accessible from the main highway." },
    { q: "Do you serve authentic Assamese food?", a: "Yes, preserving Assamese culinary heritage is our core philosophy. We use traditional techniques, including Khar preparation and endemic ingredients." },
    { q: "Do you have vegetarian options?", a: "Absolutely. Almost half our menu is dedicated to vegetarian dishes spanning North Indian, South Indian, and Continental cuisines." },
    { q: "Can I book a private event?", a: "Yes, we host birthdays, corporate gatherings, and cultural events. Please use our Private Booking inquiry form to get in touch." },
    { q: "Are the online prices final?", a: "Please note that this website is a portfolio demo. All prices and menu items are fictional representations." }
];

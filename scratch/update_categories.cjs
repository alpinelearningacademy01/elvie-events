const fs = require('fs');
const path = require('path');

const replacements = {
  'Onboarding Gifts': 'Employee Welcome Kits',
  'Corporate Plants': 'Business Green Plants',
  'Corporate Flowers': 'Floral Arrangements for Businesses',
  'Cupcakes for Corporate Events': 'Event Cupcake Treats',
  'Corporate Cakes': 'Celebration Cakes for Offices',
  'Chocolates for Corporate Gifting': 'Premium Chocolate Gifts',
  'Corporate Gifts': 'Business Gifting Solutions',
  'Corporate Gift Combos': 'Gift Combo Packages',
  'Corporate Gift Hampers': 'Curated Gift Hampers',
  'Corporate Technology Gifts': 'Tech Gadgets for Gifting',
  'Corporate Bags & Travel Gifts': 'Travel & Utility Bags',
  'Outdoor & Safety Items': 'Safety & Outdoor Essentials',
  'Office & Writing Gifts for Corporate': 'Office Stationery Gifts',
  'Drinkware for Corporate Gifting': 'Corporate Drinkware',
  'Personal Accessories': 'Lifestyle Accessories',
  'Corporate Promotional Gifts': 'Promotional Merchandise',
  'Apparel for Corporate Gifting': 'Branded Apparel Gifts',
  'Laptop Bags for Corporate Gifting': 'Professional Laptop Bags',
  'VIP & Executive': 'Executive Level Gifts',
  'Sustainable Products': 'Eco-Friendly Business Solutions',
  'Gifts for Employees': 'Employee Appreciation Gifts'
};

const dir = path.join(process.cwd(), 'src', 'components', 'corporate', 'categories');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [oldName, newName] of Object.entries(replacements)) {
    if (content.includes(oldName)) {
      content = content.split(oldName).join(newName);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

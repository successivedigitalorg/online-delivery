import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// SVG placeholder content
const pizzaPlaceholder = `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="300" fill="#FFB740" />
  <circle cx="150" cy="150" r="100" fill="#FFD700" />
  <circle cx="110" cy="110" r="15" fill="#8B0000" />
  <circle cx="150" cy="90" r="15" fill="#8B0000" />
  <circle cx="190" cy="120" r="15" fill="#8B0000" />
  <circle cx="100" cy="150" r="15" fill="#8B0000" />
  <circle cx="145" cy="160" r="15" fill="#8B0000" />
  <circle cx="180" cy="175" r="15" fill="#8B0000" />
  <circle cx="120" cy="190" r="15" fill="#8B0000" />
  <circle cx="170" cy="200" r="15" fill="#8B0000" />
</svg>
`;

const sidesPlaceholder = `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="300" fill="#FFC299" />
  <rect x="70" y="80" width="160" height="140" fill="#FFE0B3" />
  <path d="M80 100 L90 220 L210 220 L220 100 Z" fill="#F5DEB3" />
  <rect x="100" y="80" width="10" height="140" fill="#D2691E" />
  <rect x="130" y="80" width="10" height="140" fill="#D2691E" />
  <rect x="160" y="80" width="10" height="140" fill="#D2691E" />
  <rect x="190" y="80" width="10" height="140" fill="#D2691E" />
</svg>
`;

const drinksPlaceholder = `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="300" fill="#C6E2FF" />
  <path d="M120 60 L180 60 L170 240 L130 240 Z" fill="#1E90FF" />
  <ellipse cx="150" cy="60" rx="30" ry="10" fill="#1E90FF" />
  <ellipse cx="150" cy="240" rx="20" ry="8" fill="#1E90FF" />
  <path d="M130 90 C140 110, 160 110, 170 90" stroke="white" stroke-width="3" fill="transparent" />
  <path d="M130 120 C140 140, 160 140, 170 120" stroke="white" stroke-width="3" fill="transparent" />
  <path d="M130 150 C140 170, 160 170, 170 150" stroke="white" stroke-width="3" fill="transparent" />
</svg>
`;

const categoryPlaceholder = `
<svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="300" height="300" fill="#87CEEB" />
  <rect x="50" y="100" width="200" height="100" rx="10" fill="#F5F5F5" />
  <text x="150" y="160" font-family="Arial" font-size="24" text-anchor="middle" fill="#333333">Food Category</text>
</svg>
`;

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

// Create directories if they don't exist
const directories = ['pizzas', 'sides', 'drinks', 'categories'];
directories.forEach(dir => {
  const dirPath = path.join(publicDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Create pizza images
const pizzas = ['margherita', 'pepperoni', 'hawaiian', 'veggie', 'bbq-chicken'];
pizzas.forEach(name => {
  fs.writeFileSync(path.join(publicDir, 'pizzas', `${name}.svg`), pizzaPlaceholder);
  console.log(`Created ${name}.svg in pizzas folder`);
});

// Create sides images
const sides = ['fries', 'onion-rings', 'garlic-bread', 'caesar-salad'];
sides.forEach(name => {
  fs.writeFileSync(path.join(publicDir, 'sides', `${name}.svg`), sidesPlaceholder);
  console.log(`Created ${name}.svg in sides folder`);
});

// Create drink images
const drinks = ['coke', 'sprite', 'water'];
drinks.forEach(name => {
  fs.writeFileSync(path.join(publicDir, 'drinks', `${name}.svg`), drinksPlaceholder);
  console.log(`Created ${name}.svg in drinks folder`);
});

// Create category images
const categories = ['pizza', 'sides', 'drinks'];
categories.forEach(name => {
  fs.writeFileSync(path.join(publicDir, 'categories', `${name}.svg`), categoryPlaceholder);
  console.log(`Created ${name}.svg in categories folder`);
});

console.log('All placeholder images created successfully!');
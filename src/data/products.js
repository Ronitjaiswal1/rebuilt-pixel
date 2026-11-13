import product1 from '../assets/product_1.png';
import product2 from '../assets/product_2.png';
import product3 from '../assets/product_3.png';

export const products = [
    {
        id: 1,
        name: "Neon UI Kit",
        price: 49,
        category: "UI Kit",
        image: product1,
        description: "A complete set of neon-themed UI components for your next dashboard project.",
        rating: 4.8
    },
    {
        id: 2,
        name: "Abstract 3D Pack",
        price: 35,
        category: "3D Assets",
        image: product2,
        description: "High-resolution abstract 3D shapes and textures with glass and metal materials.",
        rating: 4.9
    },
    {
        id: 3,
        name: "Cyberpunk Icons",
        price: 19,
        category: "Icons",
        image: product3,
        description: "200+ vector icons with a futuristic cyberpunk aesthetic.",
        rating: 4.7
    },
    {
        id: 4,
        name: "Motion Presets",
        price: 29,
        category: "Templates",
        image: product1, // Reusing for placeholder
        description: "Smooth animation presets for React and Framer Motion.",
        rating: 4.6
    }
];

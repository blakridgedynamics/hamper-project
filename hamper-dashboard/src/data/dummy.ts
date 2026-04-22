export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
};

export const CATEGORIES = ["Birthday Hampers", "Couple Hampers", "Special Occasion"] as const;

export const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Rose Bloom Birthday Box",
    price: 1499,
    category: "Birthday Hampers",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
    featured: true,
  },
  {
    id: "p2",
    name: "Golden Anniversary Hamper",
    price: 2799,
    category: "Couple Hampers",
    image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&q=80",
    featured: true,
  },
  {
    id: "p3",
    name: "Cozy Chocolate Treat",
    price: 999,
    category: "Birthday Hampers",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&q=80",
  },
  {
    id: "p4",
    name: "Romance In A Box",
    price: 1899,
    category: "Couple Hampers",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80",
    featured: true,
  },
  {
    id: "p5",
    name: "Festive Diwali Glow",
    price: 2199,
    category: "Special Occasion",
    image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=600&q=80",
  },
  {
    id: "p6",
    name: "Wedding Wishes Bundle",
    price: 3499,
    category: "Special Occasion",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80",
    featured: true,
  },
  {
    id: "p7",
    name: "Sweet Surprise Mini",
    price: 749,
    category: "Birthday Hampers",
    image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
  },
  {
    id: "p8",
    name: "Eternal Love Crate",
    price: 2499,
    category: "Couple Hampers",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=600&q=80",
  },
];

export const messages = [
  { id: 1, name: "Aarav Sharma", phone: "+91 98765 43210", message: "Do you deliver to Pune by Saturday?", date: "Apr 14, 2026" },
  { id: 2, name: "Priya Mehta", phone: "+91 99812 11223", message: "Can I customize the birthday hamper with a note?", date: "Apr 13, 2026" },
  { id: 3, name: "Rahul Verma", phone: "+91 90011 55667", message: "Looking for a couple hamper under ₹2000.", date: "Apr 12, 2026" },
  { id: 4, name: "Sneha Kapoor", phone: "+91 89234 78901", message: "Do you ship internationally?", date: "Apr 11, 2026" },
  { id: 5, name: "Vikram Singh", phone: "+91 97765 22110", message: "Need a wedding hamper for 20 guests.", date: "Apr 10, 2026" },
  { id: 6, name: "Ananya Iyer", phone: "+91 98101 33445", message: "Loved the Diwali hamper! Will reorder soon.", date: "Apr 9, 2026" },
];

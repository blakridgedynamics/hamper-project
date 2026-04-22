import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Sparkles, Truck, MessageCircle, Instagram, Star, ArrowRight, Package, Palette, Send, Smile } from "lucide-react";
import heroImg from "@/assets/hero-hamper.jpg";
import catBirthday from "@/assets/cat-birthday.jpg";
import catCouple from "@/assets/cat-couple.jpg";
import catSpecial from "@/assets/cat-special.jpg";

const WHATSAPP = "https://wa.me/919999999999?text=Hi%20Neha!%20I'd%20love%20to%20order%20a%20hamper%20%F0%9F%92%9D";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const categories = [
  { title: "Birthday Hampers", desc: "Make their day unforgettable", img: catBirthday },
  { title: "Couple Hampers", desc: "Romantic gifts to cherish", img: catCouple },
  { title: "Special Occasions", desc: "Crafted for every milestone", img: catSpecial },
];

const features = [
  { icon: Heart, title: "Handmade with Care", desc: "Every hamper personally curated" },
  { icon: Package, title: "Premium Packaging", desc: "Luxury unboxing experience" },
  { icon: Palette, title: "Customisable Gifts", desc: "Tailored to your moment" },
  { icon: Truck, title: "Pan-India Delivery", desc: "Delivered with love nationwide" },
];

const steps = [
  { icon: Gift, title: "Choose Your Hamper", desc: "Browse our curated collections" },
  { icon: Palette, title: "Customise It", desc: "Add a personal touch" },
  { icon: Send, title: "Order on WhatsApp", desc: "Quick & easy checkout" },
  { icon: Smile, title: "We Deliver Happiness", desc: "Right to their doorstep" },
];

const reviews = [
  { name: "Aanya S.", text: "Absolutely loved the packaging! My sister cried happy tears. So worth it.", role: "Birthday Hamper" },
  { name: "Rohan & Priya", text: "The couple box was beyond beautiful. Felt like a luxury experience from start to finish.", role: "Anniversary Gift" },
  { name: "Meera K.", text: "Neha's attention to detail is unreal. My go-to gifting brand from now on.", role: "Special Occasion" },
];

// ── Product type from backend ──────────────────────────────
type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
  featured: boolean;
};

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // ── Fetch products from backend ────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/products`);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="#" className="font-serif text-2xl font-semibold tracking-tight">
            Neha&apos;s <span className="text-gradient-gold">Hampers</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#categories" className="hover:text-primary transition-colors">Shop</a>
            <a href="#bestsellers" className="hover:text-primary transition-colors">Best Sellers</a>
            <a href="#how" className="hover:text-primary transition-colors">How it Works</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
          </div>
          <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90">
            <a href={WHATSAPP} target="_blank" rel="noopener"><MessageCircle className="w-4 h-4 mr-1.5" />Order</a>
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-hero overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-blush/40 blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 -right-20 w-[28rem] h-[28rem] rounded-full bg-peach/40 blur-3xl animate-float-slower" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gold-light/30 blur-2xl animate-float-slow" />

        <div className="container mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-gold/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-xs tracking-widest uppercase">Handcrafted Luxury Gifting</span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Handmade Hampers<br />
              <span className="italic text-gradient-gold">Crafted With Love</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8 leading-relaxed">
              Perfect gifts for birthdays, anniversaries and special moments — wrapped with elegance and made to feel unforgettable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 px-8 h-12 shadow-soft">
                <a href="#categories">Shop Hampers <ArrowRight className="ml-2 w-4 h-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-primary/30 bg-white/60 backdrop-blur hover:bg-white px-8 h-12">
                <a href={WHATSAPP} target="_blank" rel="noopener"><MessageCircle className="mr-2 w-4 h-4" />Order on WhatsApp</a>
              </Button>
            </div>
            <div className="flex items-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-gold text-gold" /><span>4.9 / 5 from 500+ orders</span></div>
              <div className="hidden sm:block w-px h-4 bg-border" />
              <span className="hidden sm:inline">Pan-India delivery</span>
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <div className="absolute -inset-6 bg-gradient-gold opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-luxe">
              <img src={heroImg} alt="Luxury handmade gift hamper" width={1536} height={1536} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-luxe flex items-center gap-3 max-w-[200px]">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Made in India</div>
                <div className="font-serif text-sm font-semibold">With love, by Neha</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="py-24 md:py-32">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Our Collections</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Find the perfect <span className="italic text-gradient-gold">gift</span></h2>
            <p className="text-muted-foreground">Curated hampers for every kind of love</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {categories.map((c, i) => (
              <a href="#bestsellers" key={i} className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-soft hover:shadow-luxe transition-luxe">
                <img src={c.img} alt={c.title} loading="lazy" width={1024} height={1280} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-luxe duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-primary-foreground">
                  <h3 className="font-serif text-3xl mb-2">{c.title}</h3>
                  <p className="text-sm opacity-90 mb-4">{c.desc}</p>
                  <div className="inline-flex items-center gap-2 text-sm group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS — connected to backend */}
      <section id="bestsellers" className="py-24 md:py-32 bg-gradient-soft">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Best Sellers</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-4">Loved by <span className="italic text-gradient-gold">hundreds</span></h2>
            <p className="text-muted-foreground">Our most adored hampers, ready to delight</p>
          </div>

          {/* Loading state */}
          {productsLoading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-3xl overflow-hidden shadow-soft animate-pulse">
                  <div className="aspect-square bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-8 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No products yet */}
          {!productsLoading && products.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <Gift className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-serif text-xl">New hampers coming soon!</p>
            </div>
          )}

          {/* Real products from backend */}
          {!productsLoading && products.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {products.map((p) => (
                <div key={p._id} className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-luxe hover:-translate-y-2 transition-luxe">
                  <div className="aspect-square overflow-hidden bg-secondary">
                    <img
                      src={p.images?.[0]?.url || "/placeholder.png"}
                      alt={p.name}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="w-full h-full object-cover group-hover:scale-110 transition-luxe duration-700"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl mb-1">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-serif text-xl text-gradient-gold font-semibold">₹{p.price.toLocaleString()}</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                      </div>
                    </div>
                    <Button asChild size="sm" className="w-full rounded-full bg-primary hover:bg-primary/90">
                      <a href={WHATSAPP} target="_blank" rel="noopener"><MessageCircle className="w-4 h-4 mr-1.5" />Order on WhatsApp</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Why Choose Us</p>
            <h2 className="font-serif text-4xl md:text-5xl">Made with <span className="italic text-gradient-gold">intention</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-secondary/40 hover:bg-secondary transition-luxe group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-glow group-hover:scale-110 transition-luxe">
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-serif text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 md:py-32 bg-gradient-soft">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">How It Works</p>
            <h2 className="font-serif text-4xl md:text-5xl">Gifting, made <span className="italic text-gradient-gold">effortless</span></h2>
          </div>
          <div className="relative grid md:grid-cols-4 gap-6">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
            {steps.map((s, i) => (
              <div key={i} className="relative bg-card rounded-3xl p-6 text-center shadow-soft hover:shadow-luxe transition-luxe">
                <div className="relative z-10 w-24 h-24 mx-auto mb-4 rounded-full bg-background border-2 border-gold/30 flex items-center justify-center">
                  <s.icon className="w-9 h-9 text-primary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-gold text-white font-serif font-semibold flex items-center justify-center text-sm shadow-soft">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-serif text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="py-24 md:py-32">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-gold mb-4">Kind Words</p>
            <h2 className="font-serif text-4xl md:text-5xl">Loved by our <span className="italic text-gradient-gold">customers</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((r, i) => (
              <div key={i} className="bg-card rounded-3xl p-8 shadow-soft hover:shadow-luxe transition-luxe">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}
                </div>
                <p className="font-serif text-xl leading-relaxed mb-6 text-foreground/90">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-white font-serif font-semibold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="relative bg-gradient-hero rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden shadow-luxe">
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-gold-light/30 blur-3xl animate-float-slow" />
            <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-blush/40 blur-3xl animate-float-slower" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <Sparkles className="w-10 h-10 text-gold mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
                Make Someone&apos;s Day<br />
                <span className="italic text-gradient-gold">Special</span> 💝
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">Every hamper is a love letter, beautifully wrapped.</p>
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 px-10 h-14 text-base shadow-luxe">
                <a href={WHATSAPP} target="_blank" rel="noopener"><MessageCircle className="mr-2 w-5 h-5" />Order Your Hamper Now</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary text-primary-foreground pt-20 pb-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="font-serif text-3xl mb-4">Neha&apos;s <span className="text-gradient-gold">Hampers</span></h3>
              <p className="text-primary-foreground/70 max-w-sm leading-relaxed">
                Handmade luxury gift hampers crafted with love in India. Curated for life&apos;s most beautiful moments.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="https://instagram.com" target="_blank" rel="noopener" className="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-gradient-gold flex items-center justify-center transition-luxe">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener" className="w-11 h-11 rounded-full bg-primary-foreground/10 hover:bg-gradient-gold flex items-center justify-center transition-luxe">
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li><a href="#categories" className="hover:text-gold-light transition-colors">Shop Hampers</a></li>
                <li><a href="#bestsellers" className="hover:text-gold-light transition-colors">Best Sellers</a></li>
                <li><a href="#how" className="hover:text-gold-light transition-colors">How it Works</a></li>
                <li><a href="#reviews" className="hover:text-gold-light transition-colors">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Get in Touch</h4>
              <Button asChild className="rounded-full bg-gradient-gold hover:opacity-90 text-primary border-0 w-full">
                <a href={WHATSAPP} target="_blank" rel="noopener"><MessageCircle className="w-4 h-4 mr-2" />WhatsApp Us</a>
              </Button>
              <p className="text-xs text-primary-foreground/60 mt-4">Mon–Sat · 10am–8pm IST</p>
            </div>
          </div>
          <div className="pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Neha&apos;s Hampers. Crafted with 💝 in India.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
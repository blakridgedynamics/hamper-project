import { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CATEGORIES } from "@/data/dummy";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Product = {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  featured?: boolean;
  image?: string;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");

  // ── Fetch all products ──────────────────────────────────
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        const data = await res.json();
        setProducts(data.products || []);
      } catch {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(
    () => products.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    ),
    [products, query]
  );

  // ── Delete ──────────────────────────────────────────────
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product removed");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  // ── Edit ────────────────────────────────────────────────
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/products/${editing._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(editing),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProducts((prev) => prev.map((p) => (p._id === editing._id ? data.product : p)));
      toast.success("Product updated successfully!");
      setEditing(null);
    } catch {
      toast.error("Failed to update product");
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading products...</p>;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">{products.length} hampers in your catalogue.</p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="pl-10 h-11" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card rounded-2xl p-12 text-center shadow-soft border border-border/60">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((p) => (
            <div key={p._id} className="bg-card rounded-2xl shadow-soft hover:shadow-card transition-smooth hover:-translate-y-1 border border-border/60 overflow-hidden group">
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img src={p.image || "/placeholder.png"} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                {p.featured && (
                  <span className="absolute top-3 left-3 bg-gradient-primary text-primary-foreground text-xs font-semibold px-2.5 py-1 rounded-full shadow-glow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{p.category}</p>
                  <h3 className="font-semibold text-foreground line-clamp-1 mt-0.5">{p.name}</h3>
                  <p className="font-display font-bold text-lg text-primary mt-1">₹{p.price.toLocaleString()}</p>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" className="flex-1 hover:bg-muted transition-smooth" onClick={() => setEditing({ ...p })}>
                    <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-smooth" onClick={() => handleDelete(p._id)}>
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Edit Product</DialogTitle>
          </DialogHeader>
          {editing && (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={editing.category} onValueChange={(v) => setEditing({ ...editing, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short Description</Label>
                <Textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Update description…" />
              </div>
              <div className="flex items-center justify-between p-3 bg-gradient-soft rounded-xl">
                <Label>Featured Product</Label>
                <Switch checked={!!editing.featured} onCheckedChange={(v) => setEditing({ ...editing, featured: v })} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
                <Button type="submit" className="bg-gradient-primary hover:opacity-90 shadow-glow">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
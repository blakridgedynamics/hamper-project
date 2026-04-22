import { useRef, useState } from "react";
import { Upload, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API_URL = "http://localhost:3000";

const CATEGORY_OPTIONS = [
  { value: "birthday",    label: "Birthday" },
  { value: "anniversary", label: "Anniversary" },
  { value: "wedding",     label: "Wedding" },
  { value: "corporate",   label: "Corporate" },
  { value: "festive",     label: "Festive" },
  { value: "baby-shower", label: "Baby Shower" },
  { value: "thank-you",   label: "Thank You" },
  { value: "custom",      label: "Custom" },
];

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      // ── Always send as FormData ──────────────────────
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("featured", String(featured));
      images.forEach((img) => formData.append("images", img));

      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ⚠️ No Content-Type — browser sets it automatically with boundary
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add product");
        return;
      }

      toast.success("Product published successfully!", {
        description: `${name} is now live in your store.`,
      });

      // Reset form
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setFeatured(false);
      setImages([]);
      setPreviews([]);

    } catch (err) {
      toast.error("Could not connect to backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Add Product</h1>
        <p className="text-muted-foreground mt-1">Create a new handmade hamper for your store.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/60 space-y-6">

        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Rose Bloom Birthday Box"
            className="h-11"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="1499"
              className="h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Short Description</Label>
          <Textarea
            id="desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A cozy handmade gift, perfect for…"
            rows={4}
          />
        </div>

        <div className="space-y-3">
          <Label>Upload Images</Label>

          {previews.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {previews.map((src, i) => (
                <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-border">
                  <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 hover:bg-black"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 hover:bg-muted/50 transition-smooth cursor-pointer"
          >
            <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Click to upload or drag images here</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gradient-soft rounded-xl">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">Featured Product</p>
              <p className="text-xs text-muted-foreground">Show on the homepage spotlight</p>
            </div>
          </div>
          <Switch checked={featured} onCheckedChange={setFeatured} />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-primary hover:opacity-90 shadow-glow h-11 px-8 font-semibold transition-smooth"
          >
            {loading ? "Publishing..." : "Publish Product"}
          </Button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;
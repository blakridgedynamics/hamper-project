import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle, Instagram, Type } from "lucide-react";

const Settings = () => {
  const [whatsapp, setWhatsapp] = useState("+91 98765 43210");
  const [instagram, setInstagram] = useState("https://instagram.com/hamperstudio");
  const [hero, setHero] = useState("Handmade hampers, made with love.");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your store details.</p>
      </div>

      <form onSubmit={handleSave} className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/60 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="wa" className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-primary" /> WhatsApp Number</Label>
          <Input id="wa" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="h-11" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ig" className="flex items-center gap-2"><Instagram className="w-4 h-4 text-primary" /> Instagram Link</Label>
          <Input id="ig" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="h-11" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero" className="flex items-center gap-2"><Type className="w-4 h-4 text-primary" /> Hero Heading</Label>
          <Input id="hero" value={hero} onChange={(e) => setHero(e.target.value)} className="h-11" />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" className="bg-gradient-primary hover:opacity-90 shadow-glow h-11 px-8 font-semibold transition-smooth">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;

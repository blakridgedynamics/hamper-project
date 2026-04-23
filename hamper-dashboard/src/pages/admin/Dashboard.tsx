import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, MessageSquare, Star, PlusSquare, Eye, Mail, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_API_URL || "https://hamper-project-pjl8.vercel.app";

const Dashboard = () => {
  const [stats, setStats] = useState({ products: 0, featured: 0, messages: 0 });
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });
        const data = await res.json();
        const products = data.products || [];
        setStats({
          products: products.length,
          featured: products.filter((p: any) => p.featured).length,
          messages: 0, // update when messages endpoint is ready
        });
      } catch {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: "Total Products", value: stats.products, icon: Package, color: "from-rose-400 to-pink-500" },
    { label: "Total Orders", value: 0, icon: ShoppingBag, color: "from-amber-400 to-orange-500" },
    { label: "Messages Received", value: stats.messages, icon: MessageSquare, color: "from-sky-400 to-blue-500" },
    { label: "Featured Products", value: stats.featured, icon: Star, color: "from-violet-400 to-purple-500" },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening in your store today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-card transition-smooth hover:-translate-y-0.5 border border-border/60">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
                <p className="font-display text-3xl font-bold mt-2">{s.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-soft`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4 text-xs text-success font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Live from your store</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/60">
        <h2 className="font-display text-xl font-bold mb-5">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Button asChild className="h-auto py-5 bg-gradient-primary hover:opacity-90 shadow-glow flex-col gap-2 transition-smooth hover:-translate-y-0.5">
            <Link to="/admin/add-product">
              <PlusSquare className="w-5 h-5" />
              <span className="font-semibold">Add New Product</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-5 flex-col gap-2 hover:bg-muted transition-smooth hover:-translate-y-0.5">
            <Link to="/admin/products">
              <Eye className="w-5 h-5" />
              <span className="font-semibold">View Products</span>
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-auto py-5 flex-col gap-2 hover:bg-muted transition-smooth hover:-translate-y-0.5">
            <Link to="/admin/messages">
              <Mail className="w-5 h-5" />
              <span className="font-semibold">Check Messages</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 lg:p-8 shadow-soft border border-border/60">
        <h2 className="font-display text-xl font-bold mb-5">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { t: "New order #1058 from Aarav Sharma", time: "5 min ago", color: "bg-success" },
            { t: "Priya Mehta sent a new message", time: "1 hour ago", color: "bg-primary" },
            { t: "Product 'Rose Bloom Birthday Box' was featured", time: "3 hours ago", color: "bg-accent" },
            { t: "Settings updated successfully", time: "Yesterday", color: "bg-muted-foreground" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              <div className={`w-2 h-2 rounded-full ${a.color}`} />
              <p className="text-sm flex-1">{a.t}</p>
              <span className="text-xs text-muted-foreground">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
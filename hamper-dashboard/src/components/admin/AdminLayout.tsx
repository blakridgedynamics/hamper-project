import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusSquare, Package, MessageSquare, Settings, LogOut, Menu, X, Gift } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/add-product", label: "Add Product", icon: PlusSquare },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

const AdminLayout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-muted/40 font-sans">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-card border-r border-border flex flex-col transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-6 py-6 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
            <Gift className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="font-display font-bold text-lg leading-tight">Hamper Studio</p>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-smooth"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-foreground/30 z-30 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 bg-card/80 backdrop-blur border-b border-border">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-foreground">Welcome, Neha 👋</span>
              <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm">
                N
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 animate-in fade-in duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

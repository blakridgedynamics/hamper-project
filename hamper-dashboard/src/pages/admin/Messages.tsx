import { messages } from "@/data/dummy";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Messages = () => {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">{messages.length} customer enquiries.</p>
      </div>

      <div className="bg-card rounded-2xl shadow-soft border border-border/60 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Name</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Message</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((m) => (
                <TableRow key={m.id} className="hover:bg-muted/30 transition-smooth">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                        {m.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium">{m.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{m.phone}</TableCell>
                  <TableCell className="max-w-md text-foreground/80">{m.message}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{m.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Messages;

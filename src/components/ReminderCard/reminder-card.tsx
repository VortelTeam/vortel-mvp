import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReminderCard() {
  return (
    <Card className="w-[250px] transform -rotate-12">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Clock className="w-8 h-8 text-gray-600" />
          <div className="space-y-2">
            <h3 className="font-medium">John Doe's Hours</h3>
            <p className="text-sm text-gray-500">Chat with him about false reports</p>
            <div className="flex items-center gap-2 text-sm text-brand-brown">
              <span>13:00 - 13:45</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function ReminderCard() {
  return (
    <Card className="w-[250px] transform -rotate-12">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Clock className="w-8 h-8 text-gray-600" />
          <div className="space-y-2">
            <h3 className="font-medium">Today's Meeting</h3>
            <p className="text-sm text-gray-500">Call with marketing team</p>
            <div className="flex items-center gap-2 text-sm text-blue-500">
              <span>13:00 - 13:45</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

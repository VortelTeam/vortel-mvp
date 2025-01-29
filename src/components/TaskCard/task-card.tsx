import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function TaskCard() {
  return (
    <Card className="w-[300px] transform rotate-12">
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">Document's Collected</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                <span className="bg-highlight">John Doe</span>
                's Required Documents
              </span>
              <span className="text-sm text-gray-500">60%</span>
            </div>
            <Progress value={60} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">
                <span className="bg-highlight">Jane Doe</span>
                's Required Documents
              </span>
              <span className="text-sm text-gray-500">17%</span>
            </div>
            <Progress value={17} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

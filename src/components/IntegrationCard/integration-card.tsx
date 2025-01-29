import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function IntegrationCard() {
  return (
    <Card className="w-[300px] transform -rotate-6">
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">100+ Integrations</h3>
        <div className="flex gap-2">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Gmail"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Slack"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="Google Calendar"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

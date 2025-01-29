import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FaSlack, FaGoogle } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { GoZap } from "react-icons/go";

export function IntegrationCard() {
  return (
    <Card className="w-[300px] transform -rotate-6">
      <CardContent className="p-4">
        <h3 className="font-medium mb-4">100+ Integrations</h3>
        <div className="flex gap-2">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <SiGmail className="w-8 h-8 text-brand-primary" />
          </div>
          <div className="p-2 bg-[#f1f1f1] rounded-lg shadow-sm">
            <FaSlack className="w-8 h-8 text-brand-primary" />
          </div>
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <FaGoogle className="w-8 h-8 text-brand-primary" />
          </div>
          <div className="p-2 bg-white rounded-lg shadow-sm">
            <GoZap className="w-8 h-8 text-brand-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

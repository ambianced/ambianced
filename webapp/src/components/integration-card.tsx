import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Switch } from "./ui/switch";

interface IntegrationCardProps {
  logo: string;
  name: string;
  description: string;
  enabled: boolean;
}


export const IntegrationCard = ({ logo, name, description, enabled  }: IntegrationCardProps) => {
  return (
    <Card className="flex flex-row items-center p-4 gap-4 w-full h-40 shadow-lg rounded-lg">
      {/* Logo */}
      <div className="w-24 h-24 flex-shrink-0 mr-4">
        <Image width={64} height={64} src={logo} alt={`${name} logo`} className="w-full h-full object-cover rounded-full" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center w-full">
        {/* Title and Price */}
        <CardHeader className="flex items-center justify-between p-2">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          {/* {price && (
            <div className="text-lg font-semibold ">
              {price}
            </div>
          )} */}
        </CardHeader>

        {/* Horizontal Line */}
        <hr className="mb-4" />

        {/* Description */}
        <CardContent>
          <p className="">{description}</p>
        </CardContent>
      </div>

      {/* Add a swithcer */}
      <div className="h-full flex flex-col justify-center items-center w-1/2">
        <Switch disabled checked={!enabled}/>
      </div>
    </Card>
  );
};
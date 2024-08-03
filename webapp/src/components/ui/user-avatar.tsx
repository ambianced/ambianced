import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export function UserAvatar({
  user,
  ...props
}: {
  user: { name?: string; image?: string };
  [key: string]: any;
}) {
  return (
    <Avatar {...props}>
      <AvatarImage src={user.image} alt={user.name} />
      <AvatarFallback>
        <span className="sr-only">{user.name}</span>
        <User className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  );
}

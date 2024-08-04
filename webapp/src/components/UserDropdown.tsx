"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserAvatar } from "./ui/user-avatar";
// import { capitalize } from "@/lib/utils";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export default function UserDropdown({
  user,
}: Readonly<{
  user: UserProfile;
}>) {
  // create a function to handle the logout as server action

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{
            name: user.name || undefined,
            image: user.picture || undefined,
          }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {/* {session.data && <p className="font-medium">{JSON.stringify(session.data.user)}</p>} */}
            <p className="font-medium">{user.name}</p>
            {/* {user.id} */}
            {/* 
            <div>
              <Badge>
                {user.role ?? capitalize(user.role ?? "")}
              </Badge>
            </div> */}

            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />
        <Link href="/api/auth/logout" className="cursor-pointer">
          <DropdownMenuItem className="cursor-pointer">
            Sign out
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

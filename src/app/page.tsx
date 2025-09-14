"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <div>
      {session?.user?.name}
      <Button onClick={() => authClient.signOut()} className="ml-4">
        Logout
      </Button>
    </div>
  );
}

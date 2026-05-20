"use client";

import { authClient, useSession } from "@/lib/auth-client";

import { Button, Link } from "@heroui/react";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const { data, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  const user = data?.user;

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <p className="font-bold text-xl">ACME</p>
        </div>

        {/* Nav Links */}
        <ul className="flex items-center gap-4">
          {user ? (
            <>
              <li>Welcome {user.name}</li>

              <li>
                <Button
                  color="danger"
                  onPress={async () => {
                    await authClient.signOut();

                    router.refresh();
                  }}
                >
                  SignOut
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/signup">SignUp</Link>
              </li>

              <li>
                <Link href="/signin">SignIn</Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </nav>
  );
};

export default Navbar;

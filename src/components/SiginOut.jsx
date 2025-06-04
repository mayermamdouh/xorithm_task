"use client";
import { signOut, useSession } from "next-auth/react";

const SignOutButton = () => {
  const { status } = useSession();

  if (status !== "authenticated") return null;

  return (
    <button
      type="button"
      className="cursor-pointer px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;

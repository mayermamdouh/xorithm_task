"use client";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <div className="flex flex-col items-center justify-between gap-5">
      <button
        type="button"
        className="cursor-pointer px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign in with Google
      </button>
      <div className="font-bold">Or</div>
      <button
        type="button"
        className="cursor-pointer px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      >
        Sign in with GitHub
      </button>
    </div>
  );
}

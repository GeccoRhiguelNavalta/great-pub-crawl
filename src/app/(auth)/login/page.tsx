import Link from "next/link";
import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="flex flex-col justify-center items-center sm:shadow-xl pb-8 pt-12 sm:bg-white rounded-xl space-y-8">
        <h1 className="font-semibold text-2xl">Login</h1>
        <div className="text-center">
          <LoginForm />
          Need to create an account?{" "}
          <Link className="text-indigo-500 hover:underline" href="/register">
            Create Account
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

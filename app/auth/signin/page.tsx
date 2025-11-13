"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import { login } from "@/lib/auth";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    setError(null);
    setLoading(true);
    try {
      await login({ email: data.email, password: data.password });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      <main className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <div className="card p-8">
            <h1 className="text-2xl font-bold mb-2">Sign in to your account</h1>
            <p className="text-sm text-gray-600 mb-6">Welcome back — enter your details below.</p>

            {error && (
              <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="input-field w-full"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="input-field w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-6 text-center">
              Don't have an account? <Link href="/auth/signup" className="text-primary-600 font-medium">Sign up</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

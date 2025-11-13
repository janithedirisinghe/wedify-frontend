"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Header from "@/components/Header";
import { register as registerUser } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(2, { message: "Enter your name" }),
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirm: z.string().min(6),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

type FormData = z.infer<typeof schema>;

export default function SignUpPage() {
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
      await registerUser({ email: data.email, password: data.password, name: data.name });
      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Registration failed");
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
            <h1 className="text-2xl font-bold mb-2">Create an account</h1>
            <p className="text-sm text-gray-600 mb-6">Start creating your wedding invitation today.</p>

            {error && (
              <div className="mb-4 text-sm text-red-700 bg-red-50 p-3 rounded">{error}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full name</label>
                <input className="input-field w-full" {...register("name")} />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="input-field w-full" {...register("email")} />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input type="password" className="input-field w-full" {...register("password")} />
                {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input type="password" className="input-field w-full" {...register("confirm")} />
                {errors.confirm && <p className="text-sm text-red-600 mt-1">{errors.confirm.message}</p>}
              </div>

              <button type="submit" className="btn-primary w-full py-3" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-6 text-center">
              Already have an account? <Link href="/auth/signin" className="text-primary-600 font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

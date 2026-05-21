"use client";

import { useState } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import GoogleLogin from "@/components/googleLogin/GoogleLogin";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";

const SignInPage = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const userData = Object.fromEntries(formData.entries());

    await authClient.signIn.email(
      {
        email: userData.email,

        password: userData.password,

        callbackURL: "/dashboard",
      },

      {
        onSuccess: () => {
          router.push("/dashboard");

          router.refresh();
        },

        onError: (ctx) => {
          alert(ctx.error.message);
        },

        onSettled: () => {
          setLoading(false);
        },
      },
    );
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-4 py-10">
      {/* BACKGROUND */}

      <div className="absolute inset-0">
        {/* GRID */}

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

        {/* GLOW */}

        <div className="absolute left-[-15%] top-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* CARD */}

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_120px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
        {/* TOP LIGHT */}

        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* LOGO */}

        <div className="mb-8 flex flex-col items-center">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-[28px] border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-cyan-500/20 to-violet-500/20" />

            <span className="relative text-4xl font-black text-white">A</span>
          </div>

          <h1 className="mt-6 text-center text-4xl font-black tracking-tight text-white">
            Welcome Back
          </h1>

          <p className="mt-3 text-center text-sm leading-relaxed text-gray-400">
            Securely sign in to continue your premium experience
          </p>
        </div>

        {/* FORM */}

        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          {/* EMAIL */}

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Enter valid email";
              }

              return null;
            }}
          >
            <Label className="mb-2 text-sm font-medium text-gray-300">
              Email Address
            </Label>

            <Input
              name="email"
              placeholder="john@example.com"
              className="h-14 text-white"
            />

            <FieldError />
          </TextField>

          {/* PASSWORD */}

          <TextField isRequired name="password">
            <Label className="mb-2 text-sm font-medium text-gray-300">
              Password
            </Label>

            <div className="relative">
              <Input
                type={isVisible ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="h-14 "
              />

              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
              >
                {isVisible ? (
                  <Eye className="size-5" />
                ) : (
                  <EyeSlash className="size-5" />
                )}
              </button>
            </div>

            <FieldError />
          </TextField>

          {/* OPTIONS */}

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                className="rounded border-white/20 bg-white/5"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}

          <Button
            type="submit"
            size="lg"
            isDisabled={loading}
            isLoading={loading}
            className="mt-3 h-14 w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-base font-bold tracking-wide text-white shadow-[0_10px_40px_rgba(59,130,246,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_60px_rgba(59,130,246,0.5)]"
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Form>

        {/* DIVIDER */}

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gray-500">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* GOOGLE LOGIN */}

        <GoogleLogin />

        {/* FOOTER */}

        <p className="mt-8 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignInPage;

"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLoginSchema } from "@/schemas/user.schema";
import { useApi } from "@/providers/apiProvider";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import { cookieKeys } from "@/config/cookies.config";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { RiLoginCircleLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import toast from "react-hot-toast";
import type { uerLoginInput } from "../api/register/types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<uerLoginInput>({
    mode: "onSubmit",
    resolver: zodResolver(userLoginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useApi();
  const router = useRouter();

  const onSubmit = async (userData: uerLoginInput) => {
    try {
      setIsLoading(true);
      const { data: user } = await apiClient.post("login", userData);
      Cookie.set(cookieKeys.USER_TOKEN, user.token);
      reset();
      router.push("/");
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message ||
        "Failed to login. Check email or password.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full font-sans">
      <div className="flex flex-col items-center justify-center -mt-18">
        {/* Icon */}
        <div className="relative flex size-12 items-center justify-center rounded-xl bg-lime-600 text-white shadow-md backdrop-blur-sm">
          <RiLoginCircleLine className="size-7" />
        </div>

        {/* Welcome Message */}
        <h1 className="text-[#1e2a38] font-bold text-3xl md:text-4xl text-center mt-2">
          Welcome Back
        </h1>
        <p className="text-sm text-center text-gray-400">
          Enter your email & password
        </p>

        <div className="w-full max-w-xs mt-5 space-y-5 text-gray-900">
          {/* Email */}
          <div className="flex flex-col relative group">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <HiOutlineMail
              className={`absolute mt-8.5 left-2 size-5 text-gray-400 group-focus-within:text-lime-600 transition-colors duration-200`}
            />
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`peer pl-10 px-3 py-2 text-sm rounded-xl shadow-sm placeholder:text-gray-400 bg-white border outline-none transition duration-150 ease-in-out ${
                errors.email
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#7BA05B] focus:border-[#7BA05B]"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col relative group">
            <label htmlFor="password" className="text-sm font-medium mb-1">
              Password
            </label>
            <TbLockPassword
              className={`absolute mt-8.5 left-2 size-5 text-gray-400 group-focus-within:text-lime-600 transition-colors duration-200`}
            />
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`peer pl-10 px-3 py-2 text-sm rounded-xl shadow-sm placeholder:text-gray-400 bg-white border outline-none transition duration-150 ease-in-out ${
                errors.password
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#7BA05B] focus:border-[#7BA05B]"
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 px-4 py-2 text-white font-semibold
              bg-gradient-to-r from-[#7BA05B] via-[#90B26C] to-[#7BA05B]
              rounded-md shadow-md hover:shadow-xl hover:scale-[1.02]
              transition-all duration-200 ease-in-out
              hover:brightness-110 focus:ring-2 focus:ring-[#A3C379]
              disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>

          {/* Divider */}
          <div className="flex items-center mt-1">
            <hr className="flex-grow border-t border-gray-300" />
            <p className="px-3 text-xs text-gray-500">Or Login With</p>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="w-full flex items-center space-x-2 mt-2">
            <button className="flex items-center justify-center gap-2 w-1/2 bg-gray-100 p-2 rounded-md hover:scale-[1.02] transition-all">
              <FcGoogle />
              <p className="text-sm">Google</p>
            </button>
            <button className="flex items-center justify-center gap-2 w-1/2 bg-gray-100 p-2 rounded-md hover:scale-[1.02] transition-all">
              <FaApple />
              <p className="text-sm">Apple</p>
            </button>
          </div>

          {/* Register Link */}
          <div className="flex justify-center mb-12">
            <p className="text-xs text-gray-500">
              Don&apos;t have an account?{" "}
              <span
                className="text-[#7BA05B] font-medium cursor-pointer hover:underline"
                onClick={() => router.push("/register")}
              >
                Register Now
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;

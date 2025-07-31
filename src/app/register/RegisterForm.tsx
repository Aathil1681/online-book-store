"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserRegisterInput } from "../api/register/types";
import { userRegiterSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/providers/apiProvider";
import Cookie from "js-cookie";
import { cookieKeys } from "@/config/cookies.config";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { RiUser3Line } from "react-icons/ri";
import { RiLoginCircleLine } from "react-icons/ri";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UserRegisterInput>({
    mode: "onSubmit",
    shouldFocusError: true,
    resolver: zodResolver(userRegiterSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useApi();
  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (userData) => {
        try {
          setIsLoading(true);
          const { data: user } = await apiClient.post("register", userData);
          Cookie.set(cookieKeys.USER_TOKEN, user.token);
          reset();
          router.push("/");
        } catch (error) {
          console.log({ error });
        } finally {
          setIsLoading(false);
        }
      })}
      className="w-full font-sans"
    >
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative flex size-12 items-center justify-center rounded-xl  bg-lime-600 shadow-lime-700  text-white shadow-md backdrop-blur-sm dark:border-white/10">
            <RiLoginCircleLine className="size-7 text-white " />
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-3 mb-5">
          <h1 className="text-[#1e2a38] font-bold text-3xl md:text-4xl text-center">
            Create an Account
          </h1>
          <p className="text-sm text-center text-gray-400">
            one step, one click, one future
          </p>
        </div>

        <div className="w-full max-w-xs space-y-5 text-gray-900">
          {/* First Name */}
          <div className="flex flex-col relative group">
            <label htmlFor="firstName" className="text-sm font-medium mb-1">
              First Name
            </label>
            <div className="absolute mt-8.5 left-2">
              <RiUser3Line className="size-5 text-gray-400 transition-colors group-focus-within:text-lime-600" />
            </div>
            <input
              type="text"
              placeholder="Your first name"
              className={`pl-10 px-3 py-2 text-sm rounded-xl shadow-sm placeholder:text-gray-400 bg-white border ${
                errors.firstName
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#7BA05B] focus:border-[#7BA05B]"
              } outline-none transition duration-150 ease-in-out`}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="flex flex-col relative group">
            <label htmlFor="lastName" className="text-sm font-medium mb-1">
              Last Name
            </label>
            <div className="absolute mt-8.5 left-2">
              <RiUser3Line className="size-5 text-gray-400 transition-colors group-focus-within:text-lime-600" />
            </div>
            <input
              type="text"
              placeholder="Your last name"
              className={`pl-10 px-3 py-2 text-sm rounded-xl shadow-sm placeholder:text-gray-400 bg-white border ${
                errors.lastName
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#7BA05B] focus:border-[#7BA05B]"
              } outline-none transition duration-150 ease-in-out`}
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col relative group">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email
            </label>
            <div className="absolute mt-8.5 left-2">
              <HiOutlineMail className="size-5 text-gray-400 transition-colors group-focus-within:text-lime-600" />
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              className={`pl-10 px-3 py-2 text-sm rounded-xl shadow-sm placeholder:text-gray-400 bg-white border ${
                errors.email
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#7BA05B] focus:border-[#7BA05B]"
              } outline-none transition duration-150 ease-in-out`}
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
            <div className="absolute mt-8.5 left-2">
              <TbLockPassword className="size-5 text-gray-400 transition-colors group-focus-within:text-lime-600" />
            </div>
            <input
              type="password"
              placeholder="Create a password"
              className={`pl-10 px-3 py-2 text-sm rounded-xl shadow-sm placeholder:text-gray-400 bg-white border ${
                errors.password
                  ? "border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border-gray-300 focus:ring-2 focus:ring-[#7BA05B] focus:border-[#7BA05B]"
              } outline-none transition duration-150 ease-in-out`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
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
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* Divider */}
          <div className="flex items-center mt-1">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-xs text-gray-500">Or Register With</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Social Auth Buttons */}
          <div className="w-full flex items-center space-x-2 mt-2">
            <button className="flex w-1/2 items-center justify-center gap-2 bg-gray-100 p-2 rounded-md hover:scale-[1.02] transition-all">
              <FcGoogle />
              <p className="text-sm">Google</p>
            </button>
            <button className="flex w-1/2 items-center justify-center gap-2 bg-gray-100 p-2 rounded-md hover:scale-[1.02] transition-all">
              <FaApple />
              <p className="text-sm">Apple</p>
            </button>
          </div>

          {/* Redirect Link */}
          <div className="flex justify-center mb-12">
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <span
                className="text-[#7BA05B] font-medium cursor-pointer hover:underline"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;

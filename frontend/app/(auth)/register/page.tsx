"use client";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import api from "@/lib/axios";
import { getPasswordStrength } from "@/lib/utils";
import { RegisterForm, registerSchema } from "@/lib/validations";
import { Role } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const roles = [
  {
    value: "JOB_SEEKER",
    label: "Job Seeker",
    description: "Find your dream job",
    icon: <User size={16} />,
  },
  {
    value: "EMPLOYER",
    label: "Employer",
    description: "Hire top talent",
    icon: <Briefcase size={16} />,
  },
];

const steps = [
  { id: 1, label: "Choose role" },
  { id: 2, label: "Your info" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("JOB_SEEKER");
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "JOB_SEEKER" },
  });

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const onSubmit = async (data: RegisterForm) => {
    try {
      const response = await api.post("/auth/register", data);
      const { accessToken, refreshToken } = response.data.data;
      Cookies.set("accessToken", accessToken);
      Cookies.set("refreshToken", refreshToken);
      router.push("/login");
    } catch (error: any) {
      setError("root", {
        message: error.response?.data?.message || "Registration failed",
      });
    }
  };

  const strength = getPasswordStrength(passwordValue);

  return (
    <div className="flex min-h-screen items-center justify-center bg-light-background px-4 py-12">
      <Card className="p-0 w-full max-w-[850px] overflow-hidden rounded-2xl">
        <div className="flex flex-col md:flex-row">
          {/* LEFT PANEL — hidden on mobile */}
          <div className="relative hidden md:flex w-62 flex-shrink-0 flex-col justify-between overflow-hidden bg-black p-6">
            <div className="absolute -right-14 -top-12 h-44 w-44 rounded-full border border-white/[0.1]" />
            <div className="absolute -left-10 bottom-16 h-28 w-28 rounded-full border border-white/[0.07]" />

            <Logo color="white" />

            <div className="relative z-10 flex-1 py-8">
              <p className="mb-3 text-[10px] uppercase tracking-[1.2px] text-white/70">
                Get started
              </p>
              <h3 className="text-white">
                Your next
                <br />
                opportunity
                <br />
                <span className="text-white/70">starts here.</span>
              </h3>

              <div className="mt-8 flex flex-col">
                {steps.map((s, i) => {
                  const isDone = step > s.id;
                  const isActive = step === s.id;
                  return (
                    <div
                      key={s.id}
                      className="relative flex items-center gap-2.5 py-2.5"
                    >
                      {i < steps.length - 1 && (
                        <div className="absolute left-[9px] top-[30px] h-5 w-px bg-white/30" />
                      )}
                      <div
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-semibold transition-all duration-200
                        ${isActive ? "bg-white text-black" : isDone ? "bg-white/20 text-white/60" : "border border-white/20 bg-white/[0.04] text-white/60"}`}
                      >
                        {isDone ? <Check size={9} strokeWidth={3} /> : s.id}
                      </div>
                      <span
                        className={`text-xs font-medium transition-colors ${isActive ? "text-white" : "text-white/70"}`}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="relative z-10 text-[10px] leading-relaxed text-white/50">
              By creating an account you agree to our terms &amp; privacy
              policy.
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full bg-white px-5 py-8 md:px-10 md:py-10">
            {/* Mobile: logo + step indicator */}
            <div className="flex items-center justify-between mb-6 md:hidden">
              <Logo color="black" />
              <div className="flex items-center gap-1.5">
                {steps.map((s) => (
                  <div
                    key={s.id}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      step === s.id
                        ? "w-6 bg-black"
                        : step > s.id
                          ? "w-4 bg-black/30"
                          : "w-4 bg-gray-200"
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div>
                <p className="mb-1.5 text-[10px] block font-medium uppercase tracking-[1px]">
                  Step 1 of 2
                </p>
                <h4 className="mb-1 font-semibold leading-tight tracking-tight">
                  Who are you?
                </h4>
                <p className="mb-6">
                  Pick a role to personalize your experience
                </p>

                <div className="mb-6 grid grid-cols-2 gap-3">
                  {roles.map((role) => {
                    const isActive = selectedRole === role.value;
                    return (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => handleRoleSelect(role.value as Role)}
                        className={`relative flex flex-col items-start gap-2.5 rounded-[14px] border-[1.5px] p-4 text-left transition-all duration-150
                        ${isActive ? "border-black bg-gray-50" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"}`}
                      >
                        {isActive && (
                          <span className="absolute right-2.5 top-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-black">
                            <Check size={8} strokeWidth={3} color="white" />
                          </span>
                        )}
                        <div
                          className={`flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border transition-all
                          ${isActive ? "border-transparent bg-black text-white" : "border-gray-500 bg-white text-black"}`}
                        >
                          {role.icon}
                        </div>
                        <div>
                          <h6
                            className={
                              isActive ? "text-black" : "text-gray-700"
                            }
                          >
                            {role.label}
                          </h6>
                          <p
                            className={`mt-0.5 text-[11px] ${isActive ? "text-gray-500" : "text-gray-400"}`}
                          >
                            {role.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {errors.role && (
                  <p className="mb-3 text-xs text-red-500">
                    {errors.role.message}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <p className="mb-1.5 text-[10px] block font-medium uppercase tracking-[1px]">
                  Step 2 of 2
                </p>
                <h4 className="mb-1 font-semibold leading-tight tracking-tight">
                  Create account
                </h4>
                <p className="mb-6">Almost there — fill in your details</p>

                <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      {
                        id: "firstName",
                        placeholder: "John",
                        label: "First name",
                      },
                      {
                        id: "lastName",
                        placeholder: "Doe",
                        label: "Last name",
                      },
                    ] as const
                  ).map(({ id, placeholder, label }) => (
                    <div key={id} className="space-y-1">
                      <label className="block text-[12px] font-medium uppercase tracking-[0.8px] text-gray-500">
                        {label}
                      </label>
                      <div className="relative">
                        <User
                          size={13}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                        <Input
                          placeholder={placeholder}
                          className="h-10 rounded-lg border-gray-200 bg-gray-50 pl-8 text-sm focus:border-black focus:ring-0"
                          {...register(id)}
                        />
                      </div>
                      {errors[id] && (
                        <p className="text-[10px] text-red-500">
                          {errors[id]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mb-3 space-y-1.5">
                  <label className="block text-[12px] font-medium uppercase tracking-[0.8px] text-gray-500">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="h-10 rounded-lg border-gray-200 bg-gray-50 pl-8 text-sm focus:border-black focus:ring-0"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[10px] text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-3 space-y-1.5">
                  <label className="text-[12px] block font-medium uppercase tracking-[0.8px] text-gray-500">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      className="h-10 rounded-lg border-gray-200 bg-gray-50 pl-8 pr-10 text-sm focus:border-black focus:ring-0"
                      {...register("password", {
                        onChange: (e) => setPasswordValue(e.target.value),
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                  {passwordValue && (
                    <div className="pt-0.5">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="h-[2.5px] flex-1 rounded-full transition-all duration-200"
                            style={{
                              background:
                                i <= strength.score
                                  ? strength.color
                                  : "#E5E7EB",
                            }}
                          />
                        ))}
                      </div>
                      {strength.label && (
                        <p className="mt-1 text-[10px] text-gray-400">
                          {strength.label}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mb-5 space-y-1.5">
                  <label className="text-[12px] block font-medium uppercase tracking-[0.8px] text-gray-500">
                    Confirm password
                  </label>
                  <div className="relative">
                    <Lock
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      className="h-10 rounded-lg border-gray-200 bg-gray-50 pl-8 text-sm focus:border-black focus:ring-0"
                      {...register("confirmPassword")}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-[10px] text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {errors.root && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5">
                    <AlertCircle size={13} className="shrink-0 text-red-500" />
                    <p className="text-xs text-red-600">
                      {errors.root.message}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account <ArrowRight size={14} />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="w-full mt-4"
                >
                  Back
                </Button>
              </form>
            )}

            <p className="mt-8 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

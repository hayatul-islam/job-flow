"use client";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/axios";
import { formatRole } from "@/lib/utils";
import { ProfileForm, profileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Check, Pencil, X } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import InputField from "../shared/InputField";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function ProfilePage() {
  const { loading, user, setUser } = useAuth();

  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setFileInputRef = (el: HTMLInputElement | null) => {
    fileInputRef.current = el;
  };
  const savedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
    },
  });

  useEffect(() => {
    if (user && !editing) {
      reset({ firstName: user.firstName ?? "", lastName: user.lastName ?? "" });
    }
  }, [user?.id]);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    reset({ firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" });
    setAvatarPreview(null);
    setAvatarFile(null);
    setEditing(true);
  };

  const handleCancel = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setEditing(false);
  };

  const onSubmit = async (data: ProfileForm) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      if (avatarFile) formData.append("avatar", avatarFile);

      const response = await api.put("/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response?.data?.message);
      const updated = response.data?.data;

      if (setUser) {
        setUser((prev: any) => ({
          ...prev,
          firstName: updated?.firstName ?? data.firstName,
          lastName: updated?.lastName ?? data.lastName,
          avatar: updated?.avatar ?? prev?.avatar,
        }));
      }

      setAvatarPreview(null);
      setAvatarFile(null);
      setEditing(false);

      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    } catch (error: any) {
      setError("root", {
        message: error.response?.data?.message || "Failed to update profile",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAvatarClick = () => {
    if (editing) fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview("remove");
    setAvatarFile(null);
  };

  const displayAvatar =
    avatarPreview === "remove" ? null : (avatarPreview ?? user?.avatar ?? null);

  const showRemoveButton = editing && displayAvatar;

  return (
    <div className="bg-light-background flex items-center justify-center p- pt-40 pb-16">
      <div className="w-full max-w-xl">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <Card className="relative p-0 shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col items-center -mt-12 px-8 pb-2">
                <div className="relative group">
                  <div
                    className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-lg cursor-pointer"
                    onClick={handleAvatarClick}
                  >
                    {displayAvatar ? (
                      <img
                        src={displayAvatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900 flex items-center justify-center text-white text-2xl font-semibold select-none">
                        {user?.firstName?.[0] || "?"}
                      </div>
                    )}
                    {editing && (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 rounded-2xl">
                        <Camera size={18} className="text-white" />
                        <span className="text-white text-[10px] font-medium">
                          Change
                        </span>
                      </div>
                    )}
                  </div>

                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />

                  {showRemoveButton && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveAvatar();
                      }}
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md z-10 transition-colors"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  )}

                  <input
                    ref={setFileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mt-3 text-center">
                  <h1 className="text-lg font-semibold text-slate-800">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p className="text-sm text-slate-400 mt-0.5">{user?.email}</p>
                  <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-primary/10 border border-violet-100 text-primary text-xs font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {formatRole(user?.role)}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {!editing ? (
                    <Button
                      type="button"
                      onClick={handleEdit}
                      className="bg-black h-9 px-4 text-xs"
                    >
                      <Pencil size={12} />
                      Edit profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-9 px-4 text-xs rounded-xl"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeOpacity="0.3"
                              />
                              <path
                                d="M12 2a10 10 0 0110 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          <>
                            <Check size={12} />
                            Save changes
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        onClick={handleCancel}
                        className="h-9 px-4 rounded-xl"
                        variant="outline"
                      >
                        <X size={12} />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="mx-8 my-5 h-px bg-slate-100" />

              <div className="px-8 pb-8 space-y-4">
                {editing ? (
                  <>
                    {errors.root && (
                      <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="text-red-500 shrink-0"
                        >
                          <circle
                            cx="10"
                            cy="10"
                            r="8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M10 6v5M10 14h.01"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <p className="text-red-600 text-sm">
                          {errors.root.message}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="First name"
                        editable
                        registration={register("firstName")}
                        error={errors.firstName?.message}
                      />
                      <InputField
                        label="Last name"
                        editable
                        registration={register("lastName")}
                        error={errors.lastName?.message}
                      />
                    </div>

                    <InputField label="Email address" value={user?.email} />
                    <InputField label="Role" value={formatRole(user?.role)} />

                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="User ID" value={`#${user?.id}`} />
                      <InputField
                        label="Member since"
                        value={moment(user?.createdAt).format("DD MMM YYYY")}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <InputField
                        label="First name"
                        value={user?.firstName}
                        readOnly
                      />
                      <InputField
                        label="Last name"
                        value={user?.lastName}
                        readOnly
                      />
                    </div>

                    <InputField
                      label="Email address"
                      value={user?.email}
                      readOnly
                    />
                    <InputField
                      label="Role"
                      value={formatRole(user?.role)}
                      readOnly
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <InputField
                        label="User ID"
                        value={`#${user?.id}`}
                        readOnly
                        muted
                      />
                      <InputField
                        label="Member since"
                        value={moment(user?.createdAt).format("DD MMM YYYY")}
                        readOnly
                        muted
                      />
                    </div>
                  </>
                )}
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}

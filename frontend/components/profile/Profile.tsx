"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useUpdateProfile } from "@/hooks/useProfile";
import { fadeUp, stagger } from "@/lib/animations";
import { formatRole } from "@/lib/utils";
import { ProfileForm, profileSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Check, Pencil, X } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../shared/InputField";
import ProfileSkeleton from "../skeletons/ProfileSkeleton";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function ProfilePage() {
  const { user, isLoading: loading } = useAuth();
  const { mutate: updateProfile, isPending, isSuccess } = useUpdateProfile();

  const [editing, setEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setFileInputRef = (el: HTMLInputElement | null) => {
    fileInputRef.current = el;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
  }, [user?.id, editing, reset]);

  useEffect(() => {
    if (isSuccess) {
      setAvatarPreview(null);
      setAvatarFile(null);
      setAvatarRemoved(false);
      setEditing(false);
    }
  }, [isSuccess]);

  const handleEdit = () => {
    reset({ firstName: user?.firstName ?? "", lastName: user?.lastName ?? "" });
    setAvatarPreview(null);
    setAvatarFile(null);
    setAvatarRemoved(false);
    setEditing(true);
  };

  const handleCancel = () => {
    setAvatarPreview(null);
    setAvatarFile(null);
    setAvatarRemoved(false);
    setEditing(false);
  };

  const onSubmit = (data: ProfileForm) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    if (avatarFile) formData.append("avatar", avatarFile);
    if (avatarRemoved) formData.append("removeAvatar", "true");
    updateProfile(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    setAvatarFile(file);
    setAvatarRemoved(false);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAvatarClick = () => {
    if (editing) fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
    setAvatarRemoved(true);
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const displayAvatar = avatarRemoved
    ? null
    : (avatarPreview ?? user?.avatar ?? null);

  const showRemoveButton = editing && displayAvatar;

  return (
    <div className="bg-light-background flex items-center justify-center pt-36 md:pt-40 pb-12 md:pb-16 px-4">
      <div className="w-full max-w-xl">
        {loading ? (
          <ProfileSkeleton />
        ) : (
          <motion.div variants={stagger} initial="hidden" animate="show">
            <Card className="relative p-0 shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  variants={fadeUp}
                  className="flex flex-col items-center -mt-12 px-5 md:px-8 pb-2"
                >
                  <div className="relative group">
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden ring-4 ring-slate-100 shadow-lg cursor-pointer"
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

                    <AnimatePresence>
                      {showRemoveButton && (
                        <motion.button
                          type="button"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.15 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveAvatar();
                          }}
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md z-10 transition-colors"
                        >
                          <X size={10} strokeWidth={3} />
                        </motion.button>
                      )}
                    </AnimatePresence>

                    <input
                      ref={setFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="mt-3 text-center">
                    <h1 className="text-base md:text-lg font-semibold text-slate-800">
                      {user?.firstName} {user?.lastName}
                    </h1>
                    <p className="text-xs md:text-sm text-slate-400 mt-0.5 break-all">
                      {user?.email}
                    </p>
                    <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-primary/10 border border-violet-100 text-primary text-xs font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {formatRole(user?.role)}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <AnimatePresence mode="wait">
                      {!editing ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            type="button"
                            onClick={handleEdit}
                            className="bg-black h-9 px-4 text-xs"
                          >
                            <Pencil size={12} />
                            Edit profile
                          </Button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="save-cancel"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            type="submit"
                            disabled={isPending}
                            className="h-9 px-4 text-xs rounded-xl"
                          >
                            {isPending ? (
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
                            disabled={isPending}
                            className="h-9 px-4 rounded-xl"
                            variant="outline"
                          >
                            <X size={12} />
                            Cancel
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  className="mx-5 md:mx-8 my-5 h-px bg-slate-100"
                />

                <motion.div
                  variants={fadeUp}
                  className="px-5 md:px-8 pb-8 space-y-4"
                >
                  <AnimatePresence mode="wait">
                    {editing ? (
                      <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        className="space-y-4"
                      >
                        {errors.root && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5"
                          >
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
                          </motion.div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <InputField
                          label="Role"
                          value={formatRole(user?.role)}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <InputField label="User ID" value={`#${user?.id}`} />
                          <InputField
                            label="Member since"
                            value={moment(user?.createdAt).format(
                              "DD MMM YYYY",
                            )}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="viewing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <InputField
                            label="User ID"
                            value={`#${user?.id}`}
                            readOnly
                            muted
                          />
                          <InputField
                            label="Member since"
                            value={moment(user?.createdAt).format(
                              "DD MMM YYYY",
                            )}
                            readOnly
                            muted
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

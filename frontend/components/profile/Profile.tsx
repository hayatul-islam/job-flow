"use client";

import { useRef, useState } from "react";
import { Card } from "../ui/card";

interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string | null;
  createdAt: string;
}

const initialProfile: UserProfile = {
  id: 6,
  firstName: "User",
  lastName: "12",
  email: "user@gmail.com",
  role: "JOB_SEEKER",
  avatar: null,
  createdAt: "2026-04-20T10:41:12.111Z",
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatRole(role: string) {
  return role
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>(initialProfile);
  const [saved, setSaved] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formAvatarPreview, setFormAvatarPreview] = useState<string | null>(
    null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setForm(profile);
    setFormAvatarPreview(avatarPreview);
    setEditing(true);
    setSaved(false);
  };

  const handleCancel = () => {
    setFormAvatarPreview(avatarPreview);
    setEditing(false);
  };

  const handleSave = () => {
    setProfile(form);
    setAvatarPreview(formAvatarPreview);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (editing) {
        setFormAvatarPreview(result);
      } else {
        setAvatarPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleRemoveAvatar = () => {
    if (editing) {
      setFormAvatarPreview(null);
    } else {
      setAvatarPreview(null);
    }
  };

  const currentAvatar = editing ? formAvatarPreview : avatarPreview;
  const currentFirstName = editing ? form.firstName : profile.firstName;
  const currentLastName = editing ? form.lastName : profile.lastName;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-fuchsia-50/20 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <Card className="">
          <div className="px-8 pt-8 pb-6 flex items-start gap-5">
            <div className="relative flex-shrink-0 group">
              <div
                className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200`}
                onClick={() => fileInputRef.current?.click()}
              >
                {currentAvatar ? (
                  <img
                    src={currentAvatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-2xl font-semibold select-none">
                    {getInitials(currentFirstName, currentLastName)}
                  </div>
                )}

                {/* Camera overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-0.5 rounded-[14px]">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-white text-[10px] font-medium">
                    Change
                  </span>
                </div>
              </div>

              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-sm" />

              {currentAvatar && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveAvatar();
                  }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md transition-colors duration-150 z-10"
                  title="Remove photo"
                >
                  <svg
                    className="w-2.5 h-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* Name & role */}
            <div className="flex-1 min-w-0 pt-1">
              <h1 className="text-slate-800 text-xl font-semibold leading-tight truncate">
                {currentFirstName} {currentLastName}
              </h1>
              <p className="text-slate-400 text-sm mt-0.5 truncate">
                {editing ? form.email : profile.email}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-600 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                {formatRole(editing ? form.role : profile.role)}
              </span>
            </div>

            {/* Edit button */}
            {!editing && (
              <button
                onClick={handleEdit}
                className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 hover:bg-violet-50 border border-slate-200 hover:border-violet-300 text-slate-500 hover:text-violet-600 text-sm font-medium transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 0110 16.414H8v-2a2 2 0 01.586-1.414z"
                  />
                </svg>
                Edit
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="mx-8 h-px bg-slate-100" />

          {/* Fields */}
          <div className="px-8 py-6 space-y-4">
            {editing ? (
              <>
                {/* Hint */}
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-violet-50 border border-violet-100 text-violet-500 text-xs">
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Click your avatar or drag & drop an image to update your photo
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <EditField label="First name">
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 rounded-xl px-3.5 py-2.5 text-slate-800 text-sm outline-none transition-all"
                    />
                  </EditField>
                  <EditField label="Last name">
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 rounded-xl px-3.5 py-2.5 text-slate-800 text-sm outline-none transition-all"
                    />
                  </EditField>
                </div>

                <EditField label="Email address">
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 rounded-xl px-3.5 py-2.5 text-slate-800 text-sm outline-none transition-all"
                  />
                </EditField>

                <EditField label="Role">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 rounded-xl px-3.5 py-2.5 text-slate-800 text-sm outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="JOB_SEEKER">Job Seeker</option>
                    <option value="EMPLOYER">Employer</option>
                    <option value="RECRUITER">Recruiter</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </EditField>

                <div className="grid grid-cols-2 gap-4">
                  <EditField label="User ID">
                    <p className="px-3.5 py-2.5 text-slate-400 text-sm bg-slate-50 rounded-xl border border-slate-100 select-none">
                      #{profile.id}
                    </p>
                  </EditField>
                  <EditField label="Member since">
                    <p className="px-3.5 py-2.5 text-slate-400 text-sm bg-slate-50 rounded-xl border border-slate-100 select-none">
                      {formatDate(profile.createdAt)}
                    </p>
                  </EditField>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-200 shadow-md shadow-violet-200"
                  >
                    Save changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-[0.98] border border-slate-200 text-slate-500 hover:text-slate-700 text-sm font-medium transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <InfoCard label="First name" value={profile.firstName} />
                  <InfoCard label="Last name" value={profile.lastName} />
                </div>
                <InfoCard label="Email address" value={profile.email} wide />
                <InfoCard label="Role" value={formatRole(profile.role)} wide />
                <div className="grid grid-cols-2 gap-3">
                  <InfoCard label="User ID" value={`#${profile.id}`} muted />
                  <InfoCard
                    label="Member since"
                    value={formatDate(profile.createdAt)}
                    muted
                  />
                </div>
              </>
            )}
          </div>

          {/* Success toast */}
          {saved && (
            <div className="mx-8 mb-6 flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium">
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Profile updated successfully
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function EditField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  );
}

function InfoCard({
  label,
  value,
  wide = false,
  muted = false,
}: {
  label: string;
  value: string;
  wide?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 ${
        wide ? "col-span-2" : ""
      }`}
    >
      <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
        {label}
      </span>
      <span
        className={`text-sm font-medium truncate ${
          muted ? "text-slate-400" : "text-slate-700"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

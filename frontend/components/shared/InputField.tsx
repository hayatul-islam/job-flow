interface ProfileInputProps {
  label: string;
  value?: string | number;
  editable?: boolean;
  readOnly?: boolean;
  error?: string;
  muted?: boolean;
  registration?: object;
  placeholder?: string;
}

export default function InputField({
  label,
  value,
  editable = false,
  readOnly = false,
  error,
  muted = false,
  registration,
  placeholder,
}: ProfileInputProps) {
  return (
    <div>
      {!readOnly && (
        <label className="block text-[12px] font-medium text-black mb-1.5 uppercase tracking-widest">
          {label}
        </label>
      )}

      {editable ? (
        <>
          <input
            {...registration}
            placeholder={placeholder}
            className="w-full  border border-gray-200 focus:border-black rounded-lg px-3.5 py-2.5 text-black text-sm outline-none transition-all"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </>
      ) : readOnly ? (
        <div className="flex flex-col gap-1 border border-gray-100 bg-gray-100 rounded-xl px-4 py-3">
          <label className="block text-[12px] font-medium text-black mb-1.5 uppercase tracking-widest">
            {label}
          </label>

          <span
            className={`text-sm font-medium truncate ${muted ? "text-gray-400" : "text-gray-500"}`}
          >
            {value !== "" ? value : "—"}
          </span>
        </div>
      ) : (
        <input
          value={value ?? ""}
          disabled
          className="w-full bg-gray-100 border border-gray-100 rounded-lg px-3.5 py-2.5 text-gray-400 text-sm outline-none cursor-not-allowed"
        />
      )}
    </div>
  );
}

import { ChevronDown } from "lucide-react";

interface SelectFieldProps {
  label: string;
  options: { label: string; value: string | number }[];
  error?: string;
  registration?: object;
  placeholder?: string;
}

export default function SelectField({
  label,
  options,
  error,
  registration,
  placeholder,
}: SelectFieldProps) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-black mb-1.5 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        <select
          {...registration}
          defaultValue=""
          className="w-full appearance-none border border-gray-200 focus:border-black rounded-lg px-3.5 py-2.5 text-black text-sm outline-none transition-all bg-white pr-10 cursor-pointer"
        >
          <option value="" disabled>
            {placeholder || `Select ${label}`}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={15}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

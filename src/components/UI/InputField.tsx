import React from "react";

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  type: string;
  large?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function InputField({
  label,
  placeholder,
  value,
  type,
  large = false,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {large ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={4}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
      )}
    </div>
  );
}

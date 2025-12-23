// components/InputField.jsx
export function InputField({ label, type = "text", register, error }:any) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        {...register}
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          border-gray-300 dark:border-gray-700
          focus:ring-2 focus:ring-indigo-500
          ${error ? "border-red-500" : ""}`}
      />

      {error && (
        <p className="text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
}

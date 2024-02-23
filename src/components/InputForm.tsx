type Props = {
  name: string;
  type?: "text" | "number" | "date";
  labelName?: string;
  placeholder?: string;
  maxLength?: number;
  max?: string | number | undefined;
  required?: boolean;
  validateTyping?: RegExp;
};

export default function InputForm({
  name,
  type = "text",
  labelName,
  placeholder,
  maxLength,
  max,
  required,
  validateTyping,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {!!labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        className={
          "px-2 py-1 border border-slate-200 bg-slate-100 placeholder:text-slate-300 outline-none focus:ring-2 ring-sky-400 ring-offset-1 rounded transition"
        }
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        maxLength={maxLength}
        max={max}
        onKeyPress={(e) => {
          if (!validateTyping?.test(e.key) && validateTyping) {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
}

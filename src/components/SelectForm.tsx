type Props = {
  options: { optionName: string; value: string }[];
  name: string;
  labelName?: string;
  required?: boolean;
  defaultValueName?: string;
};

export default function InputForm({
  options,
  name,
  labelName,
  required,
  defaultValueName,
}: Props) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {!!labelName && (
        <label htmlFor={name}>
          {labelName} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <select
        className={
          "px-2 py-1 border border-slate-200 bg-slate-100 placeholder:text-slate-300 outline-none focus:ring-2 ring-sky-400 ring-offset-1 rounded transition"
        }
        name={name}
        id={name}
        defaultValue={defaultValueName}
      >
        {!!defaultValueName && (
          <option value={defaultValueName} disabled hidden>
            {defaultValueName}
          </option>
        )}
        {options.map(({ value, optionName }) => (
          <option key={optionName} value={value}>
            {optionName}
          </option>
        ))}
      </select>
    </div>
  );
}

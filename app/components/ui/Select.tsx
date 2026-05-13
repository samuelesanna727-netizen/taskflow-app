"use client";

type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
};

export default function Select({
  value,
  onChange,
  options,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        bg-black
        border
        border-white/5
        hover:border-[#2DD4BF]/50
        text-[11px]
        pl-4
        pr-10
        py-2.5
        rounded-xl
        text-gray-400
        outline-none
        font-bold
        transition-all
        appearance-none
        cursor-pointer
      "
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}
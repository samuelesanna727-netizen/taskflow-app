"use client";

import { Priority } from "@/app/context/TaskContext";

type Props = {
  priority: Priority;
};

export default function PriorityDot({
  priority,
}: Props) {
  const colors = {
    I: "bg-red-500",
    II: "bg-yellow-500",
    III: "bg-gray-500",
  };

  return (
    <span
      className={`w-1.5 h-1.5 rounded-full ${colors[priority]}`}
    />
  );
}
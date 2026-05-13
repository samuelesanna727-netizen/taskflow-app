"use client";

import {
  Priority,
  Category,
} from "@/app/context/TaskContext";

import Button from "../ui/Button";
import Select from "../ui/Select";

type Props = {
  text: string;
  setText: (text: string) => void;

  priority: Priority;
  setPriority: (priority: Priority) => void;

  category: Category;
  setCategory: (category: Category) => void;

  onAdd: () => void;
};

export default function TaskInput({
  text,
  setText,

  priority,
  setPriority,

  category,
  setCategory,

  onAdd,
}: Props) {
  return (
    <div className="bg-[#0A0A0A] p-4 rounded-[1.5rem] border border-white/5 mb-10">
      <div className="bg-[#0D0D0D] p-2 rounded-[1.2rem] flex flex-col lg:flex-row gap-3 items-center border border-white/5">
        
        <div className="relative flex-1 w-full">
          <input
            value={text}
            maxLength={50}
            onChange={(e) =>
              setText(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" && onAdd()
            }
            placeholder="Add a new task..."
            className="
              w-full
              bg-transparent
              border-none
              outline-none
              px-6
              py-2
              text-sm
              text-gray-300
              placeholder:text-gray-700
              font-medium
            "
          />

          {text.length > 40 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-mono text-gray-600">
              {text.length}/50
            </span>
          )}
        </div>

        <div className="flex w-full lg:w-auto gap-2 pr-2">
          
          <Select
            value={priority}
            onChange={(value) =>
              setPriority(value as Priority)
            }
            options={[
              {
                label: "High",
                value: "I",
              },
              {
                label: "Medium",
                value: "II",
              },
              {
                label: "Low",
                value: "III",
              },
            ]}
          />

          <Select
            value={category}
            onChange={(value) =>
              setCategory(value as Category)
            }
            options={[
              {
                label: "Personal",
                value: "Personal",
              },
              {
                label: "Work",
                value: "Work",
              },
              {
                label: "Shopping",
                value: "Shopping",
              },
              {
                label: "Health",
                value: "Health",
              },
              {
                label: "Learning",
                value: "Learning",
              },
            ]}
          />

          <Button onClick={onAdd}>
            <>
              <span className="text-xl leading-none">
                +
              </span>

              <span>Add</span>
            </>
          </Button>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Button } from "../shadcn/ui/button";
import { cn } from "@/lib/shadcn/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/shadcn/ui/command";
import { formatSubjectName } from "@/lib/utils";
import { Subject } from "@prisma/client";

interface Props {
  subjects: Subject[];
  selectedSubject?: Subject | "Any";
  onSubjectChange: (value: Subject | "Any") => void;
}

export default function TableFilterSubject({
  subjects,
  selectedSubject,
  onSubjectChange,
}: Props) {
  const [openSubjects, setOpenSubjects] = React.useState(false);

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label className="text-primary-white text-xs">Subject</label>
      <Popover open={openSubjects} onOpenChange={setOpenSubjects}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "flex justify-between bg-primary-black w-full overflow-ellipsis hover:text-primary-white hover:bg-primary-black truncate text-overflow-ellipsis",
            )}
          >
            {!selectedSubject || selectedSubject === "Any"
              ? "Any"
              : formatSubjectName(selectedSubject)}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="bg-primary-black text-primary-white w-full max-sm:max-w-[375px] max-h-[400px] overflow-auto">
          <Command
            filter={(value, search) => {
              return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;
            }}
            className="bg-primary-black text-primary-white"
          >
            <CommandInput placeholder="Search subjects..." className="h-9" />
            <CommandEmpty>No subject found</CommandEmpty>
            <CommandGroup className="bg-primary-black text-primary-white">
              <CommandItem
                value="Any"
                key="Any"
                onSelect={() => onSubjectChange("Any")}
              >
                Any
              </CommandItem>
              {subjects.map((subject: any) => (
                <CommandItem
                  value={formatSubjectName(subject)}
                  key={subject.code}
                  onSelect={() => {
                    onSubjectChange(subject);
                    setOpenSubjects(false);
                  }}
                >
                  {formatSubjectName(subject)}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      subject.name === selectedSubject
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

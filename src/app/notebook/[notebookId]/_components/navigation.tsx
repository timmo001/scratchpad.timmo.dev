"use client";
import { NotebookText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { type Page } from "~/lib/types";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

export function Navigation({
  notebookId,
  pages,
  selectedPage,
  onNewPage,
}: {
  notebookId: number;
  pages: Array<Page>;
  selectedPage: number | null;
  onNewPage: () => void;
}) {
  return (
    <Command className="flex max-h-[72vh] w-[248px] flex-col rounded-b-lg rounded-t-xl border">
      <CommandInput placeholder="Search" />
      <CommandList>
        <CommandGroup heading="Pages">
          <CommandEmpty>No pages found.</CommandEmpty>
          <CommandItem aria-selected={false} onSelect={onNewPage}>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Page</span>
          </CommandItem>
          {pages.map((page) => (
            <Item
              key={page.id}
              notebookId={notebookId}
              page={page}
              selected={selectedPage === page.id}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Item({
  notebookId,
  page,
  selected,
}: {
  notebookId: number;
  page: Page;
  selected: boolean;
}) {
  const router = useRouter();

  return (
    <CommandItem
      key={page.id}
      className={`${selected ? "bg-accent/50" : ""} hover:bg-accent-hover`}
      onSelect={() => {
        router.push(`/notebook/${notebookId}/page/${page.id}`);
      }}
    >
      <NotebookText className="mr-2 h-4 w-4" />
      <span>{page.title}</span>
    </CommandItem>
  );
}

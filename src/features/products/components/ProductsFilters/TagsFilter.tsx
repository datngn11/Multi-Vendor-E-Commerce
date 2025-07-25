"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTRPC } from "@/trpc/client";

import { FilterSchema } from "../../schemas";

interface IProps {
  onParamChange: (key: TagFilterKey, value: string[]) => void;
  selectedTags: null | string[];
}

type TagFilterKey = keyof Pick<FilterSchema, "tags">;

export const TagsFilter = ({ onParamChange, selectedTags }: IProps) => {
  const trpc = useTRPC();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      trpc.tags.getMany.infiniteQueryOptions(
        {},
        {
          getNextPageParam: ({ nextPage }) => nextPage,
        },
      ),
    );

  const handleTagChange = (name: string) => {
    const newTags = selectedTags?.includes(name)
      ? selectedTags.filter((tagName) => tagName !== name)
      : [...(selectedTags || []), name];

    onParamChange("tags", newTags);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderCircleIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages.map((page) =>
          page.docs.map((tag) => (
            <div
              className="flex w-full items-center justify-between"
              key={tag.id}
            >
              <Label className="w-full cursor-pointer" htmlFor={tag.id}>
                {tag.name}
              </Label>

              <Checkbox
                checked={selectedTags?.includes(tag.name)}
                id={tag.id}
                onCheckedChange={() => handleTagChange(tag.name)}
                value={tag.id}
              />
            </div>
          )),
        )
      )}

      {hasNextPage && (
        <Button
          className="text-foreground"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          size="link"
          variant="link"
        >
          Load more...
        </Button>
      )}
    </div>
  );
};

"use client";

import { sorting } from "@/lib/constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useSearchParams, usePathname } from "next/navigation";
import { createUrl } from "@/lib/utils";

export const SortSelect = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedSort = searchParams.get("sort") as string || "";

    const handleSortChange = (selectedSort: string) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("sort", selectedSort);
        const newUrl = createUrl(pathname, newParams);
        window.history.pushState({}, "", newUrl);
    };

    return (
        <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                {sorting?.map((option) => (
                    <SelectItem key={option.slug} value={option.slug!}>
                        {option.title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

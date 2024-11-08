import { sorting } from "@/lib/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select"

type Props = {
    currentSort: string
}
export const SortSelect = ({ currentSort }: Props) => {
    return (
        <Select value={currentSort}
        // onValueChange={onSortChange}
        >
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
    )
}
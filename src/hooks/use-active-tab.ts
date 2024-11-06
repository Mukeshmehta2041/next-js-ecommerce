import { useQueryState, parseAsString } from "nuqs";

export const useActiveTab = () => {
    const [activeTab, setActiveTab] = useQueryState("selected", parseAsString.withDefault("order-history").withOptions({
        clearOnDefault: true
    }));

    return {
        activeTab,
        setActiveTab
    }
};

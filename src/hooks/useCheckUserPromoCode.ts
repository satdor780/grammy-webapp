import { useQuery } from "@tanstack/react-query";
import { checkUserPromoCode } from "../api";

export function useCheckUserPromoCode(initData: string) {
  return useQuery({
    queryKey: ["getCommunity", initData],
    queryFn: () => checkUserPromoCode(initData),
    enabled: !!initData,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}

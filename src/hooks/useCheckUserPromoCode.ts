import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { checkUserPromoCode, type CheckUserPromoCodeResponse } from "../api";

// export function useCheckUserPromoCode(initData: string) {
//   return useQuery({
//     queryKey: ["getCommunity", initData],
//     queryFn: () => checkUserPromoCode(initData),
//     enabled: !!initData,
//     staleTime: 0,
//     refetchOnWindowFocus: false,
//   });
// }

export function useCheckUserPromoCode(
  options?: Omit<
    UseMutationOptions<CheckUserPromoCodeResponse | null, Error, string>,
    "mutationFn"
  >,
) {
  return useMutation({
    mutationFn: (initData: string) => checkUserPromoCode(initData),
    ...options,
  });
}

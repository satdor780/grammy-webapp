import { useCheckUserPromoCode } from "../../../../hooks";
import { useTelegramStore } from "../../../../store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shadcn/ui/card";
import { Badge } from "../../../shadcn/ui/badge";
import couponIcon from "/icons/coupon.svg";

function formatExpiration(expiresAt?: string | null): string | null {
  if (!expiresAt) return null;

  const date = new Date(expiresAt);
  if (Number.isNaN(date.getTime())) return null;

  return date.toLocaleString("ru-RU", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const PromoCode = () => {
  const initData = useTelegramStore((state) => state.initData);
  const { data, isLoading, isError } = useCheckUserPromoCode(initData || "");

  if (!initData) return null;

  if (isLoading || isError || !data || !data.valid || !data.promoCode) {
    return null;
  }

  const promoCode = data.promoCode

  // const promoCode = response.promoCode

  if(!promoCode) return

  const discountLabel =
    promoCode.discount != null
      ? promoCode.discountType === "percent"
        ? `${promoCode.discount}%`
        : `${promoCode.discount}$`
      : null;

  const formattedExpiration = formatExpiration(promoCode.expiresAt);

  return (
    // <p>{JSON.stringify(promoCode)}{JSON.stringify(isError)}</p>
    <Card className="w-full max-w-[450px] bg-[#040404] border text-emerald-50 py-4 gap-5">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 px-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20">
          <img src={couponIcon} alt="minus" className="h-[20px]" />
        </div>
        <div>
          <CardTitle className="text-sm uppercase tracking-wide">
            Активирован промокод
            {/* <p>{JSON.stringify(promoCode.appliesToProducts)}{JSON.stringify(isError)}</p> */}
          </CardTitle>
          <CardDescription className="text-xs text-white">
            {promoCode.name}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3 pt-0 px-4">
        <div className="space-y-1 text-xs text-muted-foreground">
          {discountLabel && (
            <p>
              Скидка:{" "}
              <span className="font-semibold text-white">
                {discountLabel}
              </span>
            </p>
          )}
          {formattedExpiration && (
            <p>
              Действует до{" "}
              <span className="font-medium text-white">
                {formattedExpiration}
              </span>
            </p>
          )}
        </div>
        <Badge
          variant="outline"
          className="border bg-[#040404] text-white"
        >
          {promoCode.name}
        </Badge>
      </CardContent>
    </Card>
  );
}
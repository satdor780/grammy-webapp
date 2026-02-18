import { useCheckUserPromoCode } from "../../../../hooks";
import { useTelegramStore } from "../../../../store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../shadcn/ui/card";
import { Badge } from "../../../shadcn/ui/badge";

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

  const discountLabel =
    data.discount != null
      ? data.discountType === "percent"
        ? `${data.discount}%`
        : `${data.discount}$`
      : null;

  const formattedExpiration = formatExpiration(data.expiresAt);

  return (
    <Card className="w-full max-w-[450px] bg-emerald-900/40 border-emerald-500/40 text-emerald-50">
      <CardHeader className="flex flex-row items-center gap-3 pb-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20">
          <span className="text-lg">🏷️</span>
        </div>
        <div>
          <CardTitle className="text-sm uppercase tracking-wide">
            Активирован промокод
          </CardTitle>
          <CardDescription className="text-xs text-emerald-100/80">
            {data.name || data.promoCode}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-3 pt-0">
        <div className="space-y-1 text-xs text-muted-foreground">
          {discountLabel && (
            <p>
              Скидка:{" "}
              <span className="font-semibold text-emerald-200">
                {discountLabel}
              </span>
            </p>
          )}
          {formattedExpiration && (
            <p>
              Действует до{" "}
              <span className="font-medium text-emerald-200">
                {formattedExpiration}
              </span>
            </p>
          )}
        </div>
        <Badge
          variant="outline"
          className="border-emerald-400/60 bg-emerald-500/10 text-emerald-50"
        >
          {data.promoCode}
        </Badge>
      </CardContent>
    </Card>
  );
}
import { useEffect, useState } from "react";
import { useInit } from "../../../hooks/useInit";
import { useBasketStore, useTelegramStore } from "../../../store";
import { ProductCard, PromoCode } from "./components";
import { Skeleton } from "../../shadcn/ui/skeleton";
import { Alert, AlertDescription } from "../../shadcn/ui/alert";
import { Button } from "../../shadcn/ui/button";
import usdtIcon from "/icons/usdt.svg";
import { submitOrder } from "../../../api/submitOrder";
import { useCheckUserPromoCode } from "../../../hooks";
import { Spinner } from "../../shadcn/ui/spinner";

export const Products = () => {
  const initData = useTelegramStore((state) => state.initData);

  const { mutate, data, isPending, isError, error } = useInit();
  const { mutate: promoMutate, data: promoCodeData, isPending: promoCodeIsLoading } = useCheckUserPromoCode();

  useEffect(() => {
    if (initData) {
      mutate(initData);
      promoMutate(initData)
    }
  }, [initData, mutate, promoMutate]);

  const products = data?.products ?? [];

  const totalPrice = useBasketStore((s) => s.getTotalPrice(products));
  const totalItems = useBasketStore((s) => s.getTotalItems());
  const basketItems = useBasketStore((s) => s.items);
  const clearBasket = useBasketStore((s) => s.clearBasket);
  const hasItems = totalItems > 0;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const tg = window.Telegram?.WebApp;

  const handleCloseOrBuy = async () => {
    if (tg && hasItems) {
      try {
        setIsSubmitting(true);
        await submitOrder({
          initData: initData ?? "",
          items: basketItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
          totalPrice,
        });
        clearBasket();
        tg.close();
      } catch (e) {
        console.error("Failed to submit order", e);
        setIsSubmitting(false);
      }
      return;
    }
    if (tg) {
      tg.close();
    }
  };

  const handleClose = () => {
    if (tg) {
      tg.close();
    }
  };

  if(promoCodeIsLoading || isPending){
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Spinner className="size-8"/>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center px-4 py-5 gap-4 pb-[100px]">

      <div className="flex items-center justify-between w-full">
        <h1 className="gothic-font text-xl uppercase">Mailzy</h1>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-white leading-none">
            Balance:
          </span>

          <div className="flex items-center gap-1 text-sm text-white leading-none">
            <img src={usdtIcon} alt="USDT" className="w-[18px] h-[18px]" />
            <b>
              {data?.userBalance
                ? data.userBalance.toFixed(2)
                : "Не удалось получить баланс"}
              $
            </b>
          </div>
        </div>
      </div>
      {isPending && (
        <div className="w-full max-w-[450px] space-y-3">
          <Skeleton className="h-[260px] w-full rounded-xl" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-9 w-full" />
        </div>
      )}

      {isError && (
        <Alert variant="destructive" className="max-w-[450px]">
          <AlertDescription>
            {error && error?.message || "Failed to load products"}
          </AlertDescription>
        </Alert>
      )}
      
      {!isPending && !isError && products.length === 0 && (
        <p className="text-sm text-muted-foreground">Products not found</p>
      )}

      {promoCodeData && <PromoCode promoCode={promoCodeData.promoCode} />}

      {!isPending &&
        !isError &&
        products.map((product) => {
          const productCount = data?.warehouse.find(
            (e) => e.productId === product.id,
          );
          const promo = promoCodeData?.promoCode?.appliesToProducts
  ?.filter((pr) => pr.slug === product.slug)[0]

          return (
            <ProductCard
              key={product.id}
              product={product}
              available={productCount?.available}
              isAdmin={!!data?.user.isAdmin}
              promo={promo}
              promoCode={promoCodeData?.promoCode}
            />
          );
        })}

      {!data?.user.isAdmin && !isPending && !isError && (
        <div className="fixed w-full px-5 py-0 bottom-10 left-0 right-0">
          <Button
            className="w-full bg-white h-[40px] text-black"
            onClick={handleCloseOrBuy}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "..."
              : !hasItems
                ? "Закрыть"
                : `Buy Now ${totalPrice.toFixed(2)}$`}
          </Button>
        </div>
      )}
      {data?.user.isAdmin && (
        <div className="fixed w-full px-5 py-0 bottom-10 left-0 right-0">
          <Button
            className="w-full bg-white h-[40px] text-black"
            onClick={handleClose}
          >
            Закрыть
          </Button>
        </div>
      )}
    </div>
  );
};

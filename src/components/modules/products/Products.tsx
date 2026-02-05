import { useEffect } from "react";
import { useInit } from "../../../hooks/useInit";
import { useBasketStore, useTelegramStore } from "../../../store";
import { ProductCard } from "./components";
import { Skeleton } from "../../shadcn/ui/skeleton";
import { Alert, AlertDescription } from "../../shadcn/ui/alert";
import { Button } from "../../shadcn/ui/button";
import usdtIcon from "/icons/usdt.svg";



export const Products = () => {
  const initData = useTelegramStore((state) => state.initData);
  // const user = useTelegramStore(state => state.user)

  const {
    mutate,
    data,
    isPending,
    isError,
    error,
  } = useInit();

  useEffect(() => {
    if (initData) {
      mutate(initData);
    }
  }, [initData, mutate]);

  // const products = data?.products ?? [];
  const products = data?.products ?? []

  const totalPrice = useBasketStore((s) => s.getTotalPrice(products));
  const totalItems = useBasketStore((s) => s.getTotalItems());
  const hasItems = totalItems > 0;

  const tg = window.Telegram?.WebApp;

  const handleClose = () => {
    if(hasItems) alert('not close app');
    if (tg) {
      tg.close();
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-5 gap-4 pb-[100px]">
      <div className="flex items-center justify-between w-full">
        <h1 className="gothic-font text-xl uppercase">
          Mailzy
        </h1>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm text-white leading-none">
            Balance:
          </span>
          
          <div className="flex items-center gap-1 text-sm text-white leading-none">
            <img 
              src={usdtIcon} 
              alt="USDT" 
              className="w-[18px] h-[18px]" 
            />
            <b>{data?.userBalance}$</b>
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
            {error?.message || "Failed to load products"}
          </AlertDescription>
        </Alert>
      )}

      {!isPending && !isError && products.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Products not found
        </p>
      )}


      {!isPending &&
        !isError &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      {!isPending &&
        !isError && (
        <div className="fixed w-full px-5 py-0 bottom-10 left-0 right-0">
          <Button className="w-full bg-white h-[40px] text-black" onClick={handleClose}>
            {!hasItems ? 'Закрыть' : (
                `Buy Now ${totalPrice.toFixed(2)}$`
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

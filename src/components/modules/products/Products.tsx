import { useEffect } from "react";
import { useInit } from "../../../hooks/useInit";
import { useTelegramStore } from "../../../store";
import { ProductCard } from "./components";
import { Skeleton } from "../../shadcn/ui/skeleton";
import { Alert, AlertDescription } from "../../shadcn/ui/alert";



export const Products = () => {
  const initData = useTelegramStore((state) => state.initData);

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

  const products = data?.products ?? [];


  return (
    <div className="flex flex-col items-center px-4 py-5 gap-4">
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
    </div>
  );
};

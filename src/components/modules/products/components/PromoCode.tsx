import { useCheckUserPromoCode } from "../../../../hooks";
import { useTelegramStore } from "../../../../store";

export const PromoCode = () => {
    const initData = useTelegramStore((state) => state.initData);
    const {data, error} = useCheckUserPromoCode(initData)

    return (
        <p>{JSON.stringify(data)}{JSON.stringify(error)}</p>
    )
}
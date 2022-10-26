import { useEffect, useState } from "react";
import InputRange from "components/atomics/inputs/InputRange";
import Offer from "types/entities/Offer";
import * as S from "./styles";

export type Props = {
  offers: Offer[];
  currentOffer: Offer;
  onOfferChange: (event: any) => void;
  showAvailableValues?: boolean;
};

function OfferSelectionSection({
  offers,
  currentOffer,
  onOfferChange,
  showAvailableValues = false,
}: Props): JSX.Element {
  const [maxRange, setMaxRange] = useState(0);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    setMaxRange(offers.length - 1);
  }, [offers]);

  useEffect(() => {
    const index = offers.findIndex((offer) => offer.id === currentOffer.id);
    setCurrentOfferIndex(index);
  }, [currentOffer, offers]);

  const isIndexAfterThumb = (index: number) => index <= currentOfferIndex;

  return (
    <S.Container>
      <InputRange
        value={currentOfferIndex}
        min={0}
        max={maxRange}
        onChange={onOfferChange}
      />
      {showAvailableValues && (
        <S.AvailableValues>
          {offers.map((offer, index) => (
            <S.AvailableValue
              isAfterThumb={isIndexAfterThumb(index)}
              key={offer.id}
            >
              {offer.price}
            </S.AvailableValue>
          ))}
        </S.AvailableValues>
      )}
    </S.Container>
  );
}

export default OfferSelectionSection;

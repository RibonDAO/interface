import impressionCardsApi from "services/api/impressionCardsApi";
import ImpressionCard from "types/entities/ImpressionCard";

function useImpressionCards() {
  async function getImpressionCard(id: any) {
    const { data: impressionCard } = await impressionCardsApi.getImpressionCard(
      id,
    );

    return impressionCard as ImpressionCard;
  }

  return {
    getImpressionCard,
  };
}

export default useImpressionCards;

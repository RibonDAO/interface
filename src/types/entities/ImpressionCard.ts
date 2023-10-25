export default interface ImpressionCard {
  id?: number;
  headline: string;
  title: string;
  description: string;
  videoUrl?: string;
  ctaText: string;
  ctaUrl: string;
  image?: any;
  active: boolean;
  client: string;
}

export default interface ImpressionCard {
  id?: number;
  headline: string;
  title: string;
  description: string | JSX.Element;
  videoUrl?: string;
  ctaText: string;
  ctaUrl: string;
  image?: any;
  active: boolean;
  client?: string;
}

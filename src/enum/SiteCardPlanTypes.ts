export interface CardPlanProps {
  destaque?: "popular" | "recomendado" | "custom" | undefined;
  title: string;
  subtitle: string;
  pricesPrevious?: { "1": string; "6": string; "12": string };
  currentPrices?: { "1": string; "6": string; "12": string };
  discounts?: { "1": string; "6": string; "12": string };
  features?: { texto: string; ativo: boolean }[];
  href?: string;
}

export interface CardsProps {
  plan: CardPlanProps;
  duration: "1" | "6" | "12";
}

export enum SiteCardPlanType {
  POPULAR = "popular",
  RECOMENDADO = "recomendado",
  CUSTOM = "custom",
}

export enum PlanDuration {
  ONE_MONTH = "1",
  SIX_MONTHS = "6",
  TWELVE_MONTHS = "12",
}

export const PlanDurationLabels: Record<PlanDuration, string> = {
  [PlanDuration.TWELVE_MONTHS]: "12 meses",
  [PlanDuration.SIX_MONTHS]: "6 meses",
  [PlanDuration.ONE_MONTH]: "1 mês",
};

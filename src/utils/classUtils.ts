export function getToggleButtonClass(isActive: boolean): string {
  const base = "w-full border-site-primary_dark ";

  const active =
    " bg-site-primary_dark text-site-bg_default hover:!bg-transparent hover:!text-site-primary_dark";

  const inactive =
    "border bg-transparent text-site-primary_dark hover:!bg-site-primary_dark hover:!text-site-bg_default";

  return `${base} ${isActive ? active : inactive}`;
}

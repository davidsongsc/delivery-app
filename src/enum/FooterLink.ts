import { ReactNode } from "react";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkIcon {
  icon: ReactNode;
  href: string;
}

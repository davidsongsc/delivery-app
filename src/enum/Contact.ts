export interface ContactOptionProps {
  title: string;
  info: string;
  href: string;
  target: "_blank" | "_self";
  icon: string;
}

export const contactOptions: ContactOptionProps[] = [
  {
    title: "Phone",
    info: "(21) 00000-0000",
    href: 'tel:+5521000000000"',
    target: "_self",
    icon: "./images/site/phone.svg",
  },
  {
    title: "WhatsApp",
    info: "(21) 00000-0000",
    href: "https://wa.me/5521000000000",
    target: "_blank",
    icon: "./images/site/whatsapp.svg",
  },
  {
    title: "E-mail",
    info: "contato@empresa.com.br",
    href: "mailto:contato@empresa.com.br",
    target: "_self",
    icon: "./images/site/email.svg",
  },
];

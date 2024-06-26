import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Public Group Chat",
  description: "Chat app by Saraan Asim",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children
}

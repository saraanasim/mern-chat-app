import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { PeopleSection } from "./_components/people.section";
import { GroupsSection } from "./_components/groups.section";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chat Board",
    description: "Chat app by Saraan Asim",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex flex-col md:grid md:grid-cols-12 gap-4 h-screen overflow-hidden">
                    <PeopleSection />
                    {children}
                    <GroupsSection />
                </main>
            </body>
        </html>
    );
}

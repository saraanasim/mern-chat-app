import ReduxProvider from "@/providers/redux-provider";
import type { Metadata } from "next";
import { GroupsSection } from "./_components/groups.section";
import { PeopleSection } from "./_components/people.section";


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
        <ReduxProvider>
            <main className="flex flex-col md:grid md:grid-cols-12 gap-4 h-screen overflow-hidden">
                <PeopleSection />
                {children}
                <GroupsSection />
            </main>
        </ReduxProvider>
    );
}

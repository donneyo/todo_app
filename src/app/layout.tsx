'use client';  // ✅ Make this whole file a Client Component

import Sidebar from '@/app/components/Sidebar';
import Header from '@/components/header';
import '@/app/styles/globals.css';
import { ReactNode } from 'react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <ThemeProvider>
            <ContentWrapper>{children}</ContentWrapper>
        </ThemeProvider>
        </body>
        </html>
    );
}

function ContentWrapper({ children }: { children: ReactNode }) {
    const { theme } = useTheme();

    return (
        <div className={`flex min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-[#1F1F22] text-white'}`}>
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}

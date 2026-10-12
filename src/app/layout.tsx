import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PitchTrainer — Treino de Ouvido Gamificado para Violão e Guitarra',
  description: 'Aprenda a reconhecer notas e acordes de ouvido com samples autênticos de violão acústico e estilo gamificado Duolingo.',
  keywords: ['pitch trainer', 'treino de ouvido', 'violão', 'guitarra', 'percepção musical', 'duolingo música'],
  authors: [{ name: 'PitchTrainer Team' }],
};

export const viewport: Viewport = {
  themeColor: '#0B0F19',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0F19] text-slate-100 min-h-screen flex flex-col antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}

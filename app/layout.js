import './globals.css';

export const metadata = {
  title: 'EventCraft Phuket - ระบบวางแผนและออกแบบงานจัดเลี้ยง',
  description: 'ระบบวางแผนและคำนวณงบประมาณจัดเลี้ยงอัจฉริยะในจังหวัดภูเก็ต',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-kanit antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
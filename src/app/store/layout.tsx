export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`mx-auto w-full max-w-lg overflow-x-hidden  `}>
        <div className="">{children}</div>
      </body>
    </html>
  );
}

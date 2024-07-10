export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>{children}</div>
    // <html lang="en">
    //   <body className="">
    //     <main>{children}</main>
    //   </body>
    // </html>
  );
}

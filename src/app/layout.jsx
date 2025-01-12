import "./globals.css";
import common from "@components/common";

export const metadata = {
  title: "LyteMaster",
  description: "World class range of lighting solutions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="border">
        <common.Nav />
        {children}
        <common.Footer />
      </body>
    </html>
  );
}

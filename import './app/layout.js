import './globals.css';

export const metadata = {
  title: 'ConstructIQ Dashboard',
  description: 'AI Risk Intelligence Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

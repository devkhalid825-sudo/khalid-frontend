import './uk.css';

export const metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function UkLayout({ children }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="uk-zone">{children}</div>
    </>
  );
}

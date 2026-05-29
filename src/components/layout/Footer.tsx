export default function Footer() {
  return (
    <footer className="bg-forest text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-serif text-lg font-bold mb-1">Latter House Life</p>
        <p className="text-mint/80 text-sm">
          Moving forward together in faith and community.
        </p>
        <p className="text-white/40 text-xs mt-4">
          &copy; {new Date().getFullYear()} Latter House Life. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

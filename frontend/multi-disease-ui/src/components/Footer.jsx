const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} MedPredict AI — Intelligent Disease Prediction System
        </p>
      </div>
    </footer>
  );
};

export default Footer;
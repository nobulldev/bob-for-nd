import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";
import { getCookie, setCookie } from "@/lib/cookies";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    const consent = getCookie("campaign-cookie-consent");
    if (!consent) {
      // Small delay to make the entrance look more natural
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setCookie("campaign-cookie-consent", "accepted", 365); // 1 year
    setIsVisible(false);
  };

  const handleDecline = () => {
    setCookie("campaign-cookie-consent", "declined", 30); // 30 days
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md bg-[#031f51]/95 backdrop-blur-md text-[#f5efe4] border border-[#fed648]/20 p-3 rounded shadow-2xl z-[9999] flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="flex gap-3 items-start">
        <div className="p-2 bg-[#fed648]/10 text-[#fed648] rounded-full shrink-0">
          <Cookie className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-['Playfair_Display'] font-bold text-lg text-[#fed648]">
            Cookies & Privacy
          </h4>
          <p className="text-sm text-[#f5efe4]/90 leading-relaxed font-sans">
            We use cookies to improve your browsing experience and analyze our traffic.
            By clicking &ldquo;Accept All&rdquo;, you agree to the use of cookies on our website.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={handleDecline}
          className="font-['Oswald'] tracking-wider text-xs uppercase px-4 py-2.5 border border-[#f5efe4]/30 hover:border-[#faf5ea] hover:bg-[#faf5ea]/10 text-[#f5efe4] transition-all duration-200 rounded-sm cursor-pointer"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="font-['Oswald'] tracking-wider text-xs uppercase px-5 py-2.5 bg-[#bf1e2e] hover:bg-[#a51a27] text-white transition-all duration-200 rounded-sm font-semibold shadow-lg shadow-[#bf1e2e]/20 cursor-pointer"
        >
          Accept All
        </button>
      </div>
    </div>
  );
};

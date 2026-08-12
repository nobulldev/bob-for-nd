declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env.GA_MEASUREMENT_ID || '';

/**
 * Initializes Google Analytics script and dataLayer
 */
export const initGA = (measurementId?: string): void => {
  const id = measurementId || GA_MEASUREMENT_ID;
  if (!id || typeof window === 'undefined') {
    console.log("Measurement ID not found");
    return;
  }

  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', id);

  console.log("GA Initialized!");
};

/**
 * Tracks a page view in Google Analytics
 */
export const trackPageView = (url: string, measurementId?: string): void => {
  const id = measurementId || GA_MEASUREMENT_ID;
  if (typeof window !== 'undefined' && window.gtag && id) {
    window.gtag('config', id, {
      page_path: url,
    });
  }
};

/**
 * Tracks a custom event in Google Analytics
 */
export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

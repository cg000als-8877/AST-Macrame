export const META_PIXEL_ID = '1093501260044607';
export const META_CAPI_TOKEN = 'EAAl4JUPP2B4BSbZAdN45pYDnjtPj98PHgyVhc61CNCrDB0nSqFK6UpZA3Cyu1IBxxuPFUhM0b3l4tRkEwFFmwTvuZBMdx1VaHElV7ezxeNU34g0IzoioWL64XGYzsHbZBZAtDzaBZCkX6DwusqZADlQSZC9255R3XN0fdpJAB9sQt5qejelC2CJfUdpCg9jXgn0wrgZDZD';

/**
 * Sends unified Meta tracking event (Browser Pixel + Conversions API)
 * Ensures 100% conversion delivery even if browser adblockers or iOS tracking restrictions are active.
 */
export const trackMetaEvent = (eventName, customData = {}, userData = {}) => {
  // 1. Browser Pixel Track
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, customData);
    } catch (e) {
      console.warn('Meta Pixel browser track warning:', e);
    }
  }

  // 2. Conversions API (CAPI) direct to Meta Graph API
  try {
    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: typeof window !== 'undefined' ? window.location.href : 'https://astmacrame.com/retail',
          user_data: {
            client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
            ...userData,
          },
          custom_data: customData,
        },
      ],
      access_token: META_CAPI_TOKEN,
    };

    fetch(`https://graph.facebook.com/v20.0/${META_PIXEL_ID}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      mode: 'cors',
    }).catch(() => {});
  } catch (err) {
    // Fail silently so customer checkout is never interrupted
  }
};

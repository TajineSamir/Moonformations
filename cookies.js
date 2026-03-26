// Moon Formations — Gestion des cookies RGPD

(function() {

  const COOKIE_NAME = 'mf_consent';
  const COOKIE_DURATION = 365; // jours

  // Lire le consentement
  function getConsent() {
    const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
    return match ? match[2] : null;
  }

  // Sauvegarder le consentement
  function setConsent(value) {
    const date = new Date();
    date.setTime(date.getTime() + (COOKIE_DURATION * 24 * 60 * 60 * 1000));
    document.cookie = COOKIE_NAME + '=' + value + ';expires=' + date.toUTCString() + ';path=/;SameSite=Lax';
  }

  // Activer Google Analytics
  function enableAnalytics() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }

  // Désactiver Google Analytics
  function disableAnalytics() {
    window['ga-disable-G-QLVXW8SR63'] = true;
  }

  // Créer la bannière
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
      <div class="cb-inner">
        <div class="cb-text">
          <strong>🍪 Nous utilisons des cookies</strong>
          <p>Moon Formations utilise Google Analytics pour mesurer l'audience de son site et améliorer votre expérience. Vos données restent anonymisées.</p>
        </div>
        <div class="cb-actions">
          <button id="cb-accept" class="cb-btn cb-btn-accept">Accepter</button>
          <button id="cb-refuse" class="cb-btn cb-btn-refuse">Refuser</button>
          <a href="confidentialite.html" class="cb-link">En savoir plus</a>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      #cookie-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 9999;
        background: #1A1714;
        border-top: 2px solid #C4704A;
        padding: 1.25rem 2rem;
        animation: slideUp 0.4s ease;
      }
      @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
      .cb-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;
        flex-wrap: wrap;
      }
      .cb-text strong {
        display: block;
        color: #FDFAF6;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        margin-bottom: 0.3rem;
      }
      .cb-text p {
        color: #8C8580;
        font-size: 0.8rem;
        margin: 0;
        line-height: 1.5;
        max-width: 600px;
      }
      .cb-actions {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-shrink: 0;
      }
      .cb-btn {
        padding: 0.6rem 1.5rem;
        border-radius: 2px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.85rem;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid transparent;
        transition: all 0.2s ease;
      }
      .cb-btn-accept {
        background: #C4704A;
        color: #FDFAF6;
        border-color: #C4704A;
      }
      .cb-btn-accept:hover { background: #A85835; }
      .cb-btn-refuse {
        background: transparent;
        color: #8C8580;
        border-color: #8C8580;
      }
      .cb-btn-refuse:hover { color: #FDFAF6; border-color: #FDFAF6; }
      .cb-link {
        font-size: 0.75rem;
        color: #8C8580;
        text-decoration: underline;
        white-space: nowrap;
      }
      .cb-link:hover { color: #C4704A; }
      @media (max-width: 768px) {
        #cookie-banner { padding: 1rem; }
        .cb-inner { flex-direction: column; gap: 1rem; }
        .cb-actions { width: 100%; justify-content: center; }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(banner);

    // Bouton Accepter
    document.getElementById('cb-accept').addEventListener('click', function() {
      setConsent('accepted');
      enableAnalytics();
      banner.remove();
    });

    // Bouton Refuser
    document.getElementById('cb-refuse').addEventListener('click', function() {
      setConsent('refused');
      disableAnalytics();
      banner.remove();
    });
  }

  // Initialisation
  const consent = getConsent();

  if (consent === 'accepted') {
    enableAnalytics();
  } else if (consent === 'refused') {
    disableAnalytics();
  } else {
    // Pas encore de choix — bloquer Analytics et afficher la bannière
    disableAnalytics();
    window.addEventListener('DOMContentLoaded', createBanner);
  }

})();

"use strict";

require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
const addMessage = message => {
  const messagesDiv = document.querySelector('#messages');
  messagesDiv.style.display = 'block';
  const messageWithLinks = addDashboardLinks(message);
  messagesDiv.innerHTML += "> ".concat(messageWithLinks, "<br>");
};

// Adds links for known Stripe objects to the Stripe dashboard.
const addDashboardLinks = message => {
  const piDashboardBase = 'https://dashboard.stripe.com/test/payments';
  return message.replace(/(pi_(\S*)\b)/g, "<a href=\"".concat(piDashboardBase, "/$1\" target=\"_blank\">$1</a>"));
};
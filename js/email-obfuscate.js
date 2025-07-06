(function() {
  'use strict';
  
  // Decode base64 string
  function decodeBase64(encoded) {
    try {
      return atob(encoded);
    } catch (e) {
      console.error('Failed to decode base64:', e);
      return '';
    }
  }
  
  function createMailtoLink(email, element) {
    const link = document.createElement('a');
    link.href = 'mailto:' + email;
    link.textContent = email;
    link.className = element.className.replace('obfuscated-email', '');
    element.parentNode.replaceChild(link, element);
  }
  
  function replaceWithText(text, element) {
    const span = document.createElement('span');
    span.textContent = text;
    span.className = element.className.replace(/obfuscated-\w+/, '');
    element.parentNode.replaceChild(span, element);
  }
  
  function processObfuscatedElements() {
    // Process emails
    const emails = document.querySelectorAll('.obfuscated-email');
    emails.forEach(function(element) {
      const encoded = element.getAttribute('data-email');
      if (encoded) {
        const email = decodeBase64(encoded);
        if (email) {
          createMailtoLink(email, element);
        }
      }
    });
    
    // Process names
    const names = document.querySelectorAll('.obfuscated-name');
    names.forEach(function(element) {
      const encoded = element.getAttribute('data-name');
      if (encoded) {
        const name = decodeBase64(encoded);
        if (name) {
          replaceWithText(name, element);
        }
      }
    });
    
    // Process addresses
    const addresses = document.querySelectorAll('.obfuscated-address');
    addresses.forEach(function(element) {
      const encoded = element.getAttribute('data-address');
      if (encoded) {
        const address = decodeBase64(encoded);
        if (address) {
          replaceWithText(address, element);
        }
      }
    });
    
    // Process generic obfuscated content
    const contents = document.querySelectorAll('[class^="obfuscated-"][data-content]');
    contents.forEach(function(element) {
      const encoded = element.getAttribute('data-content');
      if (encoded) {
        const content = decodeBase64(encoded);
        if (content) {
          // Check if it's an email by looking for @ symbol
          if (content.includes('@') && element.className.includes('obfuscated-email')) {
            createMailtoLink(content, element);
          } else {
            replaceWithText(content, element);
          }
        }
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', processObfuscatedElements);
  } else {
    processObfuscatedElements();
  }
})();
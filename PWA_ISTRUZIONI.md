# PWA Lotti Disidratazione Malbosca

## File da caricare su GitHub

1. **index.html** - App principale (aggiornata con PWA)
2. **manifest.json** - Configurazione PWA
3. **service-worker.js** - Funzionalità offline
4. **favicon.ico** - Icona esistente
5. **icon-192.png** - Icona 192x192 (nuovo)
6. **icon-512.png** - Icona 512x512 (nuovo)

---

## Come installare l'app sul telefono

### Android (Chrome)
1. Apri https://malbosca.github.io/lotti-disidratazione/
2. Apparirà banner "Installa l'App" in basso → clicca **Installa**
3. **OPPURE** Menu (⋮) → "Installa app" o "Aggiungi a schermata Home"
4. L'app apparirà sulla home come app normale!

### iPhone (Safari)
1. Apri https://malbosca.github.io/lotti-disidratazione/
2. Clicca il pulsante **Condividi** (quadrato con freccia)
3. Scorri e clicca **"Aggiungi a Home"**
4. Clicca **Aggiungi**
5. L'app apparirà sulla home!

---

## Funzionalità PWA

✅ **Installabile** - Icona sulla home del telefono
✅ **Offline** - Funziona anche senza internet (dati salvati locali)
✅ **Veloce** - Carica istantaneamente dopo la prima visita
✅ **Icona personalizzata** - Logo Malbosca
✅ **Schermo intero** - Niente barra browser
✅ **Aggiornamenti automatici** - Si aggiorna da solo

---

## Testare in locale

Per testare il service worker serve HTTPS. Usa uno di questi:

1. **Python**:
   ```bash
   python3 -m http.server 8000
   ```
   Poi apri: http://localhost:8000

2. **Node.js**:
   ```bash
   npx serve .
   ```

3. **VS Code**: Usa l'estensione "Live Server"

---

## Note tecniche

- **Cache Strategy**: Network First per API, Cache First per risorse
- **Offline**: Mostra dati salvati localmente quando offline
- **Service Worker**: Si auto-aggiorna a ogni deploy
- **Storage**: Google Sheets (online) + LocalStorage (fallback)

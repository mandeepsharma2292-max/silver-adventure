const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

(async () => {
  // 1. RANDOM START DELAY (1 to 5 Minutes)
  const delayMinutes = Math.floor(Math.random() * 5) + 1;
  console.log(`[${new Date().toLocaleTimeString()}] Stealth Delay: Waiting ${delayMinutes} minutes...`);
  await new Promise(r => setTimeout(r, delayMinutes * 60000));

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();

  // 🚀 YOUR TARGET LIST (In Order)
  const targetUrls = [
    'https://iampardeepseo.blogspot.com/2026/02/shopify-vs-woocommerce-in-punjab-which.html', // 1st: Blogger
    'https://www.profitablecpmratenetwork.com/svqx9q8j2s?key=e851e41830e9bde6c3b6221eae15c42f',     // 2nd: Adsterra
    'https://omg10.com/4/7146417'       // 3rd: Monetag
  ];

  // 2. SOCIAL & SEARCH SOURCES
  const referers = [
    'https://www.google.com/', 'https://www.bing.com/', 'https://duckduckgo.com/',
    'https://l.facebook.com/', 'https://t.co/', 'https://www.pinterest.com/',
    'https://www.reddit.com/', 'https://www.linkedin.com/', 'https://www.quora.com/',
    'https://l.instagram.com/', 'https://www.tiktok.com/', 'https://www.youtube.com/'
  ];

  // 3. 2026 MODERN USER-AGENTS
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/147.0.0.0 Mobile Safari/604.1',
    'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Mobile Safari/537.36'
  ];

  async function moveMouseRandomly() {
    const x = Math.floor(Math.random() * 1200);
    const y = Math.floor(Math.random() * 700);
    await page.mouse.move(x, y, { steps: 10 });
  }

  // LOOP THROUGH ALL 3 TARGETS
  for (const url of targetUrls) {
    try {
      const randomReferer = referers[Math.floor(Math.random() * referers.length)];
      const randomUA = userAgents[Math.floor(Math.random() * userAgents.length)];

      console.log(`\n--- [${new Date().toLocaleTimeString()}] Targeting: ${url} ---`);
      
      await page.setExtraHTTPHeaders({ 'referer': randomReferer });
      await page.setUserAgent(randomUA);
      
      // Set Viewport based on UA
      if (randomUA.includes('Mobile')) {
          await page.setViewport({ width: 375, height: 812, isMobile: true });
      } else {
          await page.setViewport({ width: 1366, height: 768 });
      }

      // Open and wait for all ads/scripts
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 90000 });

      // Interaction: Scroll + Mouse
      console.log("Simulating human reading...");
      for (let i = 0; i < 10; i++) {
        await moveMouseRandomly();
        const scrollAmount = Math.floor(Math.random() * 400) + 200;
        await page.evaluate((y) => window.scrollBy(0, y), scrollAmount);
        
        // Wait 3-6 seconds between actions
        await new Promise(r => setTimeout(r, Math.floor(Math.random() * 3000) + 3000));
      }

      // Final Dwell for Ad recognition
      console.log("Holding session for Impression verification...");
      await new Promise(r => setTimeout(r, 60000)); 

    } catch (err) {
      console.log(`Error on ${url}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\n[${new Date().toLocaleTimeString()}] Triple-Target Run Finished.`);
})();

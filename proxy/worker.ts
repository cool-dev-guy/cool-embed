import { fetch } from "https://deno.land/std@0.112.0/fetch/mod.ts";

self.onmessage = async (event) => {
  const proxyIP = event.data;

  const isBadProxy = async (proxyIP: string): Promise<boolean> => {
    try {
      const proxyUrl = `http://${proxyIP}`;
      const proxyHandler = new ProxyHandler(proxyUrl);
      const proxyAgent = new ProxyAgent(proxyHandler);

      const response = await fetch('http://www.example.com', { 
        agent: proxyAgent, 
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 3000 
      });
      return response.ok;
    } catch (error) {
      console.log(`Error for ${proxyIP}: ${error}`);
      return false;
    }
  };

  const result = await isBadProxy(proxyIP);
  self.postMessage({ proxyIP, result });
};

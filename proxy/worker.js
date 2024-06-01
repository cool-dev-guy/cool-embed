self.onmessage = async (event) => {
  const proxyIP = event.data;

  const isBadProxy = async (proxyIP: string): Promise<boolean> => {
    try {
      const proxyUrl = `http://${proxyIP}`;
      const proxyHandler = (url: string, options: any = {}) => {
        options.agent = new (require('http-proxy-agent'))(proxyUrl);
        return fetch(url, options);
      };
      const response = await proxyHandler('http://www.example.com', { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 3000 });
      return response.ok;
    } catch (error) {
      console.log(`Error for ${proxyIP}: ${error}`);
      return false;
    }
  };

  const result = await isBadProxy(proxyIP);
  self.postMessage({ proxyIP, result });
};

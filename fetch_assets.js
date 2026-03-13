import https from 'https';
import fs from 'fs';

const url = 'https://api.coincap.io/v2/assets?limit=500';

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      const assets = json.data.map((coin) => {
        const rank = parseInt(coin.rank);
        let tier = 'PopularityTier.D';
        if (rank <= 10) tier = 'PopularityTier.A';
        else if (rank <= 50) tier = 'PopularityTier.B';
        else if (rank <= 150) tier = 'PopularityTier.C';

        // Simple color generation based on symbol hash
        let hash = 0;
        for (let i = 0; i < coin.symbol.length; i++) {
            hash = coin.symbol.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash) % 360;
        const color = `hsl(${h}, 70%, 50%)`;

        // Escape single quotes in names
        const safeName = coin.name.replace(/'/g, "");

        return `  { id: '${coin.id}', name: '${safeName}', symbol: '${coin.symbol}', color: '${color}', tier: ${tier}, sector: Sector.L1, chain: Chain.OTHER },`;
      });
      
      const content = `// Generated Assets - Top 500\nexport const NEW_ASSETS = [\n${assets.join('\n')}\n];`;
      
      fs.writeFileSync('new_assets.ts', content);
      console.log(`Successfully fetched ${assets.length} assets and saved to new_assets.ts`);
    } catch (e) {
      console.error('Error parsing JSON:', e);
    }
  });
}).on('error', (e) => {
  console.error('Error fetching data:', e);
});

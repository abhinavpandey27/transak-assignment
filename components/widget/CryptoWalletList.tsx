"use client";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange: number;
  quantity: number;
  value: number;
  icon: string;
}

const mockCryptoAssets: CryptoAsset[] = [
  {
    id: '1',
    name: 'HOPR ethereum',
    symbol: 'HOPR',
    price: 0.36,
    priceChange: 1.16,
    quantity: 12248.2415,
    value: 658.36,
    icon: '🟢'
  },
  {
    id: '2',
    name: 'Fantom ethereum',
    symbol: 'FTM',
    price: 0.42,
    priceChange: -0.56,
    quantity: 1567.89,
    value: 234.12,
    icon: '🟠'
  },
  {
    id: '3',
    name: 'Polygon ethereum',
    symbol: 'MATIC',
    price: 0.89,
    priceChange: 2.34,
    quantity: 892.45,
    value: 456.78,
    icon: '🟣'
  }
];

export function CryptoWalletList() {
  const formatPriceChange = (change: number) => {
    const isPositive = change > 0;
    const color = isPositive ? 'text-green-600' : 'text-red-600';
    const sign = isPositive ? '+' : '';
    
    return (
      <span className={`text-sm ${color}`}>
        {sign}{change.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {mockCryptoAssets.map((asset) => (
        <div key={asset.id} className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          {/* Left Side - Asset Info */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg">
              {asset.icon}
            </div>
            
            <div>
              <h4 className="font-medium text-slate-900 dark:text-white">
                {asset.name}
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  €{asset.price.toFixed(2)}
                </span>
                {formatPriceChange(asset.priceChange)}
              </div>
            </div>
          </div>

          {/* Right Side - Quantity and Value */}
          <div className="text-right">
            <div className="font-medium text-slate-900 dark:text-white">
              {asset.quantity.toLocaleString("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4
              })}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              €{asset.value.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

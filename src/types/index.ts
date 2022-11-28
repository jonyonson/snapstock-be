/* eslint-disable @typescript-eslint/no-explicit-any */
export type FixMeLater = any;

export interface Quote {
  avgTotalVolume: number;
  calculationPrice: string;
  change: number;
  changePercent: number;
  close: number;
  closeSource: string;
  closeTime: number;
  companyName: string;
  currency: string;
  delayedPrice: number;
  delayedPriceTime: number;
  extendedChange: number;
  extendedChangePercent: number;
  extendedPrice: number;
  extendedPriceTime: number;
  high: number;
  highSource: string;
  highTime: number;
  iexAskPrice: any;
  iexAskSize: any;
  iexBidPrice: any;
  iexBidSize: any;
  iexClose: number;
  iexCloseTime: number;
  iexLastUpdated: any;
  iexMarketPercent: any;
  iexOpen: number;
  iexOpenTime: number;
  iexRealtimePrice: any;
  iexRealtimeSize: any;
  iexVolume: any;
  lastTradeTime: number;
  latestPrice: number;
  latestSource: string;
  latestTime: string;
  latestUpdate: number;
  latestVolume: number;
  low: number;
  lowSource: string;
  lowTime: number;
  marketCap: number;
  oddLotDelayedPrice: number;
  oddLotDelayedPriceTime: number;
  open: number;
  openTime: number;
  openSource: string;
  peRatio: number;
  previousClose: number;
  previousVolume: number;
  primaryExchange: string;
  symbol: string;
  volume: number;
  week52High: number;
  week52Low: number;
  ytdChange: number;
  isUSMarketOpen: boolean;
}

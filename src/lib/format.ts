const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** 13999 → "13,999"; 120000 → "1,20,000" (Indian grouping). */
export const groupINR = (amount: number): string => inr.format(amount);

/** 13999 → "₹13,999" */
export const formatINR = (amount: number): string => `₹${groupINR(amount)}`;

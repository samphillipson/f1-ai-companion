'use client';

import styles from '../tickets.module.css';

interface BuyButtonProps {
  tier: string;
}

export default function BuyButton({ tier }: BuyButtonProps) {
  const handleBuy = () => {
    alert(`E-commerce checkout for ${tier} coming soon!`);
  };

  return (
    <button onClick={handleBuy} className={styles.buyBtn}>
      Add to Cart
    </button>
  );
}

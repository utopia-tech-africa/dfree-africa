const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function getInvitationExpiryLabel(expiresAt: Date): {
  label: string;
  isExpired: boolean;
  isExpiringSoon: boolean;
} {
  const now = Date.now();
  const expiry = expiresAt.getTime();
  const diffMs = expiry - now;

  if (diffMs <= 0) {
    return {
      label: "Expired",
      isExpired: true,
      isExpiringSoon: false,
    };
  }

  const days = Math.ceil(diffMs / MS_PER_DAY);
  const isExpiringSoon = diffMs <= MS_PER_DAY * 2;

  if (days === 1) {
    return {
      label: "Expires in 1 day",
      isExpired: false,
      isExpiringSoon: true,
    };
  }

  return {
    label: `Expires in ${days} days`,
    isExpired: false,
    isExpiringSoon,
  };
}

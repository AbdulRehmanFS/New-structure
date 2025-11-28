// Common formatting utilities
// This file can be expanded with shared formatting functions

export const formatDate = (date) => {
  // Date formatting utility
  return new Date(date).toLocaleDateString();
};

export const formatCurrency = (amount) => {
  // Currency formatting utility
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};


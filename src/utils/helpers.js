function generateReceiptNo() {
  const now = new Date();
  const stamp = now.toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
  const rand = Math.floor(100 + Math.random() * 900);
  return `RCPT-${stamp}-${rand}`;
}

function peso(amount) {
  return `₱${Number(amount).toFixed(2)}`;
}

function dateOnly(d) {
  return new Date(d).toISOString().slice(0, 10);
}

module.exports = { generateReceiptNo, peso, dateOnly };

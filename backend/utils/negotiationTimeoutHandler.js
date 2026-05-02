const Negotiation = require('../models/Negotiation');

/**
 * Periodically checks for stale negotiations and marks them as EXPIRED.
 * Runs every 5 minutes. A negotiation is considered stale if it has been
 * in PENDING or COUNTERED status for more than 24 hours without activity.
 */
const startNegotiationTimeoutHandler = (io) => {
  const INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
  const TIMEOUT_MS = 24 * 60 * 60 * 1000; // 24 hours

  setInterval(async () => {
    try {
      const cutoff = new Date(Date.now() - TIMEOUT_MS);

      const staleNegotiations = await Negotiation.updateMany(
        {
          status: { $in: ['PENDING', 'COUNTERED', 'OFFER_SENT', 'NEW'] },
          lastMessageAt: { $lt: cutoff },
        },
        { $set: { status: 'EXPIRED' } }
      );

      if (staleNegotiations.modifiedCount > 0) {
        console.log(`[Timeout Handler] Expired ${staleNegotiations.modifiedCount} stale negotiations.`);
      }
    } catch (err) {
      console.error('[Timeout Handler] Error:', err.message);
    }
  }, INTERVAL_MS);

  console.log('[Timeout Handler] Negotiation timeout handler started (checks every 5 min).');
};

module.exports = { startNegotiationTimeoutHandler };

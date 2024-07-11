const ApiKey = require('./../models/AuthUser');

module.exports = apikey = async (req, res, next) => {
  const apiKey = req.headers['apikey'] || req.query.apikey
  if (!apiKey) return ResponseFalse(res, "api-key di butuhkan!, silahkan login untuk mendapatkan api-key");

  try {
    // Mencari record apiKey berdasarkan key
    const apiRecord = await ApiKey.findOne({ 'apiKey.key': apiKey });
    if (!apiRecord) return ResponseFalse(res, "api-key tidak valid");

    if (apiRecord.apiKey.usage < apiRecord.apiKey.limit) {
      // Mengupdate penggunaan apiKey
      await ApiKey.updateOne({ 'apiKey.key': apiKey }, { $inc: { 'apiKey.usage': 1 } });
      next();
    } else {
      return ResponseFalse(res, "Limit permintaan telah tercapai");
    }
  } catch (err) {
    console.error(err);
    return ResponseFalse(res, "Terjadi kesalahan dalam memeriksa apiKey");
  }
};

// Fungsi untuk mengirim respon kesalahan
function ResponseFalse(res, message) {
  return res.status(400).json({ success: false, message });
}

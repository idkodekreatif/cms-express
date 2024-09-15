function ensureAuthenticated(req, res, next) {
  if (req.session.user) {
    req.user = req.session.user; // Pastikan req.user diatur dari session
    return next(); // Lanjut ke middleware berikutnya
  } else {
    req.session.returnTo = req.originalUrl; // Simpan route yang ingin diakses
    res.redirect("/login"); // Arahkan ke halaman login
  }
}

module.exports = ensureAuthenticated;

// middleware/passport-setup.js
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./../models/AuthUser");
const generateApiKey = require("./../utils/generateApiKey");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id })
				.then((existingUser) => {
					if (existingUser) {
						// Update jika ada perubahan di profil Google
						existingUser.displayName = profile.displayName;
						existingUser.emails = profile.emails;
						existingUser.save().then((user) => done(null, user));
					} else {
						// Buat user baru jika belum ada
						const newApiKey = generateApiKey();
						new User({
							googleId: profile.id,
							displayName: profile.displayName,
							emails: profile.emails,
							apiKey: {
								key: newApiKey,
								limit: 100,
								usage: 0,
							},
						})
							.save()
							.then((newUser) => done(null, newUser));
					}
				})
				.catch((err) => done(err));
		}
	)
);

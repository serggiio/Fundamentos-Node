const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    //register new local user
    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
            function(req, email, password, done) {
                User.findOne({'local.email': email}, function (err, user) {
                    if (err) { return done(err);}
                    if (user) { return done(null, false, req.flash('signupMessage', 'The email is already taken.'))}
                    else {
                        let newUser = new User();
                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);
                        newUser.type = 'local';
                        newUser.save(function (err) {
                            if (err) { throw err}
                            return done(null, newUser);
                        });
                    }
                })
            }
        )
    );

    //local login
    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
            function(req, email, password, done) {
                User.findOne({'local.email': email}, function (err, user) {
                    if (err) { return done(err);}
                    if (!user) { return done(null, false, req.flash('loginMessage', 'No user found.'))}
                    
                    if (!user.validatePassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Wrong password'));
                    }

                    return done(null, user);

                })
            }
        )
    );


    	// Configuración del autenticado con Facebook
	passport.use(new FacebookStrategy({
		clientID			: '2580538052253538',
		clientSecret	: '2ad135e5440e230d2eb7387216b06c44',
		callbackURL	 : '/authentication/facebook/callback',
		profileFields : ['id', 'displayName', /*'provider',*/ 'photos']
	}, function(accessToken, refreshToken, profile, done) {
		// El campo 'profileFields' nos permite que los campos que almacenamos
		// se llamen igual tanto para si el usuario se autentica por Twitter o
		// por Facebook, ya que cada proveedor entrega los datos en el JSON con
		// un nombre diferente.
		// Passport esto lo sabe y nos lo pone más sencillo con ese campo
		User.findOne({'facebook.provider_id': profile.id}, function(err, user) {
			if(err) throw(err);
			if(!err && user!= null) return done(null, user);

			// Al igual que antes, si el usuario ya existe lo devuelve
			// y si no, lo crea y salva en la base de datos
			var user = new User(
                {
                    type: 'facebook',
                    facebook: {
                        provider_id	: profile.id,
                        provider		 : profile.provider,
                        name				 : profile.displayName,
                        photo				: profile.photos[0].value,
                        extra: profile
                    }
                }
            );
			user.save(function(err) {
				if(err) throw err;
				done(null, user);
			});
		});
	}));
}
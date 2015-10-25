Meteor.startup(() => {
  if(Meteor.users.find().count() === 0){
    var users = [
      { name: "Default Player", email: "mail@mail.com", roles: ['player'] },
      { name: "Player Hassan", email: "hassan@mail.com", roles: ['player'] },
      { name: "Player f0rest", email: "f0rest@mail.com", roles: ['player'] },
      { name: "Player Alexi", email: "allu@mail.com", roles: ['player'] },
      { name: "Admin User", email: "admin@mail.com", roles: ['admin'] }
    ];

    _.each(users, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: "password",
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles);
      }
    });
  }

  if(Games.find().count() === 0){
    var players = Meteor.users.find({ roles: "player" }).map(function(user, index, originalCursor){ return user._id; });
    Games.insert({
      ongoing: true,
      players: players,
      name : "BankGameName"
    });
  }

  if(Banks.find().count() === 0){
    Meteor.users.find({ roles: "player" }).map(
      function(user, index, originalCursor){
        var bank =  Banks.insert({
          owner: user._id,
          gameId: Games.findOne({ players: user._id })._id,
          name: "My bootstrapped bank " + user.profile.name
        });
      });
    }
  });

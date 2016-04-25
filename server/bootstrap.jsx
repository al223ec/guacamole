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
      name : "BankGameName",
      time : 0
    });
  }

  if(Banks.find().count() === 0){
    Meteor.users.find({ roles: "player" }).map(
      function(user, index, originalCursor){
          Banks.insert({
            owner: user._id,
            gameId: Games.findOne({ players: user._id })._id,
            name: "Bank for" + user.profile.name,

            interest: { list: 2, riskOne: 1.54, riskTwo: 1.89, riskThree: 2.1, riskFour: 2.9, riskFive: 3.5, riskSix: 4.6 },
            blancoInterest: { list: 5, riskOne: 4.2, riskTwo: 4.9, riskThree: 5.6, riskFour: 6.5, riskFive: 7.5, riskSix: 8 },
            savingsInterest: 1.1,
            
            profitAndLosses: [],
            interestIncomes: [],
            interestExpenses: []
          });
      });
  }

  if(Customers.find().count() === 0){
    Meteor.users.find({ roles: "player" }).map(
      function(user, index, originalCursor){
        for(var j = 0; j < 6; j++){

          Customers.insert({
            riskClass: j+1,
            mortgages: 1500000,
            savings: 50000,
            customersCount: 2500,
            blanco: 2000,
            bankId: Banks.findOne({ owner: user._id })._id,
          });
        }
    });
  }
});

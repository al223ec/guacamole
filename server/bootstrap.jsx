Meteor.startup(() => {
  if(Meteor.users.find().count() === 0){
    Accounts.createUser({
      email: "email@mail.com",
      password: "password"
    });
  }

  if(Games.find().count() === 0){
    Games.insert({
      ongoing: true,
      players: [ Accounts.findUserByEmail("email@mail.com")._id ], // Detta vet jag inte om jag behöver
      name : "BankGameName",
      banks: []
    });
  }

  if(Banks.find().count() === 0){
    var bank = Banks.insert({
      owner: Accounts.findUserByEmail("email@mail.com")._id,
      gameId: Banks.findOne({ players: Accounts.findUserByEmail("email@mail.com")._id })._id,
      name: "My bootstrapped bank"
    });

    Games.update(
      { _id: bank.gameId },
      { $push: { banks: bank._id }});
  }
});

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
      players: [ Accounts.findUserByEmail("email@mail.com")._id ],
      name : "BankGameName"
    });
  }
});

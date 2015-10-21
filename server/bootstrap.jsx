Meteor.startup(() => {
  if(Meteor.users.find().count() === 0){
    Accounts.createUser({
      email: "email@mail.com",
      password: "password"
    });
  }
});

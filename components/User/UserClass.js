class User {
    constructor(Id, UserName, Email, Role, FirstName, LastName, Birthdate, PhoneNumber) {
        this.id = Id;
        this.login = UserName;
        this.email = Email;
        this.role = Role;
        this.firstname = FirstName;
        this.lastname = LastName;
        this.birthdate = Birthdate;
        this.phone = PhoneNumber;
    }
}
  
export { User };
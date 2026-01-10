class User {
    constructor(id, firstName, surName, dni, email, phone,
        password, birthDate, active, registerDate, updateDate) {
        this.id = id;
        this.firstName = firstName;
        this.surName = surName;
        this.dni = dni;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.birthDate = birthDate;
        this.active = active;
        this.registerDate = registerDate;
        this.updateDate = updateDate;
    }
    getFullName() {
        return `${this.firstName} ${this.surName}`;
    }
    static fromJson(json) {
        return new User(json.id, json.firstName, json.surName, json.dni, json.email, json.phone, json.password, json.birthDate, json.active, json.registerDate, json.updateDate);
    }

}
export default User;
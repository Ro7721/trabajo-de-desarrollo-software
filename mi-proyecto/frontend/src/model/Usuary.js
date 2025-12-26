class Usuary {
    constructor(id, firstName, surName, DNI, email, phone, password) {
        this.id = id;
        this.firstName = firstName;
        this.surName = surName;
        this.DNI = DNI;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }
    getFullName() {
        return `${this.firstName} ${this.surName}`;
    }
    static fromJson(json) {
        return new Usuary(json.id, json.firstName, json.surName, json.DNI, json.email, json.phone, json.password);
    }

}
export default Usuary;
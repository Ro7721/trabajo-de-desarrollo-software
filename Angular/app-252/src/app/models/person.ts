export class Person {
    constructor(
        public firstName: string,
        public surName: String,
        public dni: string,
        public birthDate: string,
        public email: string,
        public status: boolean,
        public phone: string
    ){}
    esFullName(): string {
        return `${this.firstName} ${this.surName}`;
    }
}

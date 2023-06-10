export default class User {
    constructor(username, email, password, first_name, last_name, phone, role ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.role = role;
    }
}
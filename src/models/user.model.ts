import { Table, Column, Unique, Model, DataType } from 'sequelize-typescript';

@Table
class Person extends Model {
    // Private field to store the username
    @Unique
    @Column({ type: DataType.STRING })
    private _username: string;

    // Public getter for the username
    get username(): string {
        return this._username;
    }

    // Public setter for the username
    set username(value: string) {
        this._username = value;
    }

    @Column({ type: DataType.STRING })
    password: string;

    @Column({ type: DataType.STRING })
    role: string;

    @Column({ type: DataType.STRING })
    fullname: string;
}

export default Person;

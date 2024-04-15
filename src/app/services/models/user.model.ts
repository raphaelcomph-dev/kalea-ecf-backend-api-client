import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";
import { CustomerModel } from "./customer.model";
import { CustomerUserModel } from "./customer-user.model";

@Entity("AbpUsers")
export class UserModel extends BaseModel {
    @Column({ name: "Name" })
    name: string;

    @Column({ name: "Password" })
    password: string;

    @Column({ name: "EmailAddress" })
    email: string;

    @Column({ name: "UserName" })
    username: string;

    // @ManyToMany(() => CustomerModel, (customer) => customer.users)
    // @Column({ name: "UserName" })
    // @ManyToMany(() => CustomerModel, (customer) => customer.users)
    // @OneToMany(() => CustomerUserModel, (customerUser) => customerUser.user)
    // @ManyToMany((type) => CustomerModel, { eager: true })
    // @JoinTable({
    //     name: "CustomerUser",
    //     joinColumn: {
    //         name: "CustomerId",
    //         referencedColumnName: "Id",
    //     },
    //     inverseJoinColumn: {
    //         name: "UserId",
    //         referencedColumnName: "Id",
    //     },
    // })
    // customers: CustomerModel[];
}

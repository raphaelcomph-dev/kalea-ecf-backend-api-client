import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";
import { UserModel } from "./user.model";
import { CustomerUserModel } from "./customer-user.model";
import { CustomerBalanceModel } from "./customer-balance.model";

@Entity("Customer")
export class CustomerModel extends BaseModel {
    @Column({ name: "CompanyName" })
    companyName: string;

    @OneToMany(() => CustomerBalanceModel, (customerBalance) => customerBalance.customer)
    customerBalances: CustomerBalanceModel[];

    // @OneToMany(() => UserModel, (user) => user.customer)
    // @JoinTable({ name: "CustomerUser" })
    // @OneToMany(() => CustomerUserModel, (customerUser) => customerUser.user)
    // @ManyToMany(() => UserModel, (user) => user.customers)
    // @JoinTable({
    //     name: "CustomerUser", // table name for the junction table of this relation
    //     joinColumn: {
    //         name: "UserId",
    //         referencedColumnName: "Id",
    //     },
    //     inverseJoinColumn: {
    //         name: "CustomerId",
    //         referencedColumnName: "Id",
    //     },
    // })
    // users: UserModel[];
}

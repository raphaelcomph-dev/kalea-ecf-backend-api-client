import { Column, Entity } from "typeorm";
import { BaseModel } from "../../../../shared/models/base.model";

@Entity("CustomerUser")
export class CustomerUserModel extends BaseModel {
    // TODO: ajeitar essa modelagem. fazer um relacionamento de N para N decente
    // @ManyToOne(() => CustomerModel, (customer) => customer.users)
    // @JoinColumn({ name: "CustomerId" })
    @Column({ name: "CustomerId" })
    customerId: number;
    // @ManyToOne(() => UserModel, (user) => user.customers)
    // @Column({ name: "UserId" })
    // @JoinColumn({ name: "UserId" })
    // userId: UserModel;
    @Column({ name: "UserId" })
    userId: number;
}

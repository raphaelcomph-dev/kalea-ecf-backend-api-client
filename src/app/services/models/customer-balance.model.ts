import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";
import { CustomerModel } from "../../modules/auth/services/models/customer.model";
import { BalanceIndicatorModel } from "./balance-indicator.model";
import { EcfFileProcessInfoModel } from "./ecf-file-processing-info.model";

@Entity("CustomerBalance")
export class CustomerBalanceModel extends BaseModel {
    @ManyToOne(() => CustomerModel, (customer) => customer.customerBalances)
    @JoinColumn({ name: "CustomerId" })
    customer: CustomerModel;

    @OneToOne(() => EcfFileProcessInfoModel)
    @JoinColumn({ name: "ProcessingId" })
    ecfFileProcessInfo: EcfFileProcessInfoModel;

    @OneToOne(() => BalanceIndicatorModel)
    balanceIndicator: BalanceIndicatorModel;

    @Column({ name: "Year" })
    year: number;
}

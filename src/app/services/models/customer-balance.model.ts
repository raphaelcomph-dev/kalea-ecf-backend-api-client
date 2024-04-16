import { Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";
import { CustomerModel } from "./customer.model";
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
    @JoinColumn()
    balanceIndicator: BalanceIndicatorModel;
}

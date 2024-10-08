import { Column, Entity } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";

@Entity("Processing")
export class EcfInfoModel extends BaseModel {
    constructor(props: {
        id?: number;
        userId: number;
        state?: number;
        type: number;
        cnpj?: number;
        companyName?: number;
        inProgressDate?: Date;
        customerId: number;
        fileName: string;
        fileSize: number;
    }) {
        super();
        Object.assign(this, props);
        if (props?.id) {
            this.id = props.id;
        }
    }

    @Column({ name: "UserId", nullable: false })
    userId: number;

    @Column({ name: "State", nullable: false })
    status: number;

    @Column({ name: "Type" })
    type: number;

    @Column({ name: "Cnpj" })
    cnpj: string;

    @Column({ name: "CompanyName" })
    companyName: string;

    @Column({ name: "Year" })
    year: number;

    @Column({ name: "CustomerId", nullable: false })
    customerId: number;

    @Column({ name: "InProgressDate" })
    inProgressDate: Date;

    @Column({ name: "ProcessedDate" })
    processedDate: Date;

    @Column({ name: "FileName" })
    fileName: string;

    @Column({ name: "FileSize" })
    fileSize: number;
}

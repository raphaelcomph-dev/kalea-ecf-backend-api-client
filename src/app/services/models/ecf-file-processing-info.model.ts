import { Column, Entity } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";

@Entity("Processing")
export class EcfFileProcessInfoModel extends BaseModel {
    constructor(props: {
        id?: number;
        userId: number;
        state: number;
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

    @Column({ name: "UserId" })
    userId: number;

    @Column({ name: "State" })
    state: number;

    @Column({ name: "CustomerId" })
    customerId: number;

    @Column({ name: "FileName" })
    fileName: string;

    @Column({ name: "FileSize" })
    fileSize: number;
}

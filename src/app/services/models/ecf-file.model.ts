import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";
import { EcfInfoModel } from "./ecf-info.model";

@Entity("ProcessingFile")
export class EcfFileModel extends BaseModel {
    constructor(props: { id?: number; fileBuffer?: Buffer }) {
        super();
        Object.assign(this, props);
        if (props?.id) {
            this.id = props.id;
        }
    }

    @Column({ name: "Pdf", nullable: true, type: "varbinary", length: "max" })
    fileBuffer: Buffer;

    @OneToOne(() => EcfInfoModel)
    @JoinColumn({ name: "ProcessingId" })
    processingInfo: EcfInfoModel;
}

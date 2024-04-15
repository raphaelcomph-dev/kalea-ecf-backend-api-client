import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";
import { EcfFileProcessInfoModel } from "./ecf-file-processing-info.model";

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

    @OneToOne(() => EcfFileProcessInfoModel)
    @JoinColumn({ name: "ProcessingId" })
    processingInfo: EcfFileProcessInfoModel;
}

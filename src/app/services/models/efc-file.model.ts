import { Column, Entity } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";

@Entity("ProcessingFile")
export class EcfFileModel extends BaseModel {
    constructor(props: { id?: string; fileName: string; fileSize: number; fileBuffer?: Buffer }) {
        super();
        Object.assign(this, props);
        if (props?.id) {
            this.id = props.id.toString();
        }
    }

    @Column({ name: "FileName" })
    fileName: string;

    @Column({ name: "FileSize" })
    fileSize: number;

    @Column({ name: "FileBuffer", nullable: true, type: "varbinary", length: "max" })
    fileBuffer: Buffer;
}

import { Column } from "typeorm";
import { BaseModel } from "../../shared/models/base.model";

export class EcfFileModel extends BaseModel {
    constructor(props: { id?: string; fileName: string; fileSize: string; fileBuffer: string }) {
        super();
        Object.assign(this, props);
        if (props?.id) {
            this.id = props.id.toString();
        }
    }

    @Column()
    fileName: string;

    @Column()
    fileSize: string;

    @Column()
    fileBuffer: string;
}

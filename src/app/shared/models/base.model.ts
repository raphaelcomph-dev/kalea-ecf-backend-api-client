import { Column } from "typeorm";

export abstract class BaseModel {
    @Column()
    id: string;
}

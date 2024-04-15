import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EcfFileModel } from "../../models/ecf-file.model";
import { Repository } from "typeorm";

@Injectable()
export class EcfFileRepository {
    constructor(@InjectRepository(EcfFileModel) private readonly typeormRepository: Repository<EcfFileModel>) {}

    findAll(): Promise<EcfFileModel[]> {
        // TODO: Filtrar por usuário/tenant/customer
        return this.typeormRepository.find();
    }

    async save(ecfFile: EcfFileModel): Promise<void> {
        await this.typeormRepository.save(ecfFile);
    }
}

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

    findByEcfInfoId(ecfInfoId: number): Promise<EcfFileModel> {
        // TODO: Filtrar por usuário/tenant/customer
        return this.typeormRepository.findOneBy({ processingInfo: { id: ecfInfoId } });
    }

    async deleteByFileInfoId(ecfFileInfoId: number): Promise<void> {
        // TODO: Filtrar por usuário/tenant/customer
        await this.typeormRepository.delete({ processingInfo: { id: ecfFileInfoId } });
    }

    async save(ecfFile: EcfFileModel): Promise<void> {
        await this.typeormRepository.save(ecfFile);
    }
}

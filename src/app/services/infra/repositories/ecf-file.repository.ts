import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EcfFileModel } from "../../models/ecf-file.model";
import { Repository } from "typeorm";
import { ApiContext } from "../../../shared/api-context.middleware";

@Injectable()
export class EcfFileRepository {
    constructor(@InjectRepository(EcfFileModel) private readonly typeormRepository: Repository<EcfFileModel>) {}

    findAll(): Promise<EcfFileModel[]> {
        return this.typeormRepository.find({ where: { processingInfo: { userId: ApiContext.getContext().userId } } });
    }

    findByEcfInfoId(ecfInfoId: number): Promise<EcfFileModel> {
        return this.typeormRepository.findOneBy({
            processingInfo: { id: ecfInfoId, userId: ApiContext.getContext().userId },
        });
    }

    async deleteByFileInfoId(ecfFileInfoId: number): Promise<void> {
        await this.typeormRepository.delete({
            processingInfo: { id: ecfFileInfoId, userId: ApiContext.getContext().userId },
        });
    }

    async save(ecfFile: EcfFileModel): Promise<void> {
        await this.typeormRepository.save(ecfFile);
    }
}

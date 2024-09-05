import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EcfInfoModel } from "../../models/ecf-info.model";
import { Repository } from "typeorm";
import { ApiContext } from "../../../shared/api-context.middleware";

@Injectable()
export class EcfProcessInfoRepository {
    constructor(
        @InjectRepository(EcfInfoModel)
        private readonly typeormRepository: Repository<EcfInfoModel>,
    ) {}

    findAll(): Promise<EcfInfoModel[]> {
        return this.typeormRepository.findBy({ userId: ApiContext.getContext().userId });
    }

    findByEcfInfoId(ecfInfoId: number): Promise<EcfInfoModel> {
        return this.typeormRepository.findOneBy({ id: ecfInfoId, userId: ApiContext.getContext().userId });
    }

    findByCnpj(cnpj: string): Promise<EcfInfoModel[]> {
        return this.typeormRepository.findBy({ cnpj, userId: ApiContext.getContext().userId });
    }

    async delete(ecfFileInfoId: number): Promise<void> {
        await this.typeormRepository.delete({ id: ecfFileInfoId, userId: ApiContext.getContext().userId });
    }

    async save(ecfFile: EcfInfoModel): Promise<void> {
        await this.typeormRepository.save(ecfFile);
    }
}

import { Injectable } from "@nestjs/common";
import { EcfIndicatorsOutputDto } from "../api/rest/dtos/output/ecf-indicators.output.dto";
import { EcfListItemOutputDto } from "../api/rest/dtos/output/ecf-list-item.output.dto";
import { BalanceRepository } from "./infra/repositories/balance.repository";
import { EcfProcessInfoRepository as EcfProcessInfoRepository } from "./infra/repositories/ecf-processing-info.repository";
import { EcfFileRepository } from "./infra/repositories/ecf-file.repository";
import { FindIndicatorsUseCase } from "./usecases/find-indicators.usecase";
import { ListAllEcfUsecase } from "./usecases/list-all-ecf.usecase";
import { UploadEcfUseCase } from "./usecases/upload-ecf.usecase";
import { DeleteEcfUseCase } from "./usecases/delete-ecf.usecase";

@Injectable()
export class EcfService {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfProcessInfoRepository: EcfProcessInfoRepository,
        private readonly balanceRepository: BalanceRepository,
    ) {}

    async uploadEcfFile(file: Express.Multer.File): Promise<void> {
        await new UploadEcfUseCase(this.ecfFileRepository, this.ecfProcessInfoRepository).execute(file);
    }

    async findAll(): Promise<EcfListItemOutputDto[]> {
        return new ListAllEcfUsecase(this.ecfProcessInfoRepository).execute();
    }

    async findIndicatorsByEcfInfoId(ecfInfoId: number): Promise<EcfIndicatorsOutputDto> {
        return new FindIndicatorsUseCase(
            this.balanceRepository,
            this.ecfProcessInfoRepository,
        ).findByEcfProcessingInfoId(ecfInfoId);
    }

    async findIndicatorsByCnpj(cnpj: string): Promise<EcfIndicatorsOutputDto[]> {
        return new FindIndicatorsUseCase(this.balanceRepository, this.ecfProcessInfoRepository).findByCnpj(cnpj);
    }

    async delete(fileInfoId: number): Promise<void> {
        return new DeleteEcfUseCase(
            this.ecfFileRepository,
            this.ecfProcessInfoRepository,
            this.balanceRepository,
        ).execute(fileInfoId);
    }
}

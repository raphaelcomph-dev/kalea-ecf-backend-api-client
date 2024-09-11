import { ApiContext } from "../../shared/api-context.middleware";
import { EcfProcessInfoRepository } from "../infra/repositories/ecf-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";
import { EcfInfoModel } from "../models/ecf-info.model";
import { EcfFileModel } from "../models/ecf-file.model";
import { Logger } from "@nestjs/common";

export class UploadEcfUseCase {
    private readonly logger = new Logger(UploadEcfUseCase.name);
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfProcessInfoRepository,
    ) {}

    async execute(file: Express.Multer.File) {
        this.logger.log(`Criando objeto ProcessingInfo p/ arquivo ${file.originalname}...`);
        const processingInfo = new EcfInfoModel({
            userId: ApiContext.getContext().userId,
            state: 0,
            type: 2,
            customerId: ApiContext.getContext().customerId,
            fileName: file.originalname,
            fileSize: file.size,
        });

        // TODO: verificar se o arquivo é do tipo PDF e se ele tem menos que 50MB

        this.logger.log(`Salvando ProcessingInfo no banco...`);
        await this.ecfFileProcessInfoRepository.save(processingInfo);

        this.logger.log(`Criando objeto EcfFile...`);
        const ecfFile = new EcfFileModel({
            fileBuffer: file.buffer,
        });
        ecfFile.processingInfo = processingInfo;

        this.logger.log(`Salvando EcfFile no banco...`);
        await this.ecfFileRepository.save(ecfFile);

        this.logger.log(`Upload do arquivo ${file.originalname} realizado com sucesso.`);
    }
}

import { ApiContext } from "../../shared/api-context.middleware";
import { EcfProcessInfoRepository } from "../infra/repositories/ecf-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";
import { EcfInfoModel } from "../models/ecf-info.model";
import { EcfFileModel } from "../models/ecf-file.model";

export class UploadEcfUseCase {
    constructor(
        private readonly ecfFileRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfProcessInfoRepository,
    ) {}

    async execute(file: Express.Multer.File) {
        const processingInfo = new EcfInfoModel({
            userId: ApiContext.getContext().userId,
            state: 0,
            type: 2,
            customerId: ApiContext.getContext().customerId,
            fileName: file.originalname,
            fileSize: file.size,
        });

        // TODO: verificar se o arquivo é do tipo PDF e se ele tem menos que 50MB

        await this.ecfFileProcessInfoRepository.save(processingInfo);

        const ecfFile = new EcfFileModel({
            fileBuffer: file.buffer,
        });
        ecfFile.processingInfo = processingInfo;

        await this.ecfFileRepository.save(ecfFile);
    }
}

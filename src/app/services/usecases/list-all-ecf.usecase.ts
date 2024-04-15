import { EcfListItemOutputDto } from "../../api/rest/dtos/output/ecf-list-item.output.dto";
import { EcfFileProcessInfoRepository } from "../infra/repositories/ecf-file-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";

export class ListAllEcfUsecase {
    constructor(
        private readonly ecfRepository: EcfFileRepository,
        private readonly ecfFileProcessInfoRepository: EcfFileProcessInfoRepository,
    ) {}

    async execute(): Promise<EcfListItemOutputDto[]> {
        const ecfList = await this.ecfFileProcessInfoRepository.findAll();

        if (ecfList) {
            return ecfList.map((ecf) => {
                return {
                    id: ecf.id,
                    fileName: ecf.fileName,
                    fileDate: null,
                    cnpj: null,
                    status: "PROCESSING",
                };
            });
        }

        return [];
    }
}

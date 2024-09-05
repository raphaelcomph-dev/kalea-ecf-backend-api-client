import { EcfListItemOutputDto } from "../../api/rest/dtos/output/ecf-list-item.output.dto";
import { EcfProcessInfoRepository } from "../infra/repositories/ecf-processing-info.repository";
import { EcfFileRepository } from "../infra/repositories/ecf-file.repository";

export class ListAllEcfUsecase {
    constructor(private readonly ecfFileProcessInfoRepository: EcfProcessInfoRepository) {}

    async execute(): Promise<EcfListItemOutputDto[]> {
        const ecfList = await this.ecfFileProcessInfoRepository.findAll();

        if (!ecfList) {
            return [];
        }

        const groupedResult: { [key: string]: EcfListItemOutputDto } = {};

        ecfList.forEach((e) => {
            if (!groupedResult[e.cnpj]) {
                groupedResult[e.cnpj] = {
                    companyName: e.companyName,
                    cnpj: e.cnpj,
                    files: [],
                };
            }

            groupedResult[e.cnpj].files.push({
                id: e.id,
                name: e.fileName,
                year: e.year,
                date: e.inProgressDate,
                status: e.status,
            });
        });

        return Object.values(groupedResult);
    }
}

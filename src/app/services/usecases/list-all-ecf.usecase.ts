import { EcfListItemOutputDto } from "../../api/rest/dtos/output/ecf-list-item.output.dto";
import { EcfProcessInfoRepository } from "../infra/repositories/ecf-processing-info.repository";

export class ListAllEcfUsecase {
    constructor(private readonly ecfFileProcessInfoRepository: EcfProcessInfoRepository) {}

    async execute(): Promise<EcfListItemOutputDto[]> {
        const ecfList = (await this.ecfFileProcessInfoRepository.findAll()).sort((a, b) => {
            if (!a.processedDate) {
                return -1;
            } else if (!b.processedDate) {
                return 1;
            } else {
                return b.processedDate.getTime() - a.processedDate.getTime();
            }
        });

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

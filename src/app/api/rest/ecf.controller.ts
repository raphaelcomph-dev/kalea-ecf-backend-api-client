import { Controller, Delete, Get, Logger, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { EcfService } from "../../services/ecf.service";
import { CustomFileInterceptor } from "../../shared/interceptors/file.interceptor";
import { EcfIndicatorsOutputDto } from "./dtos/output/ecf-indicators.output.dto";
import { EcfListItemOutputDto } from "./dtos/output/ecf-list-item.output.dto";

@Controller("ecf")
export class EcfController {
    private readonly logger = new Logger(EcfController.name);

    constructor(private readonly ecfService: EcfService) {}

    // TODO: colocar um GUARD em todos os endpoints não públicos. Não posso deixar acessar se não informar o accessToken

    @Post("upload")
    @UseInterceptors(new CustomFileInterceptor("files"))
    uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        this.logger.log(`recebendo requisição upload do ecf:`);
        console.log(files[0]);

        this.ecfService.uploadEcfFile(files[0]);
    }

    @Get()
    findAll(): Promise<EcfListItemOutputDto[]> {
        this.logger.log(`recebendo requisição p/ listar todos os ecf's`);
        return this.ecfService.findAll();
    }

    @Get("indicators/:fileInfoId")
    findEcfIndicators(@Param("fileInfoId") fileInfoId: number): Promise<EcfIndicatorsOutputDto> {
        this.logger.log(`recebendo requisição p/ buscar os indicadores do ecf: ${fileInfoId}`);
        return this.ecfService.findIndicatorsByEcfInfoId(fileInfoId);
    }

    @Delete(":fileInfoId")
    deleteEcf(@Param("fileInfoId") fileInfoId: number): Promise<void> {
        this.logger.log(`recebendo requisição p/ excluir ecf: ${fileInfoId}`);
        return this.ecfService.delete(fileInfoId);
    }
}

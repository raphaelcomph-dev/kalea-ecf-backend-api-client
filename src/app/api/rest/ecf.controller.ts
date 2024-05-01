import { Controller, Delete, Get, Logger, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
    ApiUnprocessableEntityResponse,
} from "@nestjs/swagger";
import { EcfService } from "../../services/ecf.service";
import { CustomFileInterceptor } from "../../shared/interceptors/file.interceptor";
import { ApiErrorOutputDto } from "../../shared/models/api-error.output.dto";
import { EcfIndicatorsOutputDto } from "./dtos/output/ecf-indicators.output.dto";
import { EcfListItemOutputDto } from "./dtos/output/ecf-list-item.output.dto";

@ApiTags("ecf")
@Controller("ecf")
@ApiBearerAuth("access-token")
export class EcfController {
    private readonly logger = new Logger(EcfController.name);

    constructor(private readonly ecfService: EcfService) {}

    // TODO: colocar um GUARD em todos os endpoints não públicos. Não posso deixar acessar se não informar o accessToken
    // TODO: colocar um exemplo de como fazer o upload de arquivos no youtube e colocar o link do video na description da documentação.

    @ApiOperation({ description: "Realiza o upload de um arquivo ECF." })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description:
            "Envie o arquivo através de uma requisição com Body do tipo `multipart/form-data` cujo nome da key seja `files`",
        schema: {
            type: "object",
            properties: {
                files: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @ApiCreatedResponse({ description: "Upload do arquivo realizado com sucesso." })
    @ApiInternalServerErrorResponse({
        description:
            "Erro interno no servidor. Por favor, entre em contato conosco para investigarmos e resolvermos o problema o mais rápido possível.",
        type: ApiErrorOutputDto,
    })
    @ApiUnauthorizedResponse({
        description: "Token JWT não informado no header da requisição.",
        type: ApiErrorOutputDto,
    })
    @ApiBadRequestResponse({
        description: "Requisição mal formatada. Ex: Nenhum arquivo enviado, Multiplos arquivos enviados, etc.",
        type: ApiErrorOutputDto,
    })
    @ApiUnprocessableEntityResponse({
        description:
            "Erros de negócio. Ex: arquivo com tamanho maior que o permitido, arquivo com formato inválido, etc.",
        type: ApiErrorOutputDto,
    })
    @Post("upload")
    @UseInterceptors(new CustomFileInterceptor("files"))
    uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        this.logger.log(`recebendo requisição upload do ecf:`);
        console.log(files[0]);

        // TODO: verificar se existe apenas um único arquivo. Caso existam mais de um ou nenhum retornar HTTP 400:Bad Request

        this.ecfService.uploadEcfFile(files[0]);
    }

    @ApiOperation({
        description:
            "Lista todos os arquivos ECF cadastrados do usuário logado. \n\nObs: Esta requisição não retorna o conteúdo do arquivo, apenas seus meta-dados.",
    })
    @ApiOkResponse({ description: "Lista dos arquivos realizada com sucesso.", type: [EcfListItemOutputDto] })
    @ApiInternalServerErrorResponse({
        description:
            "Erro interno no servidor. Por favor, entre em contato conosco para investigarmos e resolvermos o problema o mais rápido possível.",
        type: ApiErrorOutputDto,
    })
    @ApiUnauthorizedResponse({
        description: "Token JWT não informado no header da requisição.",
        type: ApiErrorOutputDto,
    })
    @Get()
    findAll(): Promise<EcfListItemOutputDto[]> {
        this.logger.log(`recebendo requisição p/ listar todos os ecf's`);
        return this.ecfService.findAll();
    }

    @ApiOperation({
        description: "Lista os indicadores de um determinado arquivos ECF do usuário logado.",
    })
    @ApiOkResponse({ description: "Busca dos indicadores realizada com sucesso.", type: EcfIndicatorsOutputDto })
    @ApiInternalServerErrorResponse({
        description:
            "Erro interno no servidor. Por favor, entre em contato conosco para investigarmos e resolvermos o problema o mais rápido possível.",
        type: ApiErrorOutputDto,
    })
    @ApiUnauthorizedResponse({
        description: "Token JWT não informado no header da requisição.",
        type: ApiErrorOutputDto,
    })
    @Get("indicators/:fileInfoId")
    findEcfIndicators(@Param("fileInfoId") fileInfoId: number): Promise<EcfIndicatorsOutputDto> {
        this.logger.log(`recebendo requisição p/ buscar os indicadores do ecf: ${fileInfoId}`);
        return this.ecfService.findIndicatorsByEcfInfoId(fileInfoId);
    }

    @ApiOperation({
        description: "Exclui um arquivo ECF (binário, meta-dados e indicadores) do usuário logado.",
    })
    @ApiOkResponse({ description: "Exclusão do arquivo realizada com sucesso." })
    @ApiInternalServerErrorResponse({
        description:
            "Erro interno no servidor. Por favor, entre em contato conosco para investigarmos e resolvermos o problema o mais rápido possível.",
        type: ApiErrorOutputDto,
    })
    @ApiUnauthorizedResponse({
        description: "Token JWT não informado no header da requisição.",
        type: ApiErrorOutputDto,
    })
    @ApiNotFoundResponse({
        description: "Arquivo não encontrado.",
        type: ApiErrorOutputDto,
    })
    @Delete(":fileInfoId")
    deleteEcf(@Param("fileInfoId") fileInfoId: number): Promise<void> {
        this.logger.log(`recebendo requisição p/ excluir ecf: ${fileInfoId}`);
        return this.ecfService.delete(fileInfoId);
    }
}

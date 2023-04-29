import { Controller, Get } from '@nestjs/common';
import { ApiConflictResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) { }

    @ApiOperation({summary: 'Создание ролей в таблице (запускать один раз)'})
    @ApiResponse({status: 200, type: Boolean})
    @ApiConflictResponse({description: 'Роли уже существуют'})
    @Get('/init')
    createRoles() {
        return this.roleService.init();
    }
}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

    async init() {
        const roles = await this.roleRepository.findAll();
        if (roles.length > 0) {
            throw new ConflictException('Not need');
        }

        await this.roleRepository.bulkCreate([
            {name: 'admin', ru_name: 'Администратор'},
            {name: 'manager', ru_name: 'Менеджер'},
            {name: 'user', ru_name: 'Пользователь'}
        ])

        return true;
    }

}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let BaseService = class BaseService {
    constructor(baseRepository) {
        this.baseRepository = baseRepository;
    }
    async getall(relations) {
        return await this.baseRepository.find({ relations: relations });
    }
    async paginate(page = 1, relations) {
        const take = 15;
        const [data, total] = await this.baseRepository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations: relations,
        });
        return {
            data,
            meta: {
                page,
                last_page: Math.ceil(total / take),
                total,
            },
        };
    }
    async create(data) {
        return this.baseRepository.save(data);
    }
    async update(id, data) {
        return this.baseRepository.update(id, data);
    }
    async delete(id) {
        return this.baseRepository.delete(id);
    }
    async findOne(condition, relations) {
        return this.baseRepository.findOne({
            where: condition,
            relations: relations,
        });
    }
};
BaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map
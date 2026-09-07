import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tenant, TenantDocument } from './schemas/tenant.schema';

import { CreateTenantInput } from './dto/create-tenant.input';

@Injectable()
export class TenantService {
  constructor(
    @InjectModel(Tenant.name)
    private readonly tenantModel: Model<TenantDocument>,
  ) {}

  async create(input: CreateTenantInput): Promise<Tenant> {
    const domain = this.normalizeDomain(input.domain);

    const existingTenant = await this.tenantModel.findOne({
      domain,
    });

    if (existingTenant) {
      throw new ConflictException('A tenant with this domain already exists');
    }

    const tenant = new this.tenantModel({
      ...input,
      domain,
    });

    return tenant.save();
  }

  async findAll(): Promise<Tenant[]> {
    return this.tenantModel.find().exec();
  }

  async findById(id: string): Promise<Tenant> {
    const tenant = await this.tenantModel.findById(id).exec();

    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    return tenant;
  }

  async findByDomain(domain: string): Promise<Tenant | null> {
    return this.tenantModel
      .findOne({
        domain: this.normalizeDomain(domain),
      })
      .exec();
  }

  private normalizeDomain(domain: string): string {
    return domain
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');
  }
}

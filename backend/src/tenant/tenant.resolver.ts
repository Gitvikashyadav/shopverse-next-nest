import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Tenant } from './schemas/tenant.schema';
import { TenantService } from './tenant.service';
import { CreateTenantInput } from './dto/create-tenant.input';

@Resolver(() => Tenant)
export class TenantResolver {
  constructor(
    private readonly tenantService: TenantService,
  ) {}

  @Mutation(() => Tenant)
  async createTenant(
    @Args('createTenantInput')
    createTenantInput: CreateTenantInput,
  ) {
    return this.tenantService.create(createTenantInput);
  }

  @Query(() => [Tenant])
  async tenants() {
    return this.tenantService.findAll();
  }

  @Query(() => Tenant, { nullable: true })
  async tenantByDomain(
    @Args('domain') domain: string,
  ) {
    return this.tenantService.findByDomain(domain);
  }

  @Query(() => Tenant)
  async tenant(
    @Args('id', { type: () => ID }) id: string,
  ) {
    return this.tenantService.findById(id);
  }
}
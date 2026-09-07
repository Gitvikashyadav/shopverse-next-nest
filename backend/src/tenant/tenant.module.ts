import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tenant, TenantSchema } from './schemas/tenant.schema';
import { TenantService } from './tenant.service';
import { TenantResolver } from './tenant.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tenant.name,
        schema: TenantSchema,
      },
    ]),
  ],

  providers: [TenantService, TenantResolver],

  exports: [TenantService, MongooseModule],
})
export class TenantModule {}

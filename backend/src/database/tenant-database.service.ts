import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class TenantDatabaseService {
  private readonly logger = new Logger(TenantDatabaseService.name);

  // Store/reuse connections for each client database
  private readonly connections = new Map<string, Connection>();

  constructor(private readonly configService: ConfigService) {}

  async getConnection(databaseName: string): Promise<Connection> {
    // ----------------------------------------
    // 1. Validate database name
    // ----------------------------------------

    if (!databaseName) {
      throw new Error('Tenant database name is required');
    }

    // Only allow safe MongoDB database names
    if (!/^[a-zA-Z0-9_-]+$/.test(databaseName)) {
      throw new Error(`Invalid tenant database name: ${databaseName}`);
    }

    // ----------------------------------------
    // 2. Return existing connection
    // ----------------------------------------

    const existingConnection = this.connections.get(databaseName);

    if (
      existingConnection &&
      existingConnection.readyState === 1
    ) {
      return existingConnection;
    }

    // ----------------------------------------
    // 3. Get MongoDB base URI
    // ----------------------------------------

    const baseUri = this.configService.get<string>(
      'database.uri',
    );

    if (!baseUri) {
      throw new Error('database.uri is not configured');
    }

    // ----------------------------------------
    // 4. Create connection
    // ----------------------------------------

    const connection = mongoose.createConnection(
      baseUri,
      {
        dbName: databaseName,
      },
    );

    // Wait until MongoDB connection is ready
    await connection.asPromise();

    // ----------------------------------------
    // 5. Save connection for reuse
    // ----------------------------------------

    this.connections.set(databaseName, connection);

    this.logger.log(
      `Connected to tenant database: ${databaseName}`,
    );

    return connection;
  }

  // ----------------------------------------
  // Close a tenant connection
  // ----------------------------------------

  async closeConnection(databaseName: string): Promise<void> {
    const connection = this.connections.get(databaseName);

    if (connection) {
      await connection.close();

      this.connections.delete(databaseName);

      this.logger.log(
        `Closed tenant database: ${databaseName}`,
      );
    }
  }

  // ----------------------------------------
  // Check whether connection exists
  // ----------------------------------------

  hasConnection(databaseName: string): boolean {
    const connection = this.connections.get(databaseName);

    return !!connection && connection.readyState === 1;
  }
}
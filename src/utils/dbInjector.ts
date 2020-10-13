import dbConfig from '../../knexfile';
import knex from 'knex';

let connection : knex

export const getDatabaseConnector = () => {
  return () => {
    const configByEnvironment = dbConfig[process.env.KNEX_ENV || 'development'];
    if (!configByEnvironment) {
      throw new Error(
        `Failed to get knex configuration for env:${process.env.KNEX_ENV}`
      );
    }
    connection = knex(configByEnvironment);
    return connection;
  };
};

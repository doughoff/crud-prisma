// apiClient.ts
import axios from 'axios';
import { prisma } from '@crud/db';

type PrismaClientType = typeof prisma;

type FilterKeys<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type FilteredPrismaClientType = FilterKeys<
  PrismaClientType,
  | '$connect'
  | '$disconnect'
  | '$on'
  | '$transaction'
  | '$use'
  | '$executeRaw'
  | '$queryRaw'
  | '$queryRawUnsafe'
  | '$executeRawUnsafe'
>;

const apiClient = new Proxy(
  {},
  {
    get: (target, model: keyof PrismaClientType) => {
      return new Proxy(
        {},
        {
          get: (target, operation: keyof PrismaClientType[typeof model]) => {
            return async (
              params: Parameters<
                PrismaClientType[typeof model][typeof operation]
              >[0]
            ) => {
              const response = await axios.post(
                `http://localhost:3000/crud/${model}/${operation}`,
                params
              );
              return response.data;
            };
          },
        }
      );
    },
  }
) as FilteredPrismaClientType;

export default apiClient;

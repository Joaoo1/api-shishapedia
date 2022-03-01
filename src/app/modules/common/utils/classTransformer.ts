import { instanceToInstance, plainToClass } from 'class-transformer';

type ClassType<T> = new (...args: any[]) => T;

export function classTransformer<T, R>(
  classType: ClassType<T | T[]>,
  data: R | R[]
): T | T[] {
  const responseData = plainToClass<T | T[], R | R[]>(classType, data, {
    ignoreDecorators: true,
  });

  return instanceToInstance(responseData, {
    excludeExtraneousValues: true,
  });
}

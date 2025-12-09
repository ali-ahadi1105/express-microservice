import { ZodObject, ZodRawShape } from 'zod';

interface EnvOptions {
    source?: NodeJS.ProcessEnv;
    serviceName: string;
}

type SchemaOutput<TSchema extends ZodRawShape> = ZodObject<TSchema>['_output'];


export const createEnv = <TSchema extends ZodRawShape>(
    schema: ZodObject<TSchema>,
    options: EnvOptions,
): SchemaOutput<TSchema> => {
    const { source = process.env, serviceName = 'service' } = options ?? {};

    const parsed = schema.safeParse(source);

    if (!parsed.success) {
        const formatedErrors = parsed.error.format();
        const message = `Invalid environment variables for ${serviceName}: ${JSON.stringify(formatedErrors)}`;
        throw new Error(message);
    }

    return parsed.data;
};

export type EnvSchema<TShape extends ZodRawShape> = ZodObject<TShape>;
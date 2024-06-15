export type Type<T> = { new(...args: any[]): T }

interface ServiceLocator {
    factory<T>(type: Type<T>, factory: (context: ServiceContext) => T): void

    single<T>(type: Type<T>, factory: (context: ServiceContext) => T): void
}

export interface ServiceContext {
    get<T>(type: Type<T>): T
}

interface Bean<T> {
    get(context: ServiceContext): T
}

class FactoryBean<T> implements Bean<T> {
    private readonly definition: (context: ServiceContext) => T;

    constructor(definition: (context: ServiceContext) => T) {
        this.definition = definition
    }

    get(context: ServiceContext): T {
        return this.definition(context);
    }
}

class SingleBean<T> implements Bean<T> {
    private readonly definition: (context: ServiceContext) => T;
    private value: T | undefined;

    constructor(definition: (context: ServiceContext) => T) {
        this.definition = definition
    }

    get(context: ServiceContext): T {
        if (this.value !== undefined) return this.value;
        this.value = this.definition(context);
        return this.value;
    }
}


export class ServiceLocatorImpl implements ServiceLocator, ServiceContext {
    private readonly mBean: Map<{ new(): any }, Bean<any>>;

    constructor(definition: (context: ServiceLocator) => void) {
        this.mBean = new Map();
        definition(this)
    }

    factory<T>(type: Type<T>, factory: (context: ServiceContext) => T) {
        this.mBean.set(type, new FactoryBean(factory))
    }

    single<T>(type: Type<T>, factory: (context: ServiceContext) => T) {
        this.mBean.set(type, new SingleBean(factory))
    }

    get<T>(type: Type<T>): T {
        const bean = this.mBean.get(type);
        if (!bean) throw new Error("Not found definition of " + type)
        return bean.get(this)
    }
}

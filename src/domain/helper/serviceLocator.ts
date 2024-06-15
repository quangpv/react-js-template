export type Type<T> = { new(...args: any[]): T }
export type Getter = <T>(type: Type<T>) => T
export type ServiceFactory<T> = (get: Getter) => T

interface ServiceLocator {
    factory<T>(type: Type<T>, factory: ServiceFactory<T>): void

    single<T>(type: Type<T>, factory: ServiceFactory<T>): void
}

interface ServiceContext {
    get<T>(type: Type<T>): T
}

interface Bean<T> {
    get(context: Getter): T
}

class FactoryBean<T> implements Bean<T> {
    private readonly definition: (context: Getter) => T;

    constructor(definition: ServiceFactory<T>) {
        this.definition = definition
    }

    get(context: Getter): T {
        return this.definition(context);
    }
}

class SingleBean<T> implements Bean<T> {
    private readonly definition: (context: Getter) => T;
    private value: T | undefined;

    constructor(definition: ServiceFactory<T>) {
        this.definition = definition
    }

    get(context: Getter): T {
        if (this.value !== undefined) return this.value;
        this.value = this.definition(context);
        return this.value;
    }
}

export class ServiceLocatorImpl implements ServiceLocator, ServiceContext {
    private readonly mBean: Map<Type<any>, Bean<any>>;

    constructor(definition: (context: ServiceLocator) => void) {
        this.mBean = new Map();
        definition(this)
    }

    factory<T>(type: Type<T>, factory: ServiceFactory<T>) {
        this.mBean.set(type, new FactoryBean(factory))
    }

    single<T>(type: Type<T>, factory: ServiceFactory<T>) {
        this.mBean.set(type, new SingleBean(factory))
    }

    get<T>(type: Type<T>): T {
        const bean = this.mBean.get(type);
        if (!bean) throw new Error("Not found definition of " + type)
        return bean.get(this.get.bind(this))
    }
}

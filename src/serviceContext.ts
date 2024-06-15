import {ApiService} from "./data/apiService";
import {ServiceContext, ServiceLocatorImpl} from "./lib/serviceLocator";
import {LocalStore} from "./data/localStore";
import {Repository} from "./data/repository";


export const serviceContext: ServiceContext = new ServiceLocatorImpl(it => {
    it.factory(Repository, (it) =>
        new Repository(it.get(ApiService), it.get(LocalStore),))

    it.single(ApiService, () => new ApiService())
    it.single(LocalStore, () => new LocalStore())
})
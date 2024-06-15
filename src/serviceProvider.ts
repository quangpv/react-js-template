import {ApiService} from "./data/apiService";
import {Getter, ServiceLocatorImpl} from "./domain/helper/serviceLocator";
import {LocalStore} from "./data/localStore";
import {Repository} from "./data/repository";

const locator = new ServiceLocatorImpl(it => {
    it.factory(Repository, (get) => new Repository(get(ApiService), get(LocalStore),))
    it.single(ApiService, () => new ApiService())
    it.single(LocalStore, () => new LocalStore())
})

export const lookup: Getter = locator.get.bind(locator)
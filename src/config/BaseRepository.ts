import { Query } from "../decorators/Query";
import { Paging } from "../model/Paging";
export abstract class BaseRepository<T> {

    @Query()
    findAll: (paging?: Paging) => Promise<T[]>

    @Query()
    findById: (id: Required<string>) => Promise<T | undefined> 

    @Query()
    create: (item: T | Array<T>) => Promise<Array<T>>

    @Query()
    update: (items: T | Array<T>) => Promise<Array<T>>

    @Query()
    createOrUpdate: (items: T | Array<T>) => Promise<Array<T>>

    @Query()
    updatePartial: (id: Required<string>, itemPartial: Partial<T>) => Promise<void>

    @Query()
    delete: (id: Required<string> | Array<string>) => Promise<Array<string>>
}
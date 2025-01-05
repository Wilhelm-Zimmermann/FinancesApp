import { ISearchParams } from "@/models/ISearchParams";

export const createSearchParams = <T extends ISearchParams>(referenceObject: T): string =>   {
    let searchQuery = "";
    Object.entries(referenceObject).forEach(([key, value], index) => {
        if(value == null || value == undefined) return;
        if(index == 0) searchQuery += `?${key}=${value}`;
        else searchQuery += `&${key}=${value}`
    });
    return searchQuery;
}
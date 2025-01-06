import { ISearchParams } from "@/models/ISearchParams";

export const createSearchParams = <T extends ISearchParams>(referenceObject: T): string =>   {
    let searchQuery = "";
    let queryCharacter = "?";
    Object.entries(referenceObject).forEach(([key, value], index) => {
        if(value !== null && value !== undefined && value !== "undefined"){
            queryCharacter = searchQuery.includes("?") ? "&" : "?";
            searchQuery += `${queryCharacter}${key}=${value}`
        }
    });
    return searchQuery;
}
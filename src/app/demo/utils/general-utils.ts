import { cloneDeep } from "lodash";

export let GeneralUtils = {
    cloneObject(object: any) {
        return cloneDeep(object);
    },
}

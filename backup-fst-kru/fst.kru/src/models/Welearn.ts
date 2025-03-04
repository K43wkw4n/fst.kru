import { Branch } from "./Branch";

export interface Welearn {
    id: number;
    title: string;
    imageName: string;
    description: string;
    content: string;
    isUsed: number;
    branchId: number;
    branch: Branch;
    hidden: boolean;
}
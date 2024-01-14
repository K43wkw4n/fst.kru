import { requests } from "./agent";

export const Parcels = {
  getParcel: () => requests.get("Parcel/GetParcel"),
  getParcelOfBranch: (id: number) =>
    requests.get(`Parcel/GetParcelOfBranch?branchId=${id}`),

  createParcel: (values: any) =>
    requests.post("Parcel/CreateUpdateParcel", values),
  removeParcel: (parcelId: number) =>
    requests.delete(`Parcel/RemoveParcel?id=${parcelId}`),
};

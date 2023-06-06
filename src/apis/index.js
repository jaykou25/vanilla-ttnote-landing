import service from "../utils/request";

export const loginQrcode = () => {
  return service.request("/loginQrcode");
};

export const loginStatus = (params) => {
  return service.request("/loginStatus", { params });
};

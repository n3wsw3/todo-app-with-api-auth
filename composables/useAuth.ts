import { Ref } from "vue";

export const useAuth = () => {
  return useState("auth", () =>
    process.client ? localStorage.getItem("auth_token") : ""
  ) as Ref<string>;
};

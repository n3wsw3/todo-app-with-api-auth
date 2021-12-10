export default ref(process.client ? localStorage.getItem("auth_token") : "");

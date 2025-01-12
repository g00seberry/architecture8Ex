import { AuthData, doLogin } from "./doLogin";

class App {
  auth: AuthData | null = null;
  async login() {
    return doLogin().then((authData) => (this.auth = authData));
  }
  isLoggedIn() {
    return !!this.auth;
  }
}

const app = new App();
export const getApp = () => app;

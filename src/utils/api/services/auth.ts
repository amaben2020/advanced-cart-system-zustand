export class AuthService {
  async login(credentials: any) {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    } catch (error) {
      console.log(error);
    }
  }
}

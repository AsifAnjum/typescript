import { get, controller, use } from "./decorators";

function logger(req: Req, res: Res, next: Next) {
  console.log("Request was made");
  next();
}

@controller("/auth")
class LoginController {
  @get("/login")
  @use(logger)
  public getLogin(req: Req, res: Res): void {
    res.send(`
         <h1>Login Page</h1>
         <form method="POST">
         <div>
         <label>Email</label>
         <input name="email"  />
         </div>
         <div>
         <label>Password</label>
         <input name="password" type="password" />
         </div>
         <button type="submit">Login</button>
         </form>
        `);
  }
}

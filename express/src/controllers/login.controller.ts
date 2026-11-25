import { get, controller, use, post, bodyValidator } from "./decorators";

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

  @post("/login")
  @bodyValidator("email", "password")
  public postLogin(req: Req, res: Res) {
    const { email, password } = req.body;

    if (email === "hi@hi.com" && password === "1234") {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.send("Invalid email or password");
    }
  }

  @get("/logout")
  public getLogout(req: Req, res: Res) {
    req.session = undefined;
    res.redirect("/");
  }
}

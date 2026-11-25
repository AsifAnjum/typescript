import { get, controller, use } from "./decorators";

function requireAuth(req: Req, res: Res, next: Next): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not authorized");
}

@controller("")
class RootController {
  @get("/")
  public getRoot(req: Req, res: Res): void {
    if (req.session?.loggedIn) {
      res.send(`
        <div>
          <div>You are logged in</div>
          <a href="/auth/logout">Logout</a>
        </div>
      `);
    } else {
      res.send(`
        <div>
          <div>You are not logged in</div>
          <a href="/auth/login">Login</a>
        </div>
      `);
    }
  }

  @get("/protected")
  @use(requireAuth)
  public getProtected(req: Req, res: Res): void {
    res.send("Welcome to protected route");
  }
}

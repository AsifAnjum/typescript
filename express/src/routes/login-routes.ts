import { NextFunction, Router } from "express";

interface RequestWithBody extends Req {
  body: { [key: string]: string | undefined };
}

function requireAuth(req: Req, res: Res, next: NextFunction): void {
  if (req.session?.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send("Not authorized");
}

const router = Router();

router.get("/login", (req, res) => {
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
});

router.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.session?.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/log-out" style="display: inline-block !important; visibility: visible !important; opacity: 1 !important; pointer-events: auto !important;">Logout</a>
      </div>
    `);
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `);
  }
});

router.get("/log-out", (req, res) => {
  req.session = undefined;
  res.redirect("/");
});

router.get("/protected", requireAuth, (req: Req, res: Res) => {
  res.send("Welcome to protected route");
});

export { router };

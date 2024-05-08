import "dotenv/config"; // To read CLERK_SECRET_KEY

import {
  ClerkExpressWithAuth,
  LooseAuthProp,
  WithAuthProp,
} from "@clerk/clerk-sdk-node";
import express, { Application, NextFunction, Request, Response } from "express";

const port = process.env.PORT || 3000;

const app: Application = express();

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

// Use the lax middleware that returns an empty auth object when unauthenticated
app.get(
  "/protected",
  ClerkExpressWithAuth({}),
  (req: WithAuthProp<Request>, res: Response) => {
    res.json(req.auth);
  }
);

app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
  console.error(err.stack);
  res.status(401).send("Unauthenticated!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

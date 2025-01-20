import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { TeamAssignmentSchema } from "../validations/teamSchemas";
import { db } from "@ssms/lib/drizzle";
import { teamAssignments, teams } from "../db/schemas/teams";
import { eq, and, isNull } from "drizzle-orm";
import { user } from "../db/schemas/auth";

export const teamsHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db
        .select({
          id: teams.id,
          name: teams.name,
          createdAt: teams.createdAt,
          updatedAt: teams.updatedAt,
        })
        .from(teams)
        .prepare("get_all_teams");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/team-assignments/:id", async (c) => {
    const teamId = c.req.param("id");

    try {
      const stmt = db
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
        })
        .from(teamAssignments)
        .innerJoin(user, eq(user.id, teamAssignments.userId))
        .where(eq(teamAssignments.teamId, teamId))
        .prepare("get_assigned_users_by_team_id");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/unassigned-users", async (c) => {
    try {
      const stmt = db
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
        })
        .from(user)
        .leftJoin(teamAssignments, eq(user.id, teamAssignments.userId))
        .where(and(eq(user.role, "support"), isNull(teamAssignments.id)))
        .prepare("get_all_unassigned_users");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .post("/team-assignments", zValidator("form", TeamAssignmentSchema), async (c) => {
    const body = c.req.valid("form");

    try {
      const res = await db.transaction(async (tx) => {
        const newTeam = await tx
          .insert(teams)
          .values({ name: body.name })
          .returning({ id: teams.id, name: teams.name });

        body.users.map(async (id) => {
          return await tx
            .insert(teamAssignments)
            .values({ userId: id, teamId: newTeam[0].id })
            .returning({ userId: teamAssignments.userId });
        });

        return newTeam[0];
      });

      const users = await db
        .select({
          name: user.name,
          image: user.image,
        })
        .from(teamAssignments)
        .where(eq(teamAssignments.teamId, res.id))
        .innerJoin(user, eq(user.id, teamAssignments.userId));

      return c.json({ team: res.name, users });
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  });

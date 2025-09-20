import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { User } from "@/domain/entities/User";
import { db } from "../db/connection";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export class UserRepositoryDrizzle implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const row = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(id)))
      .then((res) => res[0]);
    if (!row) return null;
    return new User(String(row.id), row.name, row.email, row.avatar);
  }

  async findAll(): Promise<User[]> {
    const rows = await db.select().from(users);
    return rows.map(
      (r) => new User(String(r.id), r.name, r.email, r.avatar || undefined)
    );
  }
}

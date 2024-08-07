import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enum/user-role.enum";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  //   // Add method to validate password
  //   validatePassword(password: string): boolean {
  //     // Implement your password validation logic here
  //     // For simplicity, let's assume passwords are stored in plain text (which is not recommended in production)
  //     return this.password === password;
  //   }
}

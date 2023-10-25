import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Worlds } from '../worlds/worlds.entity';

@Index('user_email_index', ['email'], { unique: true })
@Index('users_email_uk', ['email'], { unique: true })
@Index('users_pk', ['id'], { unique: true })
@Index('user_login_index', ['login'], { unique: true })
@Index('users_login_uk', ['login'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @Column('character varying', {
    name: 'name',
    nullable: true,
    length: 255,
  })
  name: string | null;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('boolean', { name: 'mailing', nullable: true })
  mailing: boolean | null;

  @Column('boolean', { name: 'notification', nullable: true })
  notification: boolean | null;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'login', unique: true, length: 255 })
  login: string;

  @Column('character varying', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column('integer', { name: 'type', default: () => '0' })
  type: number;

  @Column('character varying', {
    name: 'recoverylink',
    nullable: true,
    length: 255,
  })
  recoverylink: string | null;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Worlds, (world) => world.user)
  worlds: Worlds[];
}

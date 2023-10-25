import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('users_email_uk', ['email'], { unique: true })
@Index('users_pk', ['id'], { unique: true })
@Index('users_login_uk', ['login'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'login', unique: true, length: 255 })
  login: string;

  @Column('character varying', {
    name: 'usernome',
    length: 255,
    nullable: true,
  })
  name: string;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('character varying', {
    name: 'image',
    nullable: true,
    length: 255,
  })
  image: string | null;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 255,
  })
  password: string | null;

  @Column('integer', { name: 'type', default: () => '0' })
  type: number;

  @Column('boolean', { name: 'available', default: () => 'true' })
  available: boolean;

  @Column('boolean', { name: 'mailing', nullable: true })
  mailing: boolean | null;

  @Column('boolean', { name: 'notification', nullable: true })
  notification: boolean | null;

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
  created_at: Date;

  @Column('timestamp with time zone', { name: 'updated_at', nullable: true })
  updated_at: Date | null;
}

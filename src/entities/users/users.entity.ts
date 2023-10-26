import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Worlds } from '../worlds/worlds.entity';
import { Adventures } from '../adventures/adventures.entity';
import { Adversaries } from '../adversaries/adversaries.entity';
import { CharSheetAttributes } from '../character-sheets/char-sheet-attributes.entity';
import { CharacterSheets } from '../character-sheets/character-sheets.entity';
import { Characters } from '../characters/characters.entity';
import { Cities } from '../cities/cities.entity';
import { InterestPoints } from '../interest-points/interest-points.entity';
import { Organizations } from '../organizations/organizations.entity';
import { Planes } from '../planes/planes.entity';
import { Reigns } from '../reigns/reigns.entity';
import { RpgSystemAtributtes } from '../rpg_systems/rpg-system-atributtes';
import { RpgSystemCategories } from '../rpg_systems/rpg-system-categories.entity';
import { RpgSystems } from '../rpg_systems/rpg-systems.entity';
import { CharSheetAttacks } from '../character-sheets/char-sheet-attacks.entity';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => Adventures, (adventures) => adventures.user)
  adventures: Adventures[];

  @OneToMany(() => Adversaries, (adversaries) => adversaries.user)
  adversaries: Adversaries[];

  @OneToMany(
    () => CharSheetAttributes,
    (charSheetAttributes) => charSheetAttributes.user,
  )
  charSheetAttributes: CharSheetAttributes[];

  @OneToMany(() => CharacterSheets, (characterSheets) => characterSheets.user)
  characterSheets: CharacterSheets[];

  @OneToMany(() => Characters, (characters) => characters.user)
  characters: Characters[];

  @OneToMany(() => Cities, (cities) => cities.user)
  cities: Cities[];

  @OneToMany(() => InterestPoints, (interestPoints) => interestPoints.user)
  interestPoints: InterestPoints[];

  @OneToMany(() => Organizations, (organizations) => organizations.user)
  organizations: Organizations[];

  @OneToMany(() => Planes, (planes) => planes.user)
  planes: Planes[];

  @OneToMany(() => Reigns, (reigns) => reigns.user)
  reigns: Reigns[];

  @OneToMany(
    () => RpgSystemAtributtes,
    (rpgSystemAtributtes) => rpgSystemAtributtes.user,
  )
  rpgSystemAtributtes: RpgSystemAtributtes[];

  @OneToMany(
    () => RpgSystemCategories,
    (rpgSystemCategories) => rpgSystemCategories.user,
  )
  rpgSystemCategories: RpgSystemCategories[];

  @OneToMany(() => RpgSystems, (rpgSystems) => rpgSystems.user)
  rpgSystems: RpgSystems[];

  @OneToMany(() => Worlds, (worlds) => worlds.user)
  worlds: Worlds[];

  @OneToMany(
    () => CharSheetAttacks,
    (charSheetAttacks) => charSheetAttacks.user,
  )
  charSheetAttacks: CharSheetAttacks[];
}

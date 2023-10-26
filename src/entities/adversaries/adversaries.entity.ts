import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterSheets } from '../character-sheets/character-sheets.entity';
import { Users } from '../users/users.entity';

@Index('adversaries_pkey', ['id'], { unique: true })
@Entity('adversaries', { schema: 'public' })
export class Adversaries {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @Column('integer', { name: 'experience', nullable: true })
  experience: number | null;

  @Column('character varying', { name: 'image', nullable: true, length: 255 })
  image: string | null;

  @Column('character varying', { name: 'concept', nullable: true, length: 255 })
  concept: string | null;

  @Column('character varying', { name: 'size', nullable: true, length: 255 })
  size: string | null;

  @Column('character varying', {
    name: 'alignment',
    nullable: true,
    length: 255,
  })
  alignment: string | null;

  @Column('text', { name: 'habitat', nullable: true })
  habitat: string | null;

  @Column('character varying', {
    name: 'quantity',
    nullable: true,
    length: 255,
  })
  quantity: string | null;

  @Column('timestamp without time zone', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @Column('character varying', {
    name: 'movement',
    nullable: true,
    length: 255,
  })
  movement: string | null;

  @Column('text', { name: 'combat', nullable: true })
  combat: string | null;

  @ManyToOne(() => Users, (users) => users.adversaries)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @OneToMany(
    () => CharacterSheets,
    (characterSheets) => characterSheets.adversary,
  )
  characterSheets: CharacterSheets[];
}

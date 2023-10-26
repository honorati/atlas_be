import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CharacterSheets } from './character-sheets.entity';
import { Users } from '../users/users.entity';

@Index('char_sheet_attacks_pkey', ['id'], { unique: true })
@Entity('char_sheet_attacks', { schema: 'public' })
export class CharSheetAttacks {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => CharacterSheets,
    (characterSheets) => characterSheets.charSheetAttacks,
  )
  @JoinColumn([{ name: 'char_sheet_id', referencedColumnName: 'id' }])
  charSheet: CharacterSheets;

  @ManyToOne(() => Users, (users) => users.charSheetAttacks)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}

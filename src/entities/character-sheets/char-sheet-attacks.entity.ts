import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { CharacterSheets } from './character-sheets.entity';
import { Users } from '../users/users.entity';

@Index('char_sheet_attacks_pkey', ['id'], { unique: true })
@Entity('char_sheet_attacks', { schema: 'public' })
export class CharSheetAttacks {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('varchar', { name: 'name', length: 100 })
   name: string;

   @Column('text', { name: 'description', nullable: true })
   description: string | null;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
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

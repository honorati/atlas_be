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
import { RpgSystemAtributtes } from '../rpg_systems/rpg-system-atributtes.entity';
import { Users } from '../users/users.entity';

@Index('char_sheet_attributes_pkey', ['id'], { unique: true })
@Entity('char_sheet_attributes', { schema: 'public' })
export class CharSheetAttributes {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('varchar', { name: 'value', nullable: true, length: 100 })
   value: string | null;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
   deletedAt: Date | null;

   @ManyToOne(
      () => CharacterSheets,
      (characterSheet) => characterSheet.charSheetAttributes,
   )
   @JoinColumn([{ name: 'char_sheet_id', referencedColumnName: 'id' }])
   charSheet: CharacterSheets;

   @ManyToOne(
      () => RpgSystemAtributtes,
      (rpgSystemAtributtes) => rpgSystemAtributtes.charSheetAttributes,
   )
   @JoinColumn([{ name: 'system_attribute_id', referencedColumnName: 'id' }])
   systemAttribute: RpgSystemAtributtes;

   @ManyToOne(() => Users, (users) => users.charSheetAttributes)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;
}

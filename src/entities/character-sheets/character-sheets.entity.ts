import {
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { CharSheetAttributes } from './char-sheet-attributes.entity';
import { Enemies } from '../enemies/enemies.entity';
import { Characters } from '../characters/characters.entity';
import { RpgSystems } from '../rpg_systems/rpg-systems.entity';
import { CharSheetAttacks } from './char-sheet-attacks.entity';
import { Users } from '../users/users.entity';

@Index('character_sheets_pkey', ['id'], { unique: true })
@Entity('character_sheets', { schema: 'public' })
export class CharacterSheets {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
   deletedAt: Date | null;

   @OneToMany(
      () => CharSheetAttributes,
      (charSheetAttributes) => charSheetAttributes.charSheet,
   )
   charSheetAttributes: CharSheetAttributes[];

   @ManyToOne(() => Enemies, (adversaries) => adversaries.characterSheets)
   @JoinColumn([{ name: 'adversary_id', referencedColumnName: 'id' }])
   adversary: Enemies;

   @ManyToOne(() => Characters, (characters) => characters.characterSheets)
   @JoinColumn([{ name: 'character_id', referencedColumnName: 'id' }])
   character: Characters;

   @ManyToOne(() => RpgSystems, (rpgSystems) => rpgSystems.characterSheets)
   @JoinColumn([{ name: 'system_id', referencedColumnName: 'id' }])
   system: RpgSystems;

   @OneToMany(
      () => CharSheetAttacks,
      (charSheetAttacks) => charSheetAttacks.charSheet,
   )
   charSheetAttacks: CharSheetAttacks[];

   @ManyToOne(() => Users, (users) => users.characterSheets)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;
}

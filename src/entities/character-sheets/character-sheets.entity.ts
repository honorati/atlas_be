import {
   Column,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
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

   @Column('timestamp without time zone', { name: 'created_at' })
   createdAt: Date;

   @Column('timestamp without time zone', {
      name: 'updated_at',
      nullable: true,
   })
   updatedAt: Date | null;

   @Column('timestamp without time zone', {
      name: 'deleted_at',
      nullable: true,
   })
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

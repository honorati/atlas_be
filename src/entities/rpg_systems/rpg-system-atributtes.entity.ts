import {
   Column,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { CharSheetAttributes } from '../character-sheets/char-sheet-attributes.entity';
import { RpgSystemCategories } from './rpg-system-categories.entity';
import { Users } from '../users/users.entity';

@Index('rpg_system_atributtes_pkey', ['id'], { unique: true })
@Entity('rpg_system_atributtes', { schema: 'public' })
export class RpgSystemAtributtes {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('character varying', { name: 'name', length: 100 })
   name: string;

   @Column('character varying', {
      name: 'abbreviation',
      nullable: true,
      length: 10,
   })
   abbreviation: string | null;

   @Column('integer', { name: 'position' })
   position: number;

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
      (charSheetAttributes) => charSheetAttributes.systemAttribute,
   )
   charSheetAttributes: CharSheetAttributes[];

   @ManyToOne(
      () => RpgSystemCategories,
      (rpgSystemCategories) => rpgSystemCategories.rpgSystemAtributtes,
   )
   @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
   category: RpgSystemCategories;

   @ManyToOne(() => Users, (users) => users.rpgSystemAtributtes)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;
}

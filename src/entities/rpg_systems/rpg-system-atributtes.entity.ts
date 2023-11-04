import {
   Column,
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
import { CharSheetAttributes } from '../character-sheets/char-sheet-attributes.entity';
import { RpgSystemCategories } from './rpg-system-categories.entity';
import { Users } from '../users/users.entity';

@Index('rpg_system_atributtes_pkey', ['id'], { unique: true })
@Entity('rpg_system_atributtes', { schema: 'public' })
export class RpgSystemAtributtes {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('varchar', { name: 'name', length: 100 })
   name: string;

   @Column('varchar', {
      name: 'abbreviation',
      nullable: true,
      length: 10,
   })
   abbreviation: string | null;

   @Column('integer', { name: 'position' })
   position: number;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
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

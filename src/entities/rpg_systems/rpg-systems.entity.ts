import {
   Column,
   CreateDateColumn,
   DeleteDateColumn,
   Entity,
   Generated,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { CharacterSheets } from '../character-sheets/character-sheets.entity';
import { RpgSystemCategories } from './rpg-system-categories.entity';
import { Users } from '../users/users.entity';

@Index('rpg_systems_pkey', ['id'], { unique: true })
@Entity('rpg_systems', { schema: 'public' })
export class RpgSystems {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'Id' })
   id: number;

   @Column('uuid', { name: 'unique_id' })
   @Generated('uuid')
   uniqueId: string;

   @Column('varchar', { name: 'name', length: 255 })
   name: string;

   @Column('text', { name: 'Description', nullable: true })
   description: string | null;

   @Column('varchar', { name: 'image', nullable: true, length: 255 })
   image: string | null;

   @Column('varchar', { name: 'source', nullable: true, length: 255 })
   source: string | null;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
   deletedAt: Date | null;

   @OneToMany(
      () => CharacterSheets,
      (characterSheets) => characterSheets.system,
   )
   characterSheets: CharacterSheets[];

   @OneToMany(
      () => RpgSystemCategories,
      (rpgSystemCategories) => rpgSystemCategories.system,
   )
   rpgSystemCategories: RpgSystemCategories[];

   @ManyToOne(() => Users, (users) => users.rpgSystems)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;
}

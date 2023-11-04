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
   OneToOne,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';
import { CharacterSheets } from '../character-sheets/character-sheets.entity';
import { OrganizationPersons } from '../organizations/organization-persons.entity';
import { Worlds } from '../worlds/worlds.entity';
import { Users } from '../users/users.entity';

@Index('characters_pkey', ['id'], { unique: true })
@Entity('characters', { schema: 'public' })
export class Characters {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('uuid', { name: 'unique_id' })
   @Generated('uuid')
   uniqueId: string;

   @Column('varchar', { name: 'name', length: 255 })
   name: string;

   @Column('varchar', { name: 'title', nullable: true, length: 255 })
   title: string | null;

   @Column('text', { name: 'description' })
   description: string;

   @Column('varchar', { name: 'image', nullable: true, length: 255 })
   image: string | null;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
   deletedAt: Date | null;

   @OneToMany(
      () => CharacterSheets,
      (characterSheets) => characterSheets.character,
   )
   characterSheets: CharacterSheets[];

   @ManyToOne(() => Worlds, (worlds) => worlds.characters)
   @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
   world: Worlds;

   @ManyToOne(() => Users, (users) => users.characters)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;

   @OneToOne(
      () => OrganizationPersons,
      (organizationPersons) => organizationPersons.person,
   )
   organizationPersons: OrganizationPersons;
}

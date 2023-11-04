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
import { Users } from '../users/users.entity';

@Index('enemies_pkey', ['id'], { unique: true })
@Entity('enemies', { schema: 'public' })
export class Enemies {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('uuid', { name: 'unique_id' })
   @Generated('uuid')
   uniqueId: string;

   @Column('varchar', { name: 'name', length: 100 })
   name: string;

   @Column('varchar', { name: 'title', nullable: true, length: 255 })
   title: string | null;

   @Column('integer', { name: 'experience', nullable: true })
   experience: number | null;

   @Column('varchar', { name: 'image', nullable: true, length: 255 })
   image: string | null;

   @Column('varchar', {
      name: 'concept',
      nullable: true,
      length: 255,
   })
   concept: string | null;

   @Column('varchar', { name: 'size', nullable: true, length: 255 })
   size: string | null;

   @Column('varchar', {
      name: 'alignment',
      nullable: true,
      length: 255,
   })
   alignment: string | null;

   @Column('text', { name: 'habitat', nullable: true })
   habitat: string | null;

   @Column('varchar', {
      name: 'quantity',
      nullable: true,
      length: 255,
   })
   quantity: string | null;

   @CreateDateColumn()
   createdAt: Date | null;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
   deletedAt: Date | null;

   @Column('varchar', {
      name: 'movement',
      nullable: true,
      length: 255,
   })
   movement: string | null;

   @Column('text', { name: 'combat', nullable: true })
   combat: string | null;

   @ManyToOne(() => Users, (users) => users.enemies)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;

   @OneToMany(
      () => CharacterSheets,
      (characterSheets) => characterSheets.adversary,
   )
   characterSheets: CharacterSheets[];
}

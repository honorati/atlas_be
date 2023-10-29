import {
   Column,
   Entity,
   Generated,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { Scenes } from './scenes.entity';
import { Worlds } from '../worlds/worlds.entity';
import { Users } from '../users/users.entity';

@Index('adventures_pkey', ['id'], { unique: true })
@Entity('adventures', { schema: 'public' })
export class Adventures {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

   @Column('uuid', { name: 'unique_id' })
   @Generated('uuid')
   uniqueId: string;

   @Column('character varying', { name: 'name', length: 100 })
   name: string;

   @Column('character varying', { name: 'title', nullable: true, length: 255 })
   title: string | null;

   @Column('text', { name: 'description', nullable: true })
   description: string | null;

   @Column('character varying', { name: 'image', nullable: true, length: 255 })
   image: string | null;

   @Column('timestamp without time zone', {
      name: 'created_at',
      nullable: true,
   })
   createdAt: Date | null;

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

   @ManyToOne(() => Worlds, (worlds) => worlds.adventures)
   @JoinColumn([{ name: 'world_id', referencedColumnName: 'id' }])
   world: Worlds;

   @ManyToOne(() => Users, (users) => users.adventures)
   @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
   user: Users;

   @OneToMany(() => Scenes, (scenes) => scenes.adventure)
   scenes: Scenes[];
}

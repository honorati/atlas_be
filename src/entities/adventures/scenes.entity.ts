import {
   Column,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   OneToMany,
   PrimaryGeneratedColumn,
} from 'typeorm';
import { Scenarios } from './scenarios.entity';
import { Adventures } from './adventures.entity';

@Index('scenes_pkey', ['id'], { unique: true })
@Entity('scenes', { schema: 'public' })
export class Scenes {
   @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
   id: number;

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

   @OneToMany(() => Scenarios, (scenarios) => scenarios.scene)
   scenarios: Scenarios[];

   @ManyToOne(() => Adventures, (adventures) => adventures.scenes)
   @JoinColumn([{ name: 'adventure_id', referencedColumnName: 'id' }])
   adventure: Adventures;
}

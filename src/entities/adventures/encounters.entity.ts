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
import { Scenarios } from './scenarios.entity';
import { Opponents } from './opponents.entity';

@Index('encounters_pkey', ['id'], { unique: true })
@Entity('encounters', { schema: 'public' })
export class Encounters {
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

   @ManyToOne(() => Scenarios, (scenarios) => scenarios.encounters)
   @JoinColumn([{ name: 'scenario_id', referencedColumnName: 'id' }])
   scenario: Scenarios;

   @OneToMany(() => Opponents, (opponents) => opponents.encounter)
   opponents: Opponents[];
}

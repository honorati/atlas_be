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

   @Column('varchar', { name: 'name', length: 100 })
   name: string;

   @Column('varchar', { name: 'title', nullable: true, length: 255 })
   title: string | null;

   @Column('text', { name: 'description', nullable: true })
   description: string | null;

   @Column('varchar', { name: 'image', nullable: true, length: 255 })
   image: string | null;

   @CreateDateColumn()
   createdAt: Date | null;

   @UpdateDateColumn()
   updatedAt: Date | null;

   @DeleteDateColumn()
   deletedAt: Date | null;

   @ManyToOne(() => Scenarios, (scenarios) => scenarios.encounters)
   @JoinColumn([{ name: 'scenario_id', referencedColumnName: 'id' }])
   scenario: Scenarios;

   @OneToMany(() => Opponents, (opponents) => opponents.encounter)
   opponents: Opponents[];
}

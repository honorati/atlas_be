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
import { Adventures } from './adventures.entity';

@Index('scenes_pkey', ['id'], { unique: true })
@Entity('scenes', { schema: 'public' })
export class Scenes {
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

   @OneToMany(() => Scenarios, (scenarios) => scenarios.scene)
   scenarios: Scenarios[];

   @ManyToOne(() => Adventures, (adventures) => adventures.scenes)
   @JoinColumn([{ name: 'adventure_id', referencedColumnName: 'id' }])
   adventure: Adventures;
}

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
import { Encounters } from './encounters.entity';
import { Scenes } from './scenes.entity';
import { Treasures } from './treasures.entity';

@Index('scenarios_pkey', ['id'], { unique: true })
@Entity('scenarios', { schema: 'public' })
export class Scenarios {
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

   @OneToMany(() => Encounters, (encounters) => encounters.scenario)
   encounters: Encounters[];

   @ManyToOne(() => Scenes, (scenes) => scenes.scenarios)
   @JoinColumn([{ name: 'scene_id', referencedColumnName: 'id' }])
   scene: Scenes;

   @OneToMany(() => Treasures, (treasures) => treasures.scenario)
   treasures: Treasures[];
}

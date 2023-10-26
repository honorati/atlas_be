import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RpgSystemAtributtes } from './rpg-system-atributtes';
import { RpgSystems } from './rpg-systems.entity';
import { Users } from '../users/users.entity';

@Index('rpg_system_categories_pkey', ['id'], { unique: true })
@Entity('rpg_system_categories', { schema: 'public' })
export class RpgSystemCategories {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'position' })
  position: number;

  @Column('character varying', { name: 'name', length: 255 })
  name: string;

  @Column('character varying', {
    name: 'abbreviation',
    nullable: true,
    length: 100,
  })
  abbreviation: string | null;

  @Column('timestamp without time zone', { name: 'created_at' })
  createdAt: Date;

  @Column('time without time zone', { name: 'updated_at', nullable: true })
  updatedAt: string | null;

  @Column('timestamp without time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(
    () => RpgSystemAtributtes,
    (rpgSystemAtributtes) => rpgSystemAtributtes.category,
  )
  rpgSystemAtributtes: RpgSystemAtributtes[];

  @ManyToOne(() => RpgSystems, (rpgSystems) => rpgSystems.rpgSystemCategories)
  @JoinColumn([{ name: 'system_id', referencedColumnName: 'id' }])
  system: RpgSystems;

  @ManyToOne(() => Users, (users) => users.rpgSystemCategories)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}

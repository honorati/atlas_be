import {
   Column,
   Entity,
   Index,
   JoinColumn,
   ManyToOne,
   OneToOne,
} from 'typeorm';
import { Organizations } from './organizations.entity';
import { Characters } from '../characters/characters.entity';

@Index('organization_persons_pkey', ['personId'], { unique: true })
@Entity('organization_persons', { schema: 'public' })
export class OrganizationPersons {
   @Column('integer', { primary: true, name: 'person_id' })
   personId: number;

   @ManyToOne(
      () => Organizations,
      (organizations) => organizations.organizationPersons,
   )
   @JoinColumn([{ name: 'organization_id', referencedColumnName: 'id' }])
   organization: Organizations;

   @OneToOne(() => Characters, (characters) => characters.organizationPersons)
   @JoinColumn([{ name: 'person_id', referencedColumnName: 'id' }])
   person: Characters;
}

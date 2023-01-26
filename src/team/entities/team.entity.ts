import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'team',
})
export class Team {
  @PrimaryGeneratedColumn()
  id: string
  @Column()
  name: string
  @Column()
  founded: number
  @Column('text', {
    array: true,
  })
  club_colors: string[]
  @Column()
  venue: string
  @Column()
  website: string
}

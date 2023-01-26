import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: string
  @Column()
  first_name: string
  @Column()
  last_name: string
  @Column()
  shirt_name: string
  @Column()
  shirt_number: number
  @Column()
  shirt_size: string
  @Column()
  birthday: Date
  @Column()
  nationality: string
  @Column()
  favorite_player: string
}

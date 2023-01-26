import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({
  name: 'players',
})
export class Player {
  @PrimaryGeneratedColumn()
  id: string
  @Column()
  first_name: string
  @Column()
  last_name: string
  @Column()
  shirt_name: string
  @Column()
  position: string
  @Column()
  birthday: Date
  @Column()
  nationality: string
  @Column()
  shirt_number: number
  @Column()
  contract_start: Date
  @Column()
  contract_end: Date
}

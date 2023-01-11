import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'news',
})
export class News {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  created_at: Date;
}

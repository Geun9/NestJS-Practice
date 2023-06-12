import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import Posts from 'src/posts/entities/post.entity';

const saltRounds = 10;

@Entity()
export default class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
}

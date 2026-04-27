import { PrimaryKey, Model, Table, Column } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

interface TaskCreationAttributes {
  title: string;
  description: string;
  completed?: boolean;
}

@Table({
  tableName: 'Task',
})
class Task extends Model<Task, TaskCreationAttributes> {
  @PrimaryKey
  @Column({
    type: DataTypes.INTEGER,
    comment: 'Unique identifier',
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Task title',
  })
  declare title: string;

  @Column({
    type: DataTypes.TEXT,
    comment: 'Task description',
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Task completion status',
  })
  declare completed: boolean;
}

export default Task;

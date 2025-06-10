// Value Object: Chore Details
export interface ChoreProps {
  id: string;
  name: string;
  description?: string;
  dueDate: Date;
  schedule: 'one-time' | 'daily' | 'weekly' | 'monthly';
  value: number;
}

export class Chore {
  constructor(private props: ChoreProps) {}

  get id() { return this.props.id; }
  get name() { return this.props.name; }
  get description() { return this.props.description; }
  get dueDate() { return this.props.dueDate; }
  get schedule() { return this.props.schedule; }
  get value() { return this.props.value; }
}

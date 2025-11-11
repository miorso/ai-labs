export interface LabChoice {
  title: string;
  value: string;
  type: 'exercise' | 'solution';
}

export type Action = 'reload' | 'readme' | 'choose' | 'quit';

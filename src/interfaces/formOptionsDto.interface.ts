interface State {
  name: string,
  abbreviation: string
}

export interface FormOptionsDto {
  occupations: string[],
  states: State[]
}
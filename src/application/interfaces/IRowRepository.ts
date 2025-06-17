import Row, { RowAttributes } from "../../domain/entities/row.model";

export interface IEmployeeRepository {
  save(row: RowAttributes): Promise<Row>;
}
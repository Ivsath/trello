// We have to provide information about it to react-dnd
export type ColumnDragItem = {
  index: number;
  id: string;
  text: string;
  type: 'COLUMN';
};

export type DragItem = ColumnDragItem;

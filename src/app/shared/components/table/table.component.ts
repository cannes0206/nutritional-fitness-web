import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnTypeEnum, InitColumn } from './table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  dataSource = new MatTableDataSource([]);

  @Input() itemsPerPageLabel: string = 'Rows per page:';
  @Input() displayedColumnNames: string[] = [];
  @Input() initColumn: InitColumn[] = [];
  @Input() hasPagination: boolean = true;
  @Input() hasSelectableRows: boolean = false;
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 25]
  @Output() selectedRow: EventEmitter<any> = new EventEmitter();

  columnTypeEnum = ColumnTypeEnum;

  @ViewChild(MatSort, { static: true }) matSort = new MatSort();

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
      this.dataSource.paginator._intl = new MatPaginatorIntl();
      this.dataSource.paginator._intl.itemsPerPageLabel = this.itemsPerPageLabel;
    }
  }

  @Input() set tableData(data: any[] | null) {
    this.setTableDataSource(data);
  }

  setTableDataSource(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }

      return data[sortHeaderId];
    };
    this.dataSource.sort = this.matSort;
  }
}

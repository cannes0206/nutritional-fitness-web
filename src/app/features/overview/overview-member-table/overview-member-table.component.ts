import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnTypeEnum, InitiateColumn } from './overview-member-table';

@Component({
  selector: 'app-overview-member-table',
  templateUrl: './overview-member-table.component.html',
  styleUrls: ['./overview-member-table.component.scss']
})
export class OverviewMemberTableComponent {

  dataSource = new MatTableDataSource([]);

  @Input() itemsPerPageLabel: string = 'Rows per page:';
  @Input() displayedColumnNames: string[] = [];
  @Input() initColumn: InitiateColumn[] = [];
  @Input() hasSelectableRows: boolean = true;
  @Input() pageSize: number = 20;
  @Input() pageSizeOptions: number[] = [20, 40, 60]
  @Output() selectedRow: EventEmitter<any> = new EventEmitter();
  @Output() iconClicked: EventEmitter<any> = new EventEmitter();


  columnTypeEnum = ColumnTypeEnum;

  @ViewChild(MatSort, { static: true }) matSort = new MatSort();

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    if (paginator) {
      this.dataSource.paginator = paginator;
      this.dataSource.paginator._intl = new MatPaginatorIntl();
      this.dataSource.paginator._intl.itemsPerPageLabel = this.itemsPerPageLabel;
    }
  }

  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }

  onClickIcon(event: any, data: any) {
    event.stopPropagation();
    this.iconClicked.emit(data);
  }

  onSelectedRow(event: any, data: any) {
    event.stopPropagation();
    this.selectedRow.emit(data);
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

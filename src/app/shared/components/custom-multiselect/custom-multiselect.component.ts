import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

export interface MultiSelectGridItem {
  item_id: number | null;
  item_text: string;
}

@Component({
  selector: 'app-custom-multiselect',
  templateUrl: './custom-multiselect.component.html',
  styleUrls: ['./custom-multiselect.component.scss']
})
export class CustomMultiselectComponent implements OnInit {
  @Input() selectedItems: any;
  @Input() placeholder: string = 'No Data';
  @Output() removeItem: EventEmitter<MultiSelectGridItem> = new EventEmitter();
  dropdownSettings: IDropdownSettings = {};
  constructor() {}

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: false
    };
  }

  onItemDeSelect(item: any) {
    this.removeItem.emit(item);
  }
}

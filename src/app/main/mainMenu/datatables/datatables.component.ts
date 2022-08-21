import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from "@swimlane/ngx-datatable";

import { CoreTranslationService } from "@core/services/translation.service";

import { locale as german } from "./i18n/de";
import { locale as english } from "./i18n/en";
import { locale as french } from "./i18n/fr";
import { locale as portuguese } from "./i18n/pt";

import { DatatablesService } from "./datatables.service";

@Component({
  selector: "app-datatables",
  templateUrl: "./datatables.component.html",
  styleUrls: ["./datatables.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class DatatablesComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  // public
  public contentHeader: object;
  public rows: any;
  public selected = [];
  public blogskRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild("tableRowDetails") tableRowDetails: any;

  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    this.blogskRows = temp;
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    console.log("Select Event", selected, this.selected);

    this.selected.splice(0, this.selected.length);
    // this.selected.push(...selected);
  }

  onActivate(event) {}

  constructor(
    private _datatablesService: DatatablesService,
    private _coreTranslationService: CoreTranslationService
  ) {
    this._unsubscribeAll = new Subject();
    this._coreTranslationService.translate(english, french, german, portuguese);
  }

  deleteBlog(id: number) {
    this._datatablesService.deleteDataBlog(id).subscribe({
      next: (res) => {
        this.getAllBlogs();
      },
      error: (err) => {
        alert("Error in deleting blog");
      },
    });
  }

  getAllBlogs() {
    this._datatablesService.getDataBlogs().subscribe({
      next: (res) => {
        this.rows = res;
        this.tempData = this.rows;
        this.blogskRows = this.rows;
        this.exportCSVData = this.rows;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  ngOnInit() {
    this.getAllBlogs();

    this.contentHeader = {
      headerTitle: "Blogs",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Blogs",
            isLink: false,
            link: "/blog",
          },
        ],
      },
    };
  }
}

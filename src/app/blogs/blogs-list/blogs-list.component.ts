import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";

import { StorageService } from "../../_services/storage.service";

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

import { BlogsService } from "../blogs.service";

@Component({
  selector: "app-blogs-list",
  templateUrl: "./blogs-list.component.html",
  styleUrls: ["./blogs-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BlogsListComponent implements OnInit {
  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  public coreConfig: any;

  currentUser: any;

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

  private modalId: number;
  private modalFileUpload: string;

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
    private blogsService: BlogsService,
    private _coreTranslationService: CoreTranslationService,
    private _coreConfigService: CoreConfigService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this._unsubscribeAll = new Subject();
    this._coreTranslationService.translate(english, french, german, portuguese);

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        menu: {
          hidden: false,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  // modal Basic
  modalOpen(modalBasic, id: number) {
    this.modalService
      .open(modalBasic, {
        windowClass: "modal",
        size: "xs", // size: 'xs' | 'sm' | 'lg' | 'xl'
      })
      .result.then((result) => {
        if (result) {
          console.log(result);
          this.deleteBlog();
        }
      });

    this.modalId = id;
  }

  setModalFileUpload(fileUpload: string) {
    this.modalFileUpload = fileUpload;
    console.log(this.modalFileUpload);
  }

  deleteBlog() {
    this.modalService.activeInstances.closed;

    if (this.modalFileUpload) {
      this.blogsService.removeFile(this.modalFileUpload);
    }

    this.blogsService.deleteDataBlog(this.modalId).subscribe({
      next: (res) => {
        this.getAllBlogs();
      },
      error: (err) => {
        alert("Error in deleting blog");
      },
    });
  }

  getAllBlogs() {
    this.blogsService.getDataBlogs().subscribe({
      next: (res) => {
        this.rows = res;
        this.tempData = this.rows;
        this.blogskRows = this.rows;
        this.exportCSVData = this.rows;

        console.log(typeof(this.rows));
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  ngOnInit() {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });

    this.currentUser = this.storageService.getUser();
    if (!this.currentUser.username) {
      this.router.navigate(["/authentication/login"]);
    }

    this.getAllBlogs();

    this.contentHeader = {
      headerTitle: "Blogs",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Blogs",
            isLink: true,
            link: "/blogs",
          },
        ],
      },
    };
  }
}

import { Component, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";

import { BlogsService } from "../_services/blogs.service";

import * as moment from "moment";

@Component({
  selector: "beranda",
  templateUrl: "./beranda.component.html",
  styleUrls: ["./beranda.component.scss"],
})
export class BerandaComponent implements OnInit {
  // public
  public contentHeader: object;
  public coreConfig: any;
  public rows: any;
  private tempData = [];
  public blogskRows: any;
  public exportCSVData;
  public _baseUrl = "http://localhost:8080";

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private blogsService: BlogsService
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        menu: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: true,
      },
    };
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });

    this.getAllBlogs();

    this.contentHeader = {
      headerTitle: "Beranda",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Beranda",
            isLink: true,
            link: "/beranda",
          },
        ],
      },
    };
  }

  getAllBlogs() {
    this.blogsService.getDataBlogs().subscribe({
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

  truncateTitle(input) {
    if (input.length > 60) {
      return input.substring(0, 60) + "...";
    }
    return input;
  }

  removeTag(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 125) + "...";
  }

  setMoment(input): string {
    return moment(input).fromNow();
  }
}

import { Component, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";

import { BlogsService } from "../../app/blogs/blogs.service";

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
        enableLocalStorage: false,
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
      actionButton: true,
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

        console.log(this.rows);
        console.log(typeof this.rows);
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  truncateTitle(input) {
    if (input.length > 30) {
      return input.substring(0, 55) + "...";
    }
    return input;
  }

  removeTag(input){
    return input.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100) + "...";
  }
}

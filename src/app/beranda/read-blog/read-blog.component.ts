import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";

import { BlogsService } from "../../_services/blogs.service";
import { StorageService } from "../../_services/storage.service";

@Component({
  selector: "app-read-blog",
  templateUrl: "./read-blog.component.html",
  styleUrls: ["./read-blog.component.scss"],
})
export class ReadBlogComponent implements OnInit {
  
  // public
  public contentHeader: object;
  public coreConfig: any;
  public data: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  id: number;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _coreConfigService: CoreConfigService,
    private storageService: StorageService,
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

  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });

      this.id = this.route.snapshot.params["id"];

      this.blogsService.getBlogById(this.id).subscribe({
        next: (res) => {
          console.log(res);
          this.data = res;
        },
      });
      

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
}

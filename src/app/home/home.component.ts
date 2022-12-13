import { Component, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";

import { StorageService } from "../_services/storage.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  public contentHeader: object;
  public coreConfig: any;

  currentUser: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreConfigService: CoreConfigService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();

    // Configure the layout
    this._coreConfigService.config = {
      layout: {
        menu: {
          hidden: false,
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

    this.currentUser = this.storageService.getUser();
    if (!this.currentUser.username) {
      this.router.navigate(["/authentication/login"]);
    }

    this.contentHeader = {
      headerTitle: "Home",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/home",
          },
        ],
      },
    };
  }
}

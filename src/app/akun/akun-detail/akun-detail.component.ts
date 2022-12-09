import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FlatpickrOptions } from 'ng2-flatpickr';

import { StorageService } from "../../_services/storage.service";

import { CoreConfigService } from "@core/services/config.service";

import { AccountSettingsService } from '../../_services/account-settings.service';

@Component({
  selector: "app-akun-detail",
  templateUrl: "./akun-detail.component.html",
  styleUrls: ["./akun-detail.component.scss"],
})
export class AkunDetailComponent implements OnInit {
  // public
  public contentHeader: object;
  public coreConfig: any;
  public rows: any;
  private tempData = [];
  public blogskRows: any;
  public exportCSVData;

  currentUser: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private _coreConfigService: CoreConfigService,
    private storageService: StorageService,
    private router: Router
  ) {
    this._unsubscribeAll = new Subject();

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

  ngOnInit(): void {
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
      headerTitle: "Akun",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Akun",
            isLink: true,
            link: "/akun-detail",
          },
        ],
      },
    };
  }
}

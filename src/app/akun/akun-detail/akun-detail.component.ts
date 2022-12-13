import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";

import { ToastrService, GlobalConfig } from "ngx-toastr";

import { HttpEventType, HttpResponse } from "@angular/common/http";

import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FlatpickrOptions } from "ng2-flatpickr";

import { StorageService } from "../../_services/storage.service";

import { CoreConfigService } from "@core/services/config.service";

import { UserDetailService } from "../../_services/userDetail.service";

@Component({
  selector: "app-akun-detail",
  templateUrl: "./akun-detail.component.html",
  styleUrls: ["./akun-detail.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AkunDetailComponent implements OnInit {
  // public
  public contentHeader: object;
  public coreConfig: any;
  public user: any;
  currentFile?: File;

  progress = 0;
  message = "";
  preview = "";
  uploadAvatarName = "";
  fileInfos?: Observable<any>;
  fileDownload = "";
  fileNameDb = "";

  public birthDateOptions: FlatpickrOptions = {
    altInput: true,
  };

  public avatarImage: string;

  // private
  private toastRef: any;
  private options: GlobalConfig;
  private _baseUrl: string = "http://localhost:8080";

  currentUser: any;

  formSubmitName: string;

  // Private
  private _unsubscribeAll: Subject<any>;
  generalForm: FormGroup;
  passwordForm: FormGroup;
  informationForm: FormGroup;
  socialForm: FormGroup;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _coreConfigService: CoreConfigService,
    private storageService: StorageService,
    private router: Router,
    private userDetailService: UserDetailService
  ) {
    this.options = this.toastr.toastrConfig;
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

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      console.log(event.target.files[0]);

      this.currentFile = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  uploadAvatar(): void {
    this.progress = 0;
    this.uploadAvatarName = `${Date.now()}_${this.currentFile.name}`;

    if (this.uploadAvatarName) {
      this.generalForm.get("profile").setValue(this.uploadAvatarName);
    }

    const file = this.currentFile;

    if (file) {
      this.userDetailService
        .uploadAvatar(this.currentFile, this.uploadAvatarName)
        .subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              console.log(this.message);

              // this.fileInfos = this.userDetailService.getFiles();
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = "Could not upload the file!";
            }

            this.currentFile = undefined;
          },
        });
    }
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

    this.initFormAkunDetail();

    this.getUserDetailById(this.currentUser.id);

    this.contentHeader = {
      headerTitle: "Akun",
      actionButton: false,
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

  resetForm() {
    this.initFormAkunDetail();
    this.getUserDetailById(this.currentUser.id);
  }

  onSubmit(): void {
    switch (this.formSubmitName) {
      case "generalForm":
        this.updateGeneralForm();
        break;
      case "passwordForm":
        this.updatePasswordForm();
        break;
      case "informationForm":
        if (this.informationForm.valid) {
          this.updateDefaultForm(this.informationForm.value);
        } else {
          this.errorMessage("Gagal", "Form tidak lengkap");
        }
        break;
      case "socialForm":
        if (this.socialForm.valid) {
          this.updateDefaultForm(this.socialForm.value);
        } else {
          this.errorMessage("Gagal", "Form tidak lengkap");
        }
        break;
      default:
        console.log(this.formSubmitName);
    }
  }

  updatePasswordForm(): void {
    if (
      this.passwordForm.value.new_password ===
      this.passwordForm.value.confirm_password
    ) {
      this.userDetailService
        .updateUserPasswordById(this.currentUser.id, this.passwordForm.value)
        .subscribe({
          next: (res) => {
            this.successMessage("Berhasil", res.message);
          },
          error: (err) => {
            this.errorMessage("Gagal", err.message);
          },
        });
    } else {
      this.errorMessage("Gagal", "Password tidak sama");
    }
  }

  updateDefaultForm(value: any): void {
    this.userDetailService
      .updateUserDetailById(this.currentUser.id, value)
      .subscribe({
        next: (res) => {
          this.successMessage("Berhasil", res.message);
        },
        error: (err) => {
          this.errorMessage("Gagal", err.message);
        },
      });
  }

  updateSocialForm(): void {}

  updateGeneralForm(): void {
    if (this.generalForm.valid) {
      if (this.currentFile) {
        this.uploadAvatar();
        this.userDetailService.removeAvatarFile(this.fileNameDb);
      }

      this.userDetailService
        .updateUserDetailById(this.currentUser.id, this.generalForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
          },
        });

      this.userDetailService
        .updateUserById(this.currentUser.id, this.generalForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.successMessage("Berhasil", res.message);
          },
          error: (err) => {
            this.errorMessage("Gagal", err.message);
          },
        });
    } else {
      this.errorMessage("Gagal", "Form tidak lengkap");
    }
  }

  getUserDetailById(id: number) {
    this.userDetailService.getUserDetailById(id).subscribe({
      next: (res) => {
        this.user = res;
        this.generalForm.patchValue(res[0]);
        this.informationForm.patchValue(res[0]);
        this.socialForm.patchValue(res[0]);

        if (res[0].profile) {
          this.avatarImage = `${this._baseUrl}/files/avatar/${res[0].profile}`;
        } else {
          this.avatarImage = `${this._baseUrl}/files/avatar/default/avatar.jpg`;
        }

        this.fileNameDb = res[0].profile;

        // this.generalForm.get("username").setValue(res[0].username);
        // this.generalForm.get("email").setValue(res[0].email);
        // this.generalForm.get("company").setValue(res[0].company);
      },
      error: (err) => {
        // alert(err);
      },
    });
  }

  setFormSubmitName(submitName: string) {
    this.formSubmitName = submitName;
  }

  initFormAkunDetail() {
    this.generalForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      company: [""],
      profile: [""],
    });

    this.passwordForm = this.formBuilder.group({
      old_password: ["", Validators.required],
      new_password: ["", Validators.required],
      confirm_password: ["", Validators.required],
    });

    this.informationForm = this.formBuilder.group({
      bio: [""],
      country: [""],
      website: [""],
      phone: [""],
    });

    this.socialForm = this.formBuilder.group({
      twitter: [""],
      facebook: [""],
      linkedin: [""],
      instagram: [""],
    });
  }

  // Progress Bar
  successMessage(title: string, message: string) {
    this.toastr.success(message, title, {
      progressBar: true,
      toastClass: "toast ngx-toastr",
      closeButton: true,
    });
  }

  // Progress Bar
  errorMessage(title: string, message: string) {
    this.toastr.error(message, title, {
      progressBar: true,
      toastClass: "toast ngx-toastr",
      closeButton: true,
    });
  }
}

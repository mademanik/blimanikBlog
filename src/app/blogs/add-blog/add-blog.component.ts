import { BlogsService } from "../../_services/blogs.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpEventType, HttpResponse } from "@angular/common/http";

import { Subject, Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";

import { StorageService } from "../../_services/storage.service";

@Component({
  selector: "app-add-blog",
  templateUrl: "./add-blog.component.html",
  styleUrls: ["./add-blog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddBlogComponent implements OnInit {
  public contentHeader: object;

  public coreConfig: any;

  currentUser: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  blogForm: FormGroup;
  actionBtn: string = "Save";
  isEdit: boolean = false;
  id: number;
  contentHeaderName: string = "Add New Blog";

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = "";
  preview = "";
  uploadName = "";
  fileInfos?: Observable<any>;
  fileDownload = "";
  fileNameDb = "";

  constructor(
    private formBuilder: FormBuilder,
    private api: BlogsService,
    private router: Router,
    private route: ActivatedRoute,
    private _coreConfigService: CoreConfigService,
    private storageService: StorageService
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

  selectFile(event: any): void {
    this.message = "";
    this.preview = "";
    this.progress = 0;
    this.selectedFiles = event.target.files;

    this.uploadName = event.target.files[0].name;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = "";
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): void {
    this.progress = 0;
    this.uploadName = `${Date.now()}_${this.uploadName}`;

    if (this.uploadName) {
      this.blogForm.get("fileUpload").setValue(this.uploadName);
    }

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.api.upload(this.currentFile, this.uploadName).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.api.getFiles();
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

      this.selectedFiles = undefined;
    }
  }

  onSubmit(): void {
    // this.api.removeFile();

    if (this.blogForm.valid) {
      if (this.isEdit) {
        if (this.uploadName) {
          this.upload();
          if (this.fileNameDb) {
            this.api.removeFile(this.fileNameDb);
          }
        }
        this.api.updateBlog(this.id, this.blogForm.value).subscribe({
          next: (res) => {
            this.blogForm.reset();
            this.router.navigate(["/blogs"]);
          },
        });
      } else {
        if (this.uploadName) {
          this.upload();
        }

        if (this.currentUser.id) {
          this.blogForm.get("creatorId").setValue(this.currentUser.id);
        }

        this.api.addBlogs(this.blogForm.value).subscribe({
          next: (res) => {
            this.blogForm.reset();
          },
          error: (err) => {
            console.log(err);
          },
        });
        this.router.navigate(["/blogs"]);
      }
    } else if (!this.blogForm.valid) {
      alert("Please fill all the fields");
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

    this.id = this.route.snapshot.params["id"];
    this.blogForm = this.formBuilder.group({
      content: ["", Validators.required],
      title: ["", Validators.required],
      category: ["", Validators.required],
      slug: ["", Validators.required],
      status: ["draft", Validators.required],
      fileUpload: [""],
      creatorId: [""],
    });

    if (this.id) {
      this.isEdit = true;
      this.actionBtn = "Update";
      this.contentHeaderName = "Edit Blog";
      this.api.getBlogById(this.id).subscribe({
        next: (res) => {
          this.blogForm.patchValue(res);

          if (res.fileUpload) {
            this.fileDownload = `http://localhost:8080/files/${res.fileUpload}`;
            this.fileNameDb = res.fileUpload;
          }
        },
      });
    }

    this.contentHeader = {
      headerTitle: "Blogs",
      actionButton: false,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Blogs",
            isLink: true,
            link: "/",
          },
          {
            name: this.contentHeaderName,
            isLink: false,
          },
        ],
      },
    };
  }
}

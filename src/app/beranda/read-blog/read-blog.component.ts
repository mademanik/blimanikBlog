import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpEventType, HttpResponse } from "@angular/common/http";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { CoreConfigService } from "@core/services/config.service";

import { BlogsService } from "../../_services/blogs.service";
import { CommentsService } from "../../_services/comment.service";
import { StorageService } from "../../_services/storage.service";

import * as moment from "moment";

@Component({
  selector: "app-read-blog",
  templateUrl: "./read-blog.component.html",
  styleUrls: ["./read-blog.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ReadBlogComponent implements OnInit {
  // public
  public contentHeader: object;
  public coreConfig: any;
  public data: any;
  public comments: any;
  public rows: any;
  currentUser: any;

  // Private
  private _unsubscribeAll: Subject<any>;
  public _baseUrl = "http://localhost:8080";

  addCommentForm: FormGroup;

  id: number;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _coreConfigService: CoreConfigService,
    private storageService: StorageService,
    private blogsService: BlogsService,
    private commentsService: CommentsService
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

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  setMoment(input): string {
    return moment(input).fromNow();
  }

  getAllBlogs() {
    this.blogsService.getDataBlogs().subscribe({
      next: (res) => {
        this.rows = res;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  truncateTitle(input) {
    if (input.length > 30) {
      return input.substring(0, 30) + "...";
    }
    return input;
  }

  removeTag(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 30) + "...";
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._coreConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.coreConfig = config;
      });

    this.id = this.route.snapshot.params["id"];
    this.addCommentForm = this.formBuilder.group({
      blogId: [this.id, Validators.required],
      name: ["", Validators.required],
      email: ["", Validators.required],
      comment: ["", Validators.required],
    });

    this.blogsService.getBlogById(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.data = res[0];
      },
    });

    this.commentsService.getCommentsByBlogId(this.id).subscribe({
      next: (res) => {
        console.log(res);
        this.comments = res;
      },
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

  onSubmit(): void {
    if (this.id) {
      if (this.addCommentForm.valid) {
        this.commentsService.addComments(this.addCommentForm.value).subscribe({
          next: (res) => {
            this.addCommentForm.reset();
            console.log(res.message);
            this.ngOnInit();
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (!this.addCommentForm.valid) {
        alert("Please fill all the comment fields");
      }
    } else {
      alert("Blogs id not found");
    }
  }
}

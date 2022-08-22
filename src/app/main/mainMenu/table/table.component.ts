import { DatatablesService } from "./../datatables/datatables.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { log } from "console";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  public contentHeader: object;
  blogForm: FormGroup;
  actionBtn: string = "Save";
  isEdit: boolean = false;
  id: number;
  contentHeaderName: string = "Add New Blog";
  constructor(
    private formBuilder: FormBuilder,
    private api: DatatablesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.isEdit) {
        this.api.updateBlog(this.id, this.blogForm.value).subscribe({
          next: (res) => {
            this.blogForm.reset();
            this.router.navigate(["/blogs"]);
          },
        });
      } else {
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
    this.id = this.route.snapshot.params["id"];
    this.blogForm = this.formBuilder.group({
      content: ["", Validators.required],
      title: ["", Validators.required],
      category: ["", Validators.required],
      slug: ["", Validators.required],
      status: ["draft", Validators.required],
    });

    if (this.id) {
      this.isEdit = true;
      this.actionBtn = "Update";
      this.contentHeaderName = "Edit Blog";
      this.api.getBlogById(this.id).subscribe({
        next: (res) => {
          this.blogForm.patchValue(res);
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

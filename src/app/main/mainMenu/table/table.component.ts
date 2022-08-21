import { DatatablesService } from "./../datatables/datatables.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
  constructor(
    private formBuilder: FormBuilder,
    private api: DatatablesService,
    private router: Router
  ) {}

  onSubmit(): void {    
    
    if (this.blogForm.valid) {      
      this.api.addBlogs(this.blogForm.value).subscribe({
        next: (res) => {
          this.blogForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.router.navigate(["/blogs"]);
    } else if (!this.blogForm.valid) {
      alert("Please fill all the fields");
    }
  }

  ngOnInit(): void {
    this.blogForm = this.formBuilder.group({
      content: ["", Validators.required],
      title: ["", Validators.required],
      category: ["", Validators.required],
      slug: ["", Validators.required],
      status: ["", Validators.required],
    });

    this.contentHeader = {
      headerTitle: "Add New Blog",
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
            name: "Add New Blog",
            isLink: false,
          },
        ],
      },
    };
  }
}

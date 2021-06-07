import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { data } from "../data";

declare var $: any;

@Component({
  selector: "app-grid-view",
  templateUrl: "./grid-view.component.html",
  styleUrls: ["./grid-view.component.less"],
})
export class GridViewComponent implements OnInit {
  items: any[] = data;
  viewSize: Number = 10;
  filterData: any[] = this.items;
  data: any[] = data.slice(0, Number(this.viewSize));
  page: Number = 1;
  total: Number = data.length;
  pages: any[] = [];
  currentPage: Number = 1;
  start: number = 0;
  end: Number = this.viewSize;
  searchForm = this.formBuilder.group({
    name: new FormControl(""),
    role: new FormControl(""),
    status: new FormControl(""),
  });

  constructor(private formBuilder: FormBuilder) {}

  onPageChange(page: Number): void {
    console.log(page, "PAge");

    this.currentPage = page;
    this.start = (Number(page) - 1) * Number(this.viewSize);
    this.end =
      Number(page) * 10 > this.filterData.length
        ? Number(this.filterData.length)
        : Number(page) * 10;
    this.data = this.filterData.slice(Number(this.start), Number(this.end));
  }

  onBackOrFor(type: String) {
    console.log(type, "TYEPs");
    if (type === "back") {
    }
  }

  onSubmit(): void {
    this.filterData =
      this.searchForm.value.name === ""
        ? this.items
        : this.items.filter(
            (item) =>
              this.searchForm.value.name !== "" &&
              item.name
                .toLowerCase()
                .includes(this.searchForm.value.name.toLowerCase())
          );
    this.resetPage();
  }

  /**
   * Clears all filters
   */
  clearFilters(): void {
    this.filterData = this.items;
    this.searchForm.setValue({
      status: "",
      role: "",
      name: "",
    });
    this.resetPage();
  }

  /**
   * Clears filter by form field name
   */
  clearFilterByName(formKey: string): void {
    this.searchForm.setValue({
      ...this.searchForm.value,
      [formKey]: "",
    });
    this.onFilterChange();
  }

  onFilterChange(): void {
    let newData = this.items;
    if (this.searchForm.value.name) {
      newData =
        this.searchForm.value.name === ""
          ? this.items
          : this.items.filter(
              (item) =>
                this.searchForm.value.name !== "" &&
                item.name
                  .toLowerCase()
                  .includes(this.searchForm.value.name.toLowerCase())
            );
    }
    this.filterData = newData
      .filter((item) => {
        if (this.searchForm.value.role && this.searchForm.value.role !== "") {
          return (
            item.role.toLowerCase() === this.searchForm.value.role.toLowerCase()
          );
        }
        return true;
      })
      .filter((item) => {
        if (
          this.searchForm.value.status &&
          this.searchForm.value.status !== ""
        ) {
          return (
            item.status.toLowerCase() ===
            this.searchForm.value.status.toLowerCase()
          );
        }
        return true;
      });
    this.resetPage();
  }

  resetPage() {
    this.pages = new Array(
      this.filterData.length > this.viewSize
        ? Number(this.filterData.length) % Number(this.viewSize)
        : 1
    );
    this.currentPage = 1;
    this.start = (Number(this.currentPage) - 1) * Number(this.viewSize);
    this.end =
      Number(this.currentPage) * 10 > this.filterData.length
        ? Number(this.filterData.length)
        : Number(this.currentPage) * 10;
    this.data = this.filterData.slice(Number(this.start), Number(this.end));
    this.total = this.filterData.length;
    console.log(this.page, this.data, this.pages, "UYUIy");
  }

  ngOnInit(): void {
    this.pages = new Array(Number(this.total) % Number(this.viewSize));
    console.log(this.page, this.data, this.pages, "UYUIy");
  }
}

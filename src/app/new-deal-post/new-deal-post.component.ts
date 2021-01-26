import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewDeal } from '../models/new-deal';
import { DealService } from '../Service/deal.service';

@Component({
  selector: 'app-new-deal-post',
  templateUrl: './new-deal-post.component.html',
  styleUrls: ['./new-deal-post.component.css']
})
export class NewDealPostComponent implements OnInit {

  Deal: any = {
    title: "",
    content: "",
    url: "",
    category: "",
    price: 0,
  }
  constructor(
    private dealService: DealService,
    private router: Router,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
  }

  PostDeal() {
    let formData = this.toFormData(this.Deal);

    for (var i = 0; i < this.Deal.file.length; i++) {
      //console.log(this.Deal.file[i]);
      formData.append("file[]", this.Deal.file[i]);
    }

    this.dealService.PostDeal(formData).subscribe(() => {
      this.toastr.success('Deal posted successfully!!');
    },
      err => { (this.toastr.error(err.error)); console.log(err.error) },
      () => this.router.navigateByUrl('/forumPage')
    );

    formData.forEach(function (value, key) {
      console.log(key, value);
    });
  }

  // FormDataObject() {
  //   this.formData.append('title', this.Deal.title);
  //   this.formData.append('content', this.Deal.content);
  //   this.formData.append('url', this.Deal.url);
  //   this.formData.append('category', this.Deal.category);
  //   this.formData.append('price', this.Deal.price);
  //   this.formData.append('file', this.Deal.photos);
  // }

  toFormData<T>(formValues: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValues)) {
      const value = formValues[key];
      formData.append(key, value);
    }
    return formData;
  }

  uploadFile(files, event: Event) {
    let fileToUpload = <File>files;
    this.Deal.file = fileToUpload;
  }
}

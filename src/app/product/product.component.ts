import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Options } from 'ngx-bootstrap/positioning/models';
import { AlertService } from '../share/services/alert.service';
import { IProduct, OptionSearch, ProductService } from '../share/services/product.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CategoryService } from '../share/services/category.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    private product: ProductService,
    private category: CategoryService,
    private builder: FormBuilder,
    private modalService: BsModalService,
    private alert: AlertService,
    private http: HttpClient
  ) {
    this.category.loadCategory(this.option).then(result => {
      this.c.category = result.items;
      this.c.total_items = result.total_items;
    });

    this.getIdForImage();
    this.loadProductItem(this.pageProduct);

    this.initialFormCategory();
    this.loadModelCategory();
  }

  form!: FormGroup;
  formProduct: FormGroup;

  sp: number = 1;
  lp: number = 2;

  productLp: number = 5;

  option: OptionSearch = {
    sp: 0,
    lp: 2
  }

  pageProduct: OptionSearch = {
    sp: 0,
    lp: 5
  }

  example_data: string;
  color: string;

  initialFormCategory() {
    this.form = this.builder.group({
      name: ['', Validators.required],
      color: ['', Validators.required]
    });

    this.formProduct = this.builder.group({
      _id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
      unit: ['', Validators.required],
      taste: ['', Validators.required],
    })
  }

  url: any
  selectedFile: ImageSnippet;
  dumb: any;

  MCategory: any = {
    items: [],
    total_items: 0
  }

  loadModelCategory() {
    this.category.loadCategoryInsert().then(result => {
      this.MCategory = result;
    })
  }

  handleUpload(input: HTMLInputElement) {
    const imageControl = this.formProduct.controls['image'];
    imageControl.setValue(null);
    if (input.files.length == 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(input.files[0]);
    reader.addEventListener('load', () => {
      this.dumb = reader.result;
      imageControl.setValue(this.dumb);
    })
  }

  pageChanged(event: any): void {
    this.option.sp = event.page;
    this.sp = event.page;
    this.loadCategoryItem({ sp: event.page - 1, lp: this.option.lp });
  }

  pageChanged2(event: any): void {
    this.pageProduct.sp = event.page;
    this.sp = event.page;
    this.loadProductItem({ sp: event.page - 1, lp: this.pageProduct.lp });
  }

  closeModal(modalId?: number) {
    this.modalService.hide(modalId);
  }

  loadCategoryItem(option?: OptionSearch) {
    if (!option) {
      this.category.loadCategory({ sp: 0, lp: this.lp }).then(result => {
        this.c.category = result.items;
        this.c.total_items = result.total_items;
      })
    } else
      this.category.loadCategory(option).then(result => {
        this.c.category = result.items;
        this.c.total_items = result.total_items;
      })

    console.log(this.c)
  }

  loadProductItem(option?: OptionSearch) {
    this.product.loadProduct(option).then(result => {
      this.p.product = result.items;
      this.p.total_items = result.total_items;
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg',ignoreBackdropClick:true });
  }

  openModal2(template: TemplateRef<any>, model: IProduct) {
    this.onUpdate(model);
    this.modalRef = this.modalService.show(template, { id: 1, class: 'modal-lg',ignoreBackdropClick:true });
  }

  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  config= {
    ignoreBackdropClick:true
  }

  onSubmit() {
    if (!this.form) {
      return;
    }
    if (this.form.invalid) {
      return this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }

    this.closeModal();
    this.category.InsertCategory(this.form.value).then(result => {
      console.log(result);
      if (result.code == "500") {
        this.alert.notify(result.message);
        return;
      }

      this.alert.success("เพิ่มข้อมูลสำเร็จ");
      this.loadCategoryItem();
      this.loadModelCategory();
    })
  }

  file = new FormControl('');
  file_data: any;
  image_id: any;


  getIdForImage() {
    this.product.getMaxID().then(result => {
      this.image_id = parseInt(result.max) + 1;
    })
  }
  location: string;
  imageSrc:string;
  fileChange(event) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any)=>{
        this.imageSrc = event.target.result;
      }
    }
    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {
      const file = fileList[0];

      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type);
      this.location = this.image_id + "-" + file.name;

      //max file size is 4 mb
      if ((file.size / 1048576) <= 4) {
        let formData = new FormData();
        let info = { id: 2, name: 'raja' }
        formData.append('file', file, this.location);
        formData.append('id', '2');
        formData.append('tz', new Date().toISOString())
        formData.append('update', '2')
        formData.append('info', JSON.stringify(info))
        this.file_data = formData;
        this.form.controls["image"].setValue("jj")
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }

  ip = "http://www.dee-jung.com/snowmilk/backend/api/product/";
  result: string;
  uploadImage() {
    this.http.post(this.ip + 'upload-file.php', this.file_data)
      .subscribe(res => {
        //send success response
        console.log(res);
      }, (err) => {
        //send error response
        console.log(err);
        this.result = err.error.text;
      });
  }

  onSubmitProduct() {
    this.formProduct.controls['image'].setValue('http://www.dee-jung.com/snowmilk/uploads/' + this.location);
    if (this.formProduct.invalid) {
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!")
      return;
    }

    // ถ้า update
    if (this.update == true) {
      this.product.UpdateProduct(this.formProduct.value).then(result => {
        this.formProduct.reset();
        this.dumb = null;
        this.alert.success("แก้ไขข้อมูลสำเร็จ");
        this.loadProductItem({ sp: 0, lp: 5 });
        this.update = false;

        this.modalService.hide();
        this.loadCategoryItem();
        this.uploadImage();
      })
    } else {
      // ถ้า insert
      this.product.InsertProduct(this.formProduct.value).then(result => {
        this.formProduct.reset();
        this.dumb = null;
        this.alert.success("เพิ่มข้อมูลสำเร็จ");
        this.loadProductItem({ sp: 0, lp: 5 });

        this.modalService.hide();

        this.uploadImage();
      })
    }
    this.getIdForImage();
  }

  update: boolean = false;

  onUpdate(data: IProduct) {
    this.update = true;

    this.formProduct.controls['_id'].setValue(data._id);
    this.formProduct.controls['name'].setValue(data.name);
    this.formProduct.controls['price'].setValue(data.price);
    this.formProduct.controls['image'].setValue(data.image);
    // this.formProduct.controls['category'].setValue(data.category);
    this.formProduct.controls['unit'].setValue(data.unit);
    this.formProduct.controls['taste'].setValue(data.taste);
  }

  onDelete(_id: string) {
    Swal.fire({
      title: 'คุณแน่ใจหรือไม่ที่จะลบข้อมูล ?',
      text: 'เมื่อลบข้อมูลแล้วข้อมูลจะสูยหายทันที',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่, ฉันต้องการลบข้อมูล!',
      cancelButtonText: 'ยกเลิก'
    }).then(result => {
      if (result.value) {
        this.product.DeleteProduct(_id).then(result => {
          Swal.fire('ลบข้อมูล!', 'ข้อมูลถูกลบเรียบร้อยแล้ว', 'success');
          this.loadProductItem({ sp: 0, lp: 5 });
        })
      }
    })
  }


  c: any = {
    category: [],
    total_items: 0
  }

  p: any = {
    product: [],
    total_items: 0
  }

  ngOnInit(): void {
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
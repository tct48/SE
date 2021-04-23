import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../share/services/alert.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PromotionService } from '../share/services/promotion.service';
import { DatePipe } from '@angular/common';
import { HttpService } from '../share/http.service';
import { HttpClient } from '@angular/common/http';
import { OptionSearch } from '../share/services/product.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  constructor(
    private alert: AlertService,
    private builder: FormBuilder,
    private datePipe: DatePipe,
    private http:HttpClient,
    private promotion: PromotionService
  ) {
    this.loadPromotionById();
    this.loadPromotion();
  }

  ngOnInit(): void {
  }
  model:any={
    title:'',
    dor:new Date(),
    content: '',
    image:'',
    type:'0',
    discount:'',
    condition:'',
    max_discount:'',
    code:''
  }

  htmlContent:string;

  promotion_id:string;

  form: FormGroup;
  file = new FormControl('');
  file_data: any;
  location : string | undefined;
  imageSrc:string;

  fileChange(event) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event:any)=>{
        this.model.image = event.target.result;
      }
    }

    const fileList: FileList = event.target.files;
    //check whether file is selected or not
    if (fileList.length > 0) {
      const file = fileList[event.target.files.length-1];

      //get file information such as name, size and type
      console.log('finfo', file.name, file.size, file.type);
      this.location = this.promotion_id + "-" + file.name;

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
        console.log(this.model.image);
      } else {
        //this.snackBar.open('File size exceeds 4 MB. Please choose less than 4 MB','',{duration: 2000});
      }
    }
  }
  sp:0;
  option:OptionSearch={
    sp:0,
    lp:2
  };  
  ip = "http://www.dee-jung.com/snowmilk/backend/api/promotion/";
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

  clearNgModel(){
    this.model = {
      title:'',
      dor:'',
      content:'',
      image:'',
      type:'',
      discount:'',
      condition:'',
      max_discount:'',
      code:''
    }
  }
  pageChanged(event: any): void {
    this.option.sp = event.page;
    this.sp = event.page;
    this.loadPromotion();
  }

  loadPromotionById(){
    this.promotion.loadIDPromotion().then(result=>{
        this.promotion_id = result.max;
    })
  }

  item:any={
    items:[],
    total_items:0
  }

  updateStatus(_id,status){
    var dumb=0;
    if(status==0){
      dumb=1;
    }
    var obj={
      _id:_id,
      status:dumb
    }
    this.promotion.updateStatus(obj).then(result=>{
      console.log(result);
      this.loadPromotion();
    })
  }

  loadPromotion(){
    this.promotion.loadAllPromotion(this.option).then(result=>{
      this.item = result;
    })
  }

  onSubmit(){
    if(!this.model.title && !this.model.content){
      this.alert.notify("กรุณากรอกข้อมูลให้ครบถ้วน!");
      return;
    }
    
    this.model.content = this.htmlContent;
    var obj = this.model;
    obj.image = "http://www.dee-jung.com/snowmilk/frontend/assets/img/promotion/" + this.location;
    
    obj.code="APR2021-"+this.promotion_id;
    this.promotion.insertPromotion(obj).then(result=>{
      this.uploadImage();
      console.log(result);
      if(result.message=="เพิ่มข้อมูลสำเร็จ"){
        this.alert.success("เพิ่มโปรโมชั่นสำเร็จ");
        this.clearNgModel();
        this.loadPromotionById();
        this.loadPromotion();
      }
    })
  }

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
}

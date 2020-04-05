import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFile, faFileAudio, faFileCode, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint, faFileVideo, faFileWord, faFolder, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IFolderContent } from './app.component.model';
import { FolderService } from './app.folder.service';
import {IAppConfig} from '../app/app.config.model'
import {AppConfig} from '../app/app.config';

@Component({
  selector: 'app-folder',
  templateUrl: './app.folder.component.html',
  styleUrls: ['./app.folder.component.css']
})
export class FolderComponent implements OnInit {
  localUrl = AppConfig.settings.apiServer.protocol + "://" +
    AppConfig.settings.apiServer.name + ":" + 
    AppConfig.settings.apiServer.port + "/";

  title = 'Library';
  folderList: IFolderContent[] = [];
  currentPath: string;

  constructor (
    private appConfig: AppConfig,
    private dataService: FolderService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      
      if (params["dir"]) {
        this.currentPath = params["dir"];
      }  else {
        this.currentPath = "";
      }

      this.getData(this.currentPath);
    });
   
  }

  onClick(currentDir: string) {
    let newPath: string = this.currentPath + currentDir;
    console.log (newPath);
    if (currentDir.endsWith('/')) {
      this.router.navigate(['/'], { queryParams: { dir: newPath } });
    } else {
      this.getFile(newPath);
    }
  }

  private getData(currentDir: string) {
    let currentUrl = this.localUrl + "?dir=/" + currentDir
    this.dataService.getDataList(currentUrl)
      .subscribe(data => {
        this.folderList = [];
        for (const eachData of (data as any)) {
          this.folderList.push({
            name: eachData,
            type: this.getIconDefinition(eachData)
          });
        }
      });
  }

  private getIconDefinition (currentFile: string): IconDefinition {
    let icon: IconDefinition = faFolder;
    currentFile = currentFile.trim();

    if (!currentFile.endsWith("/")) {
      icon = faFile;
      let ext = currentFile.substring(currentFile.lastIndexOf(".") + 1);
      if (ext && 0 != ext.length) {

        switch (ext.toLocaleLowerCase()){
          case "pdf":
            icon = faFilePdf; break;
          case "img":  case "jpeg": case "jpg": case "png": case "gif": case "tiff": case "bmp": case "jpe":
            icon = faFileImage; break;
          case "mp3": case "wav":
            icon = faFileAudio; break;
          case "mp4": case "avi": case "mov": case "wmv": case "flv": case "swf":
            icon = faFileVideo; break;
          case "js": case "java": case "c": case "cpp": case "html": case "css":  case "json":
            icon = faFileCode; break;
          case "doc": case "docx": 
            icon = faFileWord; break;
          case "xls": case "xlsx": case "csv": 
            icon = faFileExcel; break;
          case "ppt": case "pptx":
            icon = faFilePowerpoint; break;
          default:
            icon = faFile; break;
        }
      } //if extension is not null
    } //end of if not folder

    return icon;
  }

  private getFile(currentFile: string) {
    let currentUrl = this.localUrl + encodeURIComponent(currentFile);
    window.open (currentUrl);
  }
}

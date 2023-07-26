import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';

registerLicense("ORg4AjUWIQA/Gnt2V1hhQlJAfVddXnxLflF1VWZTe1Z6d1dWESFaRnZdQV1kSHpTdUBkWX9dd31c");
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
